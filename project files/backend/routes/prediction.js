const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Disease database for predictions
const diseaseDatabase = {
  'Common Cold': {
    symptoms: ['runny nose', 'sore throat', 'cough', 'sneezing', 'mild headache'],
    description: 'A viral infection affecting the upper respiratory tract, typically lasting 7-10 days.',
    recommendations: [
      'Get plenty of rest and stay hydrated',
      'Use saline nasal drops to clear congestion',
      'Consider over-the-counter pain relievers if needed'
    ],
    urgency: 'low'
  },
  'Influenza (Flu)': {
    symptoms: ['fever', 'muscle aches', 'fatigue', 'cough', 'headache', 'chills'],
    description: 'A viral respiratory infection that can cause severe illness, typically lasting 1-2 weeks.',
    recommendations: [
      'Rest and increase fluid intake significantly',
      'Consider antiviral medication if within 48 hours of symptom onset',
      'Monitor temperature and seek care if fever is very high'
    ],
    urgency: 'medium'
  },
  'Migraine': {
    symptoms: ['severe headache', 'nausea', 'sensitivity to light', 'dizziness'],
    description: 'A neurological condition causing intense headaches, often with additional symptoms.',
    recommendations: [
      'Rest in a dark, quiet room',
      'Apply cold or warm compress to head or neck',
      'Stay hydrated and maintain regular sleep schedule'
    ],
    urgency: 'medium'
  },
  'Gastroenteritis': {
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal pain', 'fatigue'],
    description: 'Inflammation of the stomach and intestines, often caused by viral or bacterial infection.',
    recommendations: [
      'Stay hydrated with clear fluids and electrolyte solutions',
      'Follow the BRAT diet (bananas, rice, applesauce, toast)',
      'Avoid dairy and fatty foods temporarily'
    ],
    urgency: 'medium'
  }
};

// Predict disease endpoint
router.post('/analyze', [
  body('symptoms').isArray({ min: 1 }),
  body('symptoms.*.name').trim().isLength({ min: 1 }),
  body('symptoms.*.severity').isIn(['mild', 'moderate', 'severe'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { symptoms } = req.body;

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const predictions = [];

    // Calculate probability for each disease
    for (const [disease, data] of Object.entries(diseaseDatabase)) {
      let matchCount = 0;
      let severityBonus = 0;

      // Count symptom matches
      for (const symptom of symptoms) {
        if (data.symptoms.some(ds => 
          ds.includes(symptom.name.toLowerCase()) || 
          symptom.name.toLowerCase().includes(ds)
        )) {
          matchCount++;
          // Add bonus for severity
          if (symptom.severity === 'severe') severityBonus += 0.2;
          else if (symptom.severity === 'moderate') severityBonus += 0.1;
        }
      }

      // Calculate probability
      const baseProbability = (matchCount / data.symptoms.length) * 100;
      const finalProbability = Math.min(95, Math.max(5, baseProbability + (severityBonus * 100)));

      if (matchCount > 0) {
        predictions.push({
          condition: disease,
          probability: Math.round(finalProbability),
          description: data.description,
          recommendations: data.recommendations,
          urgency: data.urgency
        });
      }
    }

    // Sort by probability and return top matches
    const sortedPredictions = predictions
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 4);

    res.json({
      predictions: sortedPredictions,
      timestamp: new Date().toISOString(),
      analysisId: Date.now().toString()
    });

  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Failed to analyze symptoms' });
  }
});

// Get common symptoms endpoint
router.get('/symptoms', (req, res) => {
  try {
    const commonSymptoms = [
      'Fever', 'Cough', 'Headache', 'Sore throat', 'Fatigue', 'Nausea',
      'Vomiting', 'Diarrhea', 'Abdominal pain', 'Chest pain', 'Shortness of breath',
      'Dizziness', 'Muscle aches', 'Joint pain', 'Rash', 'Runny nose'
    ];

    res.json({ symptoms: commonSymptoms });
  } catch (error) {
    console.error('Symptoms error:', error);
    res.status(500).json({ error: 'Failed to fetch symptoms' });
  }
});

module.exports = router;