const express = require('express');
const { TechPack } = require('../models');
const router = express.Router();

// Get all techpacks for a shop
router.get('/techpacks', async (req, res) => {
  try {
    const { shop } = req.query;

    if (!shop) {
      return res.status(400).json({ error: 'Shop parameter required' });
    }

    const techpacks = await TechPack.findAll({
      where: { shop_domain: shop },
      order: [['created_at', 'DESC']],
      limit: 50
    });

    res.json({
      success: true,
      techpacks: techpacks,
      count: techpacks.length
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: 'Failed to fetch techpacks',
      details: error.message
    });
  }
});

// Create new techpack
router.post('/techpacks', async (req, res) => {
  try {
    const { shop_domain, submission_type, client_info, production_type } = req.body;

    const techpack = await TechPack.create({
      shop_domain,
      submission_type,
      client_info,
      production_type,
      status: 'draft'
    });

    res.status(201).json({
      success: true,
      techpack: techpack
    });

  } catch (error) {
    console.error('Create TechPack Error:', error);
    res.status(500).json({
      error: 'Failed to create techpack',
      details: error.message
    });
  }
});

module.exports = router;
