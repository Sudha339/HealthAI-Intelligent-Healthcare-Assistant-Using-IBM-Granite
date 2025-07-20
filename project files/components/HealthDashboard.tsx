import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Heart, Activity, Moon, Droplets } from 'lucide-react';

const HealthDashboard: React.FC = () => {
  // Mock health data
  const weeklyHealthData = [
    { day: 'Mon', steps: 8500, sleep: 7.5, mood: 8 },
    { day: 'Tue', steps: 6200, sleep: 6.8, mood: 7 },
    { day: 'Wed', steps: 9800, sleep: 8.2, mood: 9 },
    { day: 'Thu', steps: 7300, sleep: 7.0, mood: 6 },
    { day: 'Fri', steps: 11200, sleep: 6.5, mood: 8 },
    { day: 'Sat', steps: 12500, sleep: 9.0, mood: 9 },
    { day: 'Sun', steps: 5400, sleep: 8.5, mood: 8 },
  ];

  const vitalSigns = [
    { time: '6:00', heartRate: 65, bloodPressure: 120 },
    { time: '12:00', heartRate: 78, bloodPressure: 125 },
    { time: '18:00', heartRate: 72, bloodPressure: 118 },
    { time: '22:00', heartRate: 68, bloodPressure: 115 },
  ];

  const symptomFrequency = [
    { name: 'Headache', value: 15, color: '#EF4444' },
    { name: 'Fatigue', value: 25, color: '#F59E0B' },
    { name: 'Stress', value: 35, color: '#3B82F6' },
    { name: 'Good Days', value: 25, color: '#10B981' },
  ];

  const healthMetrics = [
    { 
      title: 'Average Steps',
      value: '8,700',
      change: '+12%',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Sleep Quality',
      value: '7.6/10',
      change: '+0.3',
      icon: Moon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Heart Rate',
      value: '71 bpm',
      change: '-2 bpm',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Hydration',
      value: '2.1L',
      change: '+0.3L',
      icon: Droplets,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Health Dashboard</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitor your health trends and vital signs with comprehensive data visualization and insights.
        </p>
      </div>

      {/* Health Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                <span className={`text-sm font-medium flex items-center ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="steps" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Vital Signs Trend */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Vital Signs</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vitalSigns}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="heartRate" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="bloodPressure" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sleep Quality */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sleep & Mood Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sleep" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Symptom Distribution */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Symptom Frequency (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={symptomFrequency}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {symptomFrequency.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Health Insights */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Health Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">Positive Trend</h4>
            <p className="text-sm text-green-700">
              Your daily steps have increased by 12% this week. Keep up the excellent work with your physical activity!
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Sleep Recommendation</h4>
            <p className="text-sm text-blue-700">
              Consider maintaining a consistent bedtime routine. Your sleep quality improves when you sleep 7.5+ hours.
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Stress Management</h4>
            <p className="text-sm text-yellow-700">
              Stress levels seem elevated on weekdays. Consider incorporating meditation or relaxation techniques.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;