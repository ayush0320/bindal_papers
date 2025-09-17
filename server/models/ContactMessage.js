const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded', 'closed'],
    default: 'new'
  },
  emailSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
contactMessageSchema.index({ createdAt: -1, status: 1 });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);