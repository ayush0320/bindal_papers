const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { initializeEmailService } = require('./services/emailService');

// Import routes
const bannersRouter = require('./routes/banners');
const productsRouter = require('./routes/products');
const testimonialsRouter = require('./routes/testimonials');
const partnersRouter = require('./routes/partners');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bindal_papers')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error.message);
  console.log('Continuing without MongoDB - API will return default data');
  // Don't exit the process, continue running with default data
});

// Initialize email service
initializeEmailService();

// API routes
app.use('/api/banners', bannersRouter);
app.use('/api/products', productsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/partners', partnersRouter);
app.use('/api/contact', contactRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  
  // Mongoose duplicate key error
  if (error.code === 11000) {
    return res.status(409).json({ error: 'Resource already exists' });
  }
  
  // Default error response
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});