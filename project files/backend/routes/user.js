const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock user profiles storage
const userProfiles = {};

// Get user profile
router.get('/profile/:userId', (req, res) => {
  try {
    const { userId } = req.params;

    const profile = userProfiles[userId] || {
      name: 'Alex Johnson',
      age: 28,
      gender: 'Other',
      height: '5\'8"',
      weight: '155 lbs',
      conditions: ['Seasonal Allergies'],
      allergies: ['Pollen', 'Dust'],
      medications: ['Multivitamin'],
      emergencyContact: '(555) 123-4567',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    res.json({ profile });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user profile
router.put('/profile/:userId', [
  body('name').optional().trim().isLength({ min: 1 }),
  body('age').optional().isInt({ min: 1, max: 150 }),
  body('gender').optional().isIn(['Male', 'Female', 'Other']),
  body('height').optional().trim(),
  body('weight').optional().trim(),
  body('conditions').optional().isArray(),
  body('allergies').optional().isArray(),
  body('medications').optional().isArray(),
  body('emergencyContact').optional().trim()
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;
    const updateData = req.body;

    // Get existing profile or create new one
    const existingProfile = userProfiles[userId] || {};

    // Update profile
    userProfiles[userId] = {
      ...existingProfile,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    res.json({
      message: 'Profile updated successfully',
      profile: userProfiles[userId]
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Get user preferences
router.get('/preferences/:userId', (req, res) => {
  try {
    const { userId } = req.params;

    const preferences = {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        shareData: false,
        analytics: true
      },
      display: {
        theme: 'dark',
        language: 'en',
        timezone: 'UTC'
      }
    };

    res.json({ preferences });

  } catch (error) {
    console.error('Preferences fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch user preferences' });
  }
});

// Update user preferences
router.put('/preferences/:userId', [
  body('notifications').optional().isObject(),
  body('privacy').optional().isObject(),
  body('display').optional().isObject()
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;
    const preferences = req.body;

    // Store preferences (in real app, save to database)
    res.json({
      message: 'Preferences updated successfully',
      preferences
    });

  } catch (error) {
    console.error('Preferences update error:', error);
    res.status(500).json({ error: 'Failed to update user preferences' });
  }
});

module.exports = router;