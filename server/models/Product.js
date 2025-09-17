const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['paper', 'sugar'],
    lowercase: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  shortDesc: {
    type: String,
    required: true,
    maxlength: 200
  },
  longDesc: {
    type: String,
    required: true
  },
  specs: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
productSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('Product', productSchema);