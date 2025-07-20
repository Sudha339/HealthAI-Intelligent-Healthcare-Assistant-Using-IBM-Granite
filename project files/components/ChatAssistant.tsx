import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Phone } from 'lucide-react';
import { simulateAIResponse } from '../utils/aiSimulator';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your HealthAI assistant. I can help answer general health questions and provide information. Please remember that I cannot provide medical diagnosis or replace professional medical advice. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiResponse = await simulateAIResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 animate-pulse"></div>
          <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">AI Health Assistant</h2>
          <p className="opacity-90">Get reliable, AI-powered health information and guidance</p>
          </div>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-500/20 backdrop-blur-sm border-l-4 border-red-400 p-4 m-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-red-600 mr-2" />
              <div>
                <p className="text-sm font-bold text-red-300">Medical Emergency?</p>
                <p className="text-xs text-red-200">Call 911 immediately for life-threatening situations</p>
              </div>
            </div>
            <a 
              href="tel:911" 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Call 911
            </a>
          </div>
        </div>
        <div className="bg-yellow-500/20 backdrop-blur-sm border-l-4 border-yellow-400 p-4 m-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-200">
              <strong>Disclaimer:</strong> This AI assistant provides general health information only. 
              Always consult healthcare professionals for medical diagnosis and treatment.
            </p>
          </div>
        </div>

        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl backdrop-blur-sm border shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-cyan-400/30'
                    : 'bg-white/20 text-white border-white/30'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-cyan-100' : 'text-white/60'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-white/20 p-4 bg-white/5 backdrop-blur-sm">
          <div className="flex space-x-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about health symptoms, conditions, or general wellness..."
              className="flex-1 resize-none bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;