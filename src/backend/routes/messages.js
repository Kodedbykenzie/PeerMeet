const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const auth = require('../middleware/auth');
// Get all conversations for current user
router.get('/conversations', auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: {
        $in: [req.user.id]
      }
    }).populate('participants', 'name avatar').sort({
      'lastMessage.timestamp': -1
    });
    res.json(conversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Get messages for a specific conversation
router.get('/conversations/:conversationId', auth, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) {
      return res.status(404).json({
        msg: 'Conversation not found'
      });
    }
    // Check if user is part of the conversation
    if (!conversation.participants.includes(req.user.id)) {
      return res.status(401).json({
        msg: 'Not authorized'
      });
    }
    const messages = await Message.find({
      conversation: req.params.conversationId
    }).populate('sender', 'name avatar').sort({
      createdAt: 1
    });
    // Mark messages as read
    await Message.updateMany({
      conversation: req.params.conversationId,
      sender: {
        $ne: req.user.id
      },
      read: false
    }, {
      read: true
    });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Start a new conversation or get existing one
router.post('/conversations', auth, async (req, res) => {
  try {
    const {
      recipientId
    } = req.body;
    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        msg: 'Recipient not found'
      });
    }
    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: {
        $all: [req.user.id, recipientId]
      }
    });
    // If not, create new conversation
    if (!conversation) {
      conversation = new Conversation({
        participants: [req.user.id, recipientId]
      });
      await conversation.save();
    }
    res.json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Send a message
router.post('/conversations/:conversationId', auth, async (req, res) => {
  try {
    const {
      content
    } = req.body;
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) {
      return res.status(404).json({
        msg: 'Conversation not found'
      });
    }
    // Check if user is part of the conversation
    if (!conversation.participants.includes(req.user.id)) {
      return res.status(401).json({
        msg: 'Not authorized'
      });
    }
    // Create new message
    const newMessage = new Message({
      conversation: req.params.conversationId,
      sender: req.user.id,
      content
    });
    await newMessage.save();
    // Update last message in conversation
    conversation.lastMessage = {
      content,
      sender: req.user.id,
      timestamp: Date.now()
    };
    await conversation.save();
    // Populate sender info before sending response
    const populatedMessage = await Message.findById(newMessage._id).populate('sender', 'name avatar');
    res.json(populatedMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Mark all messages in a conversation as read
router.put('/conversations/:conversationId/read', auth, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) {
      return res.status(404).json({
        msg: 'Conversation not found'
      });
    }
    // Check if user is part of the conversation
    if (!conversation.participants.includes(req.user.id)) {
      return res.status(401).json({
        msg: 'Not authorized'
      });
    }
    // Mark messages as read
    await Message.updateMany({
      conversation: req.params.conversationId,
      sender: {
        $ne: req.user.id
      },
      read: false
    }, {
      read: true
    });
    res.json({
      success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;