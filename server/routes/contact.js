const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const ContactMessage = require('../models/ContactMessage');
const { sendContactEmail } = require('../services/emailService');
const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number must be less than 20 characters'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// POST /api/contact
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, phone, subject, message } = req.body;

    // Create contact message
    const contactMessage = new ContactMessage({
      name,
      email,
      phone,
      subject,
      message
    });

    // Save to database (if available)
    let messageId = null;
    try {
      await contactMessage.save();
      messageId = contactMessage._id;
    } catch (dbError) {
      console.error('Failed to save to database:', dbError.message);
      // Continue without failing the request
      messageId = 'temp_' + Date.now();
    }

    // Attempt to send email (don't fail if email fails)
    try {
      await sendContactEmail({
        name,
        email,
        phone,
        subject,
        message,
        createdAt: new Date()
      });
      if (contactMessage.save) {
        contactMessage.emailSent = true;
        await contactMessage.save();
      }
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
      // Continue without failing the request
    }

    res.status(201).json({
      message: 'Contact message received successfully',
      id: messageId
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to process contact form' });
  }
});

module.exports = router;