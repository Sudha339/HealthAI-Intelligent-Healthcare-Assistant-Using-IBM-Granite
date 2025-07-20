const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Treatment database
const treatmentDatabase = {
  'Common Cold': {
    homeRemedies: [
      'Drink plenty of warm fluids like herbal tea, warm water with honey and lemon',
      'Use a humidifier or breathe steam from a hot shower',
      'Gargle with warm salt water (1/2 teaspoon salt in 8 oz water)',
      'Get adequate rest and sleep to support immune system recovery'
    ],
    medications: [
      'Acetaminophen or ibuprofen for aches and pains (follow package directions)',
      'Decongestant nasal sprays for short-term relief (max 3 days)',
      'Throat lozenges or cough drops for sore throat',
      'Zinc supplements may help reduce duration if taken within 24 hours'
    ],
    lifestyle: [
      'Maintain good hygiene - wash hands frequently',
      'Avoid close contact with others to prevent spreading',
      'Stay hydrated with 8-10 glasses of fluid daily',
      'Eat nutritious foods rich in vitamin C and antioxidants'
    ],
    timeline: 'Symptoms typically improve within 7-10 days. Most people feel better after 3-4 days.',
    warnings: [
      'See a healthcare provider if symptoms worsen after 3 days',
      'Seek medical attention for high fever (over 101.3°F/38.5°C)',
      'Contact doctor if you have difficulty breathing or chest pain'
    ]
  },
  'Flu': {
    homeRemedies: [
      'Rest in bed and sleep as much as possible',
      'Drink warm broths, herbal teas, and clear fluids',
      'Use a cool-mist humidifier to ease congestion',
      'Apply warm compresses to forehead and nose for sinus pressure'
    ],
    medications: [
      'Antiviral medications if prescribed within 48 hours of symptom onset',
      'Acetaminophen or ibuprofen for fever and body aches',
      'Cough suppressants for dry cough or expectorants for productive cough',
      'Electrolyte replacement drinks if experiencing vomiting or diarrhea'
    ],
    lifestyle: [
      'Stay home and avoid work/school until fever-free for 24 hours',
      'Maintain strict hygiene to prevent spreading to others',
      'Eat light, nutritious meals when appetite returns',
      'Gradually return to normal activities as energy improves'
    ],
    timeline: 'Flu symptoms typically last 1-2 weeks. Fever usually resolves within 3-4 days.',
    warnings: [
      'Seek immediate care for difficulty breathing or chest pain',
      'Contact healthcare provider if fever exceeds 103°F (39.4°C)',
      'Get medical attention for signs of dehydration'
    ]
  }
};

// Generate treatment plan endpoint
router.post('/generate', [
  body('condition').trim().isLength({ min: 1 }),
  body('userProfile').optional().isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { condition, userProfile } = req.body;

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const baseTemplate = treatmentDatabase[condition];
    
    if (!baseTemplate) {
      // Generic treatment plan for unknown conditions
      return res.json({
        condition,
        homeRemedies: [
          'Get adequate rest and sleep',
          'Stay well hydrated with water and clear fluids',
          'Eat nutritious, easily digestible foods',
          'Practice stress reduction techniques'
        ],
        medications: [
          'Consult with a healthcare provider for appropriate medications',
          'Over-the-counter pain relievers may help if experiencing discomfort',
          'Follow medication instructions carefully'
        ],
        lifestyle: [
          'Maintain good hygiene practices',
          'Monitor symptoms and track any changes',
          'Avoid known triggers or irritants',
          'Gradually return to normal activities as you feel better'
        ],
        timeline: 'Recovery time varies depending on the specific condition. Monitor symptoms closely.',
        warnings: [
          'Consult healthcare provider if symptoms persist or worsen',
          'Seek immediate medical attention for severe symptoms',
          'This is general information only - not a substitute for professional medical advice'
        ],
        timestamp: new Date().toISOString()
      });
    }

    // Personalize based on user profile
    let personalizedPlan = { ...baseTemplate, condition };

    if (userProfile) {
      // Add age-specific recommendations
      if (userProfile.age > 65) {
        personalizedPlan.warnings.unshift('Older adults should consult healthcare providers sooner for symptoms');
      }

      // Add allergy warnings
      if (userProfile.allergies && userProfile.allergies.length > 0) {
        personalizedPlan.warnings.push(`Avoid medications you're allergic to: ${userProfile.allergies.join(', ')}`);
      }

      // Add condition-specific warnings
      if (userProfile.conditions && userProfile.conditions.includes('Diabetes')) {
        personalizedPlan.warnings.push('Monitor blood sugar levels, especially if appetite is affected');
      }

      if (userProfile.conditions && userProfile.conditions.includes('High Blood Pressure')) {
        personalizedPlan.warnings.push('Be cautious with decongestants and NSAIDs - consult your doctor');
      }
    }

    personalizedPlan.timestamp = new Date().toISOString();
    personalizedPlan.planId = Date.now().toString();

    res.json(personalizedPlan);

  } catch (error) {
    console.error('Treatment generation error:', error);
    res.status(500).json({ error: 'Failed to generate treatment plan' });
  }
});

// Get available conditions endpoint
router.get('/conditions', (req, res) => {
  try {
    const conditions = Object.keys(treatmentDatabase);
    res.json({ conditions });
  } catch (error) {
    console.error('Conditions error:', error);
    res.status(500).json({ error: 'Failed to fetch conditions' });
  }
});

module.exports = router;