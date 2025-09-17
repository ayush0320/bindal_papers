const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logoUrl: {
    type: String,
    required: true
  },
  website: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Partner', partnerSchema);