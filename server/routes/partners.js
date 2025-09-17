const express = require('express');
const Partner = require('../models/Partner');
const router = express.Router();

// Default partners for when MongoDB is not available
const defaultPartners = [
  {
    _id: "1",
    name: "Partner Company 1",
    logoUrl: "/images/product-1.svg",
    website: "https://example1.com",
    description: "Leading technology partner"
  },
  {
    _id: "2",
    name: "Partner Company 2",
    logoUrl: "/images/product-2.svg",
    website: "https://example2.com",
    description: "Manufacturing solutions provider"
  },
  {
    _id: "3",
    name: "Partner Company 3",
    logoUrl: "/images/product-3.svg",
    website: "https://example3.com",
    description: "Logistics and distribution partner"
  },
  {
    _id: "4",
    name: "Partner Company 4",
    logoUrl: "/images/product-4.svg",
    website: "https://example4.com",
    description: "Quality assurance partner"
  },
  {
    _id: "5",
    name: "Partner Company 5",
    logoUrl: "/images/product-5.svg",
    website: "https://example5.com",
    description: "Environmental solutions partner"
  },
  {
    _id: "6",
    name: "Partner Company 6",
    logoUrl: "/images/product-6.svg",
    website: "https://example6.com",
    description: "Research and development partner"
  }
];

// GET /api/partners
router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json(partners);
  } catch (error) {
    console.error('Error fetching partners, returning default data:', error.message);
    res.json(defaultPartners);
  }
});

module.exports = router;