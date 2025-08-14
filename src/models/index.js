const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Define TechPack model
const TechPack = sequelize.define('TechPack', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  // Shopify Integration
  customer_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: 'Shopify Customer ID'
  },
  order_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: 'Associated Shopify Order ID when converted'
  },
  shop_domain: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Shopify shop domain'
  },

  // TechPack Status
  status: {
    type: DataTypes.ENUM(
      'draft',
      'submitted',
      'under_review',
      'quoted',
      'sample_requested',
      'in_production',
      'completed',
      'cancelled'
    ),
    defaultValue: 'draft'
  },

  // Submission Type
  submission_type: {
    type: DataTypes.ENUM(
      'quotation',
      'sample-request',
      'bulk-order-request',
      'lab-dips-accessories'
    ),
    allowNull: false
  },

  // Client Information
  client_info: {
    type: DataTypes.JSONB,
    allowNull: false,
    comment: 'Client details including name, email, company, etc.'
  },

  // Production Details
  production_type: {
    type: DataTypes.ENUM('custom-production', 'our-blanks'),
    allowNull: false
  },

  // Quantities
  total_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  garment_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  file_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  // Pricing Information
  estimated_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  quoted_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },

  // Processing Information
  processing_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  // Timestamps
  submitted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'techpacks',
  indexes: [
    { fields: ['customer_id'] },
    { fields: ['order_id'] },
    { fields: ['status'] },
    { fields: ['submission_type'] },
    { fields: ['shop_domain'] },
    { fields: ['created_at'] }
  ]
});

// Sync all models
async function syncDatabase(force = false) {
  try {
    await sequelize.sync({ force });
    console.log('✅ All models synced successfully');
  } catch (error) {
    console.error('❌ Error syncing models:', error);
    throw error;
  }
}

module.exports = {
  sequelize,
  TechPack,
  syncDatabase,
  testConnection: require('../config/database').testConnection
};
