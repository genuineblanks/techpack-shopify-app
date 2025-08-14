Content:
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

// Import database
const { testConnection, syncDatabase } = require('./models');

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.shopify.com"],
      scriptSrc: ["'self'", "https://cdn.shopify.com"],
      connectSrc: ["'self'", "https://*.shopify.com"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://cdn.shopify.com"]
    }
  }
}));

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from Shopify admin
    if (!origin || origin.includes('.shopify.com') || origin.includes('shopify.dev')) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));

// Compression middleware
app.use(compression());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Trust proxy for correct IP addresses
app.set('trust proxy', 1);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/public', express.static(path.join(__dirname, '../public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'TechPack Shopify App is running!',
    status: 'active'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Application error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    await testConnection();

    // Sync database models
    await syncDatabase(false);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 TechPack Shopify App running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 App URL: ${process.env.SHOPIFY_APP_URL}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the application
startServer();

module.exports = app;
