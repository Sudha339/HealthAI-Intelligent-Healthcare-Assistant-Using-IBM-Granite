import React, { useState } from 'react';
import { FileText, Home, Pill, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { generateTreatmentPlan } from '../utils/treatmentGenerator';

type TreatmentPlan = {
  condition: string;
  homeRemedies: string[];
  medications: string[];
  lifestyle: string[];
  timeline: string;
  warnings: string[];
};

const TreatmentPlans: React.FC = () => {
  const { user } = useUser();
  const [selectedCondition, setSelectedCondition] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const commonConditions = [
    'Common Cold', 'Flu', 'Headache', 'Sore Throat', 'Stomachache',
    'Minor Cuts', 'Insomnia', 'Stress', 'Minor Burns', 'Allergies',
    'Muscle Pain', 'Back Pain', 'Heartburn', 'Constipation', 'Fatigue'
  ];

  const generatePlan = async () => {
    if (!selectedCondition) return;
    
    setIsGenerating(true);
    try {
      const plan = await generateTreatmentPlan(selectedCondition, user);
      setTreatmentPlan(plan);
    } catch (error) {
      console.error('Error generating treatment plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Personalized Treatment Plans</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get personalized, non-prescriptive treatment suggestions based on your profile and condition. 
          These are general recommendations - always consult healthcare professionals for proper treatment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Condition Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-6 h-6 text-blue-500 mr-2" />
            Select Condition
          </h3>

          <div className="space-y-4">
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a condition...</option>
              {commonConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>

            <button
              onClick={generatePlan}
              disabled={!selectedCondition || isGenerating}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Plan
                </>
              )}
            </button>
          </div>

          {user && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Your Profile:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>Age: {user.age} years</p>
                <p>Gender: {user.gender}</p>
                {user.conditions.length > 0 && (
                  <p>Conditions: {user.conditions.join(', ')}</p>
                )}
                {user.allergies.length > 0 && (
                  <p>Allergies: {user.allergies.join(', ')}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Treatment Plan */}
        <div className="lg:col-span-2">
          {treatmentPlan ? (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Treatment Plan for {treatmentPlan.condition}
              </h3>

              <div className="space-y-6">
                {/* Home Remedies */}
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Home className="w-5 h-5 text-green-500 mr-2" />
                    Home Remedies
                  </h4>
                  <ul className="space-y-2">
                    {treatmentPlan.homeRemedies.map((remedy, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {remedy}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Medications */}
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Pill className="w-5 h-5 text-blue-500 mr-2" />
                    Over-the-Counter Options
                  </h4>
                  <ul className="space-y-2">
                    {treatmentPlan.medications.map((med, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {med}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lifestyle */}
                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 text-purple-500 mr-2" />
                    Lifestyle Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {treatmentPlan.lifestyle.map((lifestyle, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {lifestyle}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Clock className="w-5 h-5 text-gray-600 mr-2" />
                    Expected Timeline
                  </h4>
                  <p className="text-gray-700">{treatmentPlan.timeline}</p>
                </div>

                {/* Warnings */}
                {treatmentPlan.warnings.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                      Important Warnings
                    </h4>
                    <ul className="space-y-1">
                      {treatmentPlan.warnings.map((warning, index) => (
                        <li key={index} className="text-red-700 text-sm">
                          • {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No Treatment Plan Generated</h3>
                <p>Select a condition and click "Generate Plan" to get personalized recommendations.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-700">
            <p className="font-medium mb-1">Treatment Disclaimer</p>
            <p>
              These treatment suggestions are for informational purposes only and are not prescriptive medical advice. 
              Individual responses to treatments may vary. Always consult with healthcare professionals before starting 
              any treatment regimen, especially if you have pre-existing conditions or are taking other medications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlans;