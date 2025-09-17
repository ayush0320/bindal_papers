const express = require('express');
const Testimonial = require('../models/Testimonial');
const router = express.Router();

// Default testimonials for when MongoDB is not available
const defaultTestimonials = [
  {
    _id: "1",
    author: "Rajesh Kumar",
    company: "Kumar Printing Press",
    rating: 5,
    quote: "Bindal Papers has been our trusted partner for over 5 years. Their quality and reliability are unmatched in the industry. Highly recommended for any paper requirements.",
    featured: true
  },
  {
    _id: "2",
    author: "Priya Sharma",
    company: "Green Energy Solutions",
    rating: 5,
    quote: "The sugar industry products from Bindal Papers have helped us achieve sustainable manufacturing goals. Their bio-ethanol fuel is of exceptional quality.",
    featured: true
  },
  {
    _id: "3",
    author: "Amit Patel",
    company: "Patel Packaging Ltd",
    rating: 4,
    quote: "Excellent customer service and timely delivery. The packaging paper quality has improved our product presentation significantly."
  }
];

// GET /api/testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ featured: -1, createdAt: -1 })
      .select('-__v');
    
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials, returning default data:', error.message);
    res.json(defaultTestimonials);
  }
});

module.exports = router;