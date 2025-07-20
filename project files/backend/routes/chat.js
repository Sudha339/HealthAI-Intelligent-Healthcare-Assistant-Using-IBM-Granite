const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock AI responses for health queries
const healthResponses = {
  symptoms: [
    "Based on your symptoms, there could be several possibilities. However, I recommend consulting with a healthcare professional for proper evaluation.",
    "I understand you're experiencing some symptoms. While I can provide general information, it's important to get a proper medical assessment.",
    "Symptoms can have various causes, and proper diagnosis requires medical expertise. Please consider seeing a healthcare provider."
  ],
  general: [
    "That's a great health question! Here's some general information that might help, but always consult your doctor for personalized advice.",
    "I'm here to provide general health information. For your specific situation, it's best to speak with a qualified healthcare professional.",
    "Thank you for your question about health. I can share some general insights, though individual cases vary significantly."
  ],
  emergency: [
    "This sounds like it could be serious. Please seek immediate medical attention or call emergency services if you're experiencing severe symptoms.",
    "If you're having a medical emergency, please call emergency services immediately. Don't delay seeking professional help.",
    "Your safety is the priority. If this is urgent, please contact emergency services or go to the nearest emergency room."
  ]
};

const keywordResponses = {
  'headache': "Headaches can have many causes including stress, dehydration, lack of sleep, or tension. For frequent or severe headaches, consider seeing a healthcare provider.",
  'fever': "A fever is often your body's way of fighting infection. Stay hydrated, rest, and monitor your temperature. Seek medical care if fever is high or persists.",
  'cough': "Coughs can be caused by various factors including viral infections, allergies, or irritants. A persistent cough should be evaluated by a healthcare provider.",
  'stomach pain': "Abdominal pain can range from mild digestive issues to more serious conditions. Seek medical attention for severe or persistent pain.",
  'fatigue': "Persistent fatigue can result from various factors. If fatigue significantly impacts your daily life, consider discussing with a healthcare provider."
};

// Chat endpoint
router.post('/message', [
  body('message').trim().isLength({ min: 1, max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message } = req.body;
    const userMessage = message.toLowerCase();

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    let response;

    // Check for emergency keywords
    const emergencyKeywords = ['emergency', 'urgent', 'severe pain', 'can\'t breathe', 'chest pain'];
    if (emergencyKeywords.some(keyword => userMessage.includes(keyword))) {
      response = healthResponses.emergency[Math.floor(Math.random() * healthResponses.emergency.length)] + 
        "\n\n🚨 **EMERGENCY: Call 911 immediately if this is a life-threatening situation!**";
    }
    // Check for specific health topics
    else {
      let found = false;
      for (const [keyword, keywordResponse] of Object.entries(keywordResponses)) {
        if (userMessage.includes(keyword)) {
          response = keywordResponse;
          found = true;
          break;
        }
      }

      if (!found) {
        // Check for symptom-related queries
        const symptomKeywords = ['symptom', 'pain', 'hurt', 'ache', 'feel', 'sick', 'ill'];
        if (symptomKeywords.some(keyword => userMessage.includes(keyword))) {
          response = healthResponses.symptoms[Math.floor(Math.random() * healthResponses.symptoms.length)];
        } else {
          response = healthResponses.general[Math.floor(Math.random() * healthResponses.general.length)];
        }
      }
    }

    res.json({
      response,
      timestamp: new Date().toISOString(),
      messageId: Date.now().toString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get chat history endpoint
router.get('/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // Mock chat history (replace with database query)
    const chatHistory = [
      {
        id: '1',
        message: 'Hello! How can I help you today?',
        sender: 'ai',
        timestamp: new Date().toISOString()
      }
    ];

    res.json({ chatHistory });
  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

module.exports = router;