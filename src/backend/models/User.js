const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'mentor', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isPeerTutor: {
    type: Boolean,
    default: false
  },
  tutorProfile: {
    subjects: [String],
    expertise: String,
    education: String,
    experience: String,
    availability: {
      weekdays: Boolean,
      weekends: Boolean,
      mornings: Boolean,
      afternoons: Boolean,
      evenings: Boolean
    },
    hourlyRate: Number,
    offerFreeIntro: Boolean,
    bio: String,
    verified: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 0
    },
    sessionCount: {
      type: Number,
      default: 0
    },
    endorsements: {
      type: Number,
      default: 0
    }
  }
});
// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
// Method to compare password for login
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);