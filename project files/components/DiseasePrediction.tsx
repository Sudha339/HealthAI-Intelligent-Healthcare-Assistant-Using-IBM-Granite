import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Clock, Thermometer } from 'lucide-react';
import { predictDisease } from '../utils/diseasePredictor';

type Symptom = {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
};

type Prediction = {
  condition: string;
  probability: number;
  description: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
};

const DiseasePrediction: React.FC = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonSymptoms = [
    'Fever', 'Cough', 'Headache', 'Sore throat', 'Fatigue', 'Nausea',
    'Vomiting', 'Diarrhea', 'Abdominal pain', 'Chest pain', 'Shortness of breath',
    'Dizziness', 'Muscle aches', 'Joint pain', 'Rash', 'Runny nose'
  ];

  const addSymptom = (symptomName: string, severity: 'mild' | 'moderate' | 'severe' = 'moderate') => {
    if (symptoms.find(s => s.name.toLowerCase() === symptomName.toLowerCase())) return;
    
    const newSymptom: Symptom = {
      id: Date.now().toString(),
      name: symptomName,
      severity,
    };
    
    setSymptoms(prev => [...prev, newSymptom]);
    setSymptomInput('');
  };

  const removeSymptom = (id: string) => {
    setSymptoms(prev => prev.filter(s => s.id !== id));
  };

  const updateSymptomSeverity = (id: string, severity: 'mild' | 'moderate' | 'severe') => {
    setSymptoms(prev => prev.map(s => s.id === id ? { ...s, severity } : s));
  };

  const analyzeSymptomsHandler = async () => {
    if (symptoms.length === 0) return;
    
    setIsAnalyzing(true);
    try {
      const results = await predictDisease(symptoms);
      setPredictions(results);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">Disease Prediction</h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          Input your symptoms and get AI-powered predictions about possible conditions. 
          This is for informational purposes only - always consult a healthcare professional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Symptom Input */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Thermometer className="w-6 h-6 text-cyan-400 mr-2" />
            Add Symptoms
          </h3>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSymptom(symptomInput)}
                placeholder="Enter a symptom..."
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                onClick={() => addSymptom(symptomInput)}
                disabled={!symptomInput.trim()}
                className="bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Add
              </button>
            </div>

            <div>
              <p className="text-sm text-white/70 mb-2">Common symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => addSymptom(symptom)}
                    className="text-xs bg-white/10 hover:bg-cyan-400/20 text-white/80 hover:text-cyan-300 px-3 py-1 rounded-full transition-all duration-300 border border-white/20"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Added Symptoms */}
          {symptoms.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-white mb-3">Your Symptoms:</h4>
              <div className="space-y-2">
                {symptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <span className="font-medium text-white">{symptom.name}</span>
                    <div className="flex items-center space-x-2">
                      <select
                        value={symptom.severity}
                        onChange={(e) => updateSymptomSeverity(symptom.id, e.target.value as any)}
                        className="text-sm bg-white/10 border border-white/30 rounded px-2 py-1 text-white"
                      >
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                      </select>
                      <button
                        onClick={() => removeSymptom(symptom.id)}
                        className="text-red-400 hover:text-red-300 text-sm transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={analyzeSymptomsHandler}
                disabled={isAnalyzing}
                className="w-full mt-4 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-500 disabled:to-gray-600 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:scale-105"
              >
                {isAnalyzing ? (
                  <>
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Analyze Symptoms
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Predictions */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 text-emerald-400 mr-2" />
            Predictions
          </h3>

          {predictions.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50 text-cyan-400" />
              <p>Add symptoms and click "Analyze" to see possible conditions</p>
            </div>
          ) : (
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{prediction.condition}</h4>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(prediction.urgency)}`}>
                      {prediction.urgency.toUpperCase()} PRIORITY
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white/70">Probability</span>
                      <span className="text-sm font-medium text-white">{prediction.probability}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${prediction.probability}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-white/80 mb-3">{prediction.description}</p>
                  
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Recommendations:</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      {prediction.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-200">
            <p className="font-medium mb-1 text-red-300">Important Medical Disclaimer</p>
            <p>
              This AI-powered prediction tool is for educational purposes only and should not be used as a substitute 
              for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare 
              providers with any questions regarding your health condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasePrediction;