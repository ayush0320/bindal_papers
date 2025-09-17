const express = require('express');
const BannerSlide = require('../models/BannerSlide');
const router = express.Router();

// Default banners for when MongoDB is not available
const defaultBanners = [
  {
    _id: "1",
    title: "Because Every Print",
    subtitle: "Deserves Perfection",
    imageUrl: "/images/hero-banner.svg",
    ctaText: "Explore Products",
    ctaHref: "/products",
    order: 1
  },
  {
    _id: "2",
    title: "Premium Quality",
    subtitle: "Paper Solutions",
    imageUrl: "/images/hero-banner.svg",
    ctaText: "Learn More",
    ctaHref: "/about",
    order: 2
  },
  {
    _id: "3",
    title: "Sustainable",
    subtitle: "Manufacturing",
    imageUrl: "/images/hero-banner.svg",
    ctaText: "Contact Us",
    ctaHref: "/contact",
    order: 3
  }
];

// GET /api/banners
router.get('/', async (req, res) => {
  try {
    const banners = await BannerSlide.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    
    res.json(banners);
  } catch (error) {
    console.error('Error fetching banners, returning default data:', error.message);
    res.json(defaultBanners);
  }
});

module.exports = router;