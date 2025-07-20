const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock health data storage
const healthData = {};

// Get health dashboard data
router.get('/dashboard/:userId', (req, res) => {
  try {
    const { userId } = req.params;

    // Mock health data
    const mockData = {
      weeklyHealthData: [
        { day: 'Mon', steps: 8500, sleep: 7.5, mood: 8 },
        { day: 'Tue', steps: 6200, sleep: 6.8, mood: 7 },
        { day: 'Wed', steps: 9800, sleep: 8.2, mood: 9 },
        { day: 'Thu', steps: 7300, sleep: 7.0, mood: 6 },
        { day: 'Fri', steps: 11200, sleep: 6.5, mood: 8 },
        { day: 'Sat', steps: 12500, sleep: 9.0, mood: 9 },
        { day: 'Sun', steps: 5400, sleep: 8.5, mood: 8 }
      ],
      vitalSigns: [
        { time: '6:00', heartRate: 65, bloodPressure: 120 },
        { time: '12:00', heartRate: 78, bloodPressure: 125 },
        { time: '18:00', heartRate: 72, bloodPressure: 118 },
        { time: '22:00', heartRate: 68, bloodPressure: 115 }
      ],
      symptomFrequency: [
        { name: 'Headache', value: 15, color: '#EF4444' },
        { name: 'Fatigue', value: 25, color: '#F59E0B' },
        { name: 'Stress', value: 35, color: '#3B82F6' },
        { name: 'Good Days', value: 25, color: '#10B981' }
      ],
      healthMetrics: [
        { 
          title: 'Average Steps',
          value: '8,700',
          change: '+12%',
          trend: 'up'
        },
        {
          title: 'Sleep Quality',
          value: '7.6/10',
          change: '+0.3',
          trend: 'up'
        },
        {
          title: 'Heart Rate',
          value: '71 bpm',
          change: '-2 bpm',
          trend: 'down'
        },
        {
          title: 'Hydration',
          value: '2.1L',
          change: '+0.3L',
          trend: 'up'
        }
      ],
      insights: [
        {
          type: 'positive',
          title: 'Positive Trend',
          message: 'Your daily steps have increased by 12% this week. Keep up the excellent work with your physical activity!'
        },
        {
          type: 'recommendation',
          title: 'Sleep Recommendation',
          message: 'Consider maintaining a consistent bedtime routine. Your sleep quality improves when you sleep 7.5+ hours.'
        },
        {
          type: 'warning',
          title: 'Stress Management',
          message: 'Stress levels seem elevated on weekdays. Consider incorporating meditation or relaxation techniques.'
        }
      ]
    };

    res.json({
      ...mockData,
      timestamp: new Date().toISOString(),
      userId
    });

  } catch (error) {
    console.error('Health dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch health data' });
  }
});

// Record health data
router.post('/record', [
  body('userId').trim().isLength({ min: 1 }),
  body('type').isIn(['steps', 'sleep', 'mood', 'vitals', 'symptoms']),
  body('data').isObject()
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, type, data } = req.body;

    // Initialize user data if not exists
    if (!healthData[userId]) {
      healthData[userId] = {};
    }

    // Store health data
    const timestamp = new Date().toISOString();
    const recordId = Date.now().toString();

    if (!healthData[userId][type]) {
      healthData[userId][type] = [];
    }

    healthData[userId][type].push({
      id: recordId,
      ...data,
      timestamp
    });

    res.json({
      message: 'Health data recorded successfully',
      recordId,
      timestamp
    });

  } catch (error) {
    console.error('Health record error:', error);
    res.status(500).json({ error: 'Failed to record health data' });
  }
});

// Get health trends
router.get('/trends/:userId/:type', (req, res) => {
  try {
    const { userId, type } = req.params;
    const { period = '7d' } = req.query;

    // Mock trend data
    const trendData = {
      type,
      period,
      data: [],
      summary: {
        average: 0,
        trend: 'stable',
        change: 0
      },
      timestamp: new Date().toISOString()
    };

    res.json(trendData);

  } catch (error) {
    console.error('Health trends error:', error);
    res.status(500).json({ error: 'Failed to fetch health trends' });
  }
});

module.exports = router;