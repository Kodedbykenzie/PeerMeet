const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    // in minutes
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  price: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  studentReview: {
    rating: Number,
    comment: String,
    createdAt: Date
  },
  tutorReview: {
    rating: Number,
    comment: String,
    createdAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Session', SessionSchema);