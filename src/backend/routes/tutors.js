const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
// Get all peer tutors
router.get('/', async (req, res) => {
  try {
    const tutors = await User.find({
      isPeerTutor: true
    }).select('-password').sort({
      'tutorProfile.rating': -1
    });
    res.json(tutors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Get tutor by ID
router.get('/:id', async (req, res) => {
  try {
    const tutor = await User.findById(req.params.id).select('-password');
    if (!tutor || !tutor.isPeerTutor) {
      return res.status(404).json({
        msg: 'Tutor not found'
      });
    }
    res.json(tutor);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Tutor not found'
      });
    }
    res.status(500).send('Server error');
  }
});
// Apply to become a peer tutor
router.post('/apply', auth, async (req, res) => {
  try {
    const {
      subjects,
      expertise,
      education,
      experience,
      availability,
      hourlyRate,
      offerFreeIntro,
      bio,
      profilePicture
    } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        msg: 'User not found'
      });
    }
    // Update user to become a peer tutor
    user.isPeerTutor = true;
    user.tutorProfile = {
      subjects,
      expertise,
      education,
      experience,
      availability,
      hourlyRate,
      offerFreeIntro,
      bio,
      verified: false,
      rating: 0,
      sessionCount: 0,
      endorsements: 0
    };
    if (profilePicture) {
      user.avatar = profilePicture;
    }
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Update tutor profile
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isPeerTutor) {
      return res.status(404).json({
        msg: 'Tutor profile not found'
      });
    }
    // Update fields
    const updatedFields = req.body;
    if (updatedFields.subjects) user.tutorProfile.subjects = updatedFields.subjects;
    if (updatedFields.expertise) user.tutorProfile.expertise = updatedFields.expertise;
    if (updatedFields.education) user.tutorProfile.education = updatedFields.education;
    if (updatedFields.experience) user.tutorProfile.experience = updatedFields.experience;
    if (updatedFields.availability) user.tutorProfile.availability = updatedFields.availability;
    if (updatedFields.hourlyRate !== undefined) user.tutorProfile.hourlyRate = updatedFields.hourlyRate;
    if (updatedFields.offerFreeIntro !== undefined) user.tutorProfile.offerFreeIntro = updatedFields.offerFreeIntro;
    if (updatedFields.bio) user.tutorProfile.bio = updatedFields.bio;
    if (updatedFields.profilePicture) user.avatar = updatedFields.profilePicture;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Filter tutors
router.get('/search/filter', async (req, res) => {
  try {
    const {
      subject,
      priceFilter,
      verified,
      availability
    } = req.query;
    let query = {
      isPeerTutor: true
    };
    // Filter by subject
    if (subject) {
      query['tutorProfile.subjects'] = {
        $in: [subject]
      };
    }
    // Filter by price
    if (priceFilter === 'free') {
      query['tutorProfile.hourlyRate'] = 0;
    } else if (priceFilter === 'paid') {
      query['tutorProfile.hourlyRate'] = {
        $gt: 0
      };
    }
    // Filter by verification status
    if (verified === 'true') {
      query['tutorProfile.verified'] = true;
    }
    // Filter by availability
    if (availability) {
      const availabilityArray = availability.split(',');
      const availabilityQuery = {};
      availabilityArray.forEach(day => {
        availabilityQuery[`tutorProfile.availability.${day.toLowerCase()}`] = true;
      });
      query = {
        ...query,
        ...availabilityQuery
      };
    }
    const tutors = await User.find(query).select('-password').sort({
      'tutorProfile.rating': -1
    });
    res.json(tutors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Add endorsement to tutor
router.post('/endorse/:id', auth, async (req, res) => {
  try {
    const tutor = await User.findById(req.params.id);
    if (!tutor || !tutor.isPeerTutor) {
      return res.status(404).json({
        msg: 'Tutor not found'
      });
    }
    tutor.tutorProfile.endorsements += 1;
    await tutor.save();
    res.json({
      endorsements: tutor.tutorProfile.endorsements
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;