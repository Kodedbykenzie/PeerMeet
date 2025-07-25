const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
// Register a new user
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;
    // Check if user already exists
    let user = await User.findOne({
      email
    });
    if (user) {
      return res.status(400).json({
        msg: 'User already exists'
      });
    }
    // Create new user
    user = new User({
      name,
      email,
      password,
      role: role || 'student'
    });
    await user.save();
    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Login user
router.post('/login', async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    // Check if user exists
    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          isPeerTutor: user.isPeerTutor
        }
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;