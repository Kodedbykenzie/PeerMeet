const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Session = require('../models/Session');
const auth = require('../middleware/auth');
// Book a session with a tutor
router.post('/', auth, async (req, res) => {
  try {
    const {
      tutorId,
      date,
      duration,
      topic,
      subject,
      notes
    } = req.body;
    // Check if tutor exists
    const tutor = await User.findById(tutorId);
    if (!tutor || !tutor.isPeerTutor) {
      return res.status(404).json({
        msg: 'Tutor not found'
      });
    }
    // Calculate price based on tutor's hourly rate
    const price = (tutor.tutorProfile.hourlyRate * (duration / 60)).toFixed(2);
    // Create session
    const newSession = new Session({
      student: req.user.id,
      tutor: tutorId,
      date,
      duration,
      topic,
      subject,
      price,
      notes
    });
    await newSession.save();
    // Update tutor's session count
    tutor.tutorProfile.sessionCount += 1;
    await tutor.save();
    res.json(newSession);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Get all sessions for current user (as student or tutor)
router.get('/my-sessions', auth, async (req, res) => {
  try {
    const studentSessions = await Session.find({
      student: req.user.id
    }).populate('tutor', 'name avatar').sort({
      date: 1
    });
    const tutorSessions = await Session.find({
      tutor: req.user.id
    }).populate('student', 'name avatar').sort({
      date: 1
    });
    res.json({
      asStudent: studentSessions,
      asTutor: tutorSessions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Get upcoming sessions for current user
router.get('/upcoming', auth, async (req, res) => {
  try {
    const now = new Date();
    const studentSessions = await Session.find({
      student: req.user.id,
      date: {
        $gt: now
      },
      status: 'scheduled'
    }).populate('tutor', 'name avatar').sort({
      date: 1
    }).limit(5);
    const tutorSessions = await Session.find({
      tutor: req.user.id,
      date: {
        $gt: now
      },
      status: 'scheduled'
    }).populate('student', 'name avatar').sort({
      date: 1
    }).limit(5);
    res.json({
      asStudent: studentSessions,
      asTutor: tutorSessions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Cancel a session
router.put('/cancel/:id', auth, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({
        msg: 'Session not found'
      });
    }
    // Check if user is authorized to cancel
    if (session.student.toString() !== req.user.id && session.tutor.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Not authorized'
      });
    }
    // Check if session is already completed
    if (session.status === 'completed') {
      return res.status(400).json({
        msg: 'Cannot cancel a completed session'
      });
    }
    session.status = 'cancelled';
    await session.save();
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Mark session as completed and leave review
router.put('/complete/:id', auth, async (req, res) => {
  try {
    const {
      rating,
      comment
    } = req.body;
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({
        msg: 'Session not found'
      });
    }
    // Check if user is part of the session
    const isStudent = session.student.toString() === req.user.id;
    const isTutor = session.tutor.toString() === req.user.id;
    if (!isStudent && !isTutor) {
      return res.status(401).json({
        msg: 'Not authorized'
      });
    }
    // Mark session as completed
    session.status = 'completed';
    // Add review
    if (isStudent) {
      session.studentReview = {
        rating,
        comment,
        createdAt: Date.now()
      };
      // Update tutor's rating
      if (rating) {
        const tutor = await User.findById(session.tutor);
        if (tutor) {
          const totalSessions = tutor.tutorProfile.sessionCount;
          const currentRating = tutor.tutorProfile.rating || 0;
          // Calculate new average rating
          tutor.tutorProfile.rating = (currentRating * (totalSessions - 1) + rating) / totalSessions;
          await tutor.save();
        }
      }
    } else {
      session.tutorReview = {
        rating,
        comment,
        createdAt: Date.now()
      };
    }
    await session.save();
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;