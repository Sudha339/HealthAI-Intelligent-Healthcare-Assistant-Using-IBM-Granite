import React from 'react';
import { Heart, Shield, Brain, Phone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">HealthAI</h1>
              <p className="text-sm text-white/80 font-medium">Intelligent Healthcare Assistant</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-red-400 bg-red-500/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-red-400/30 hover:bg-red-500/30 transition-all duration-300">
              <Phone className="w-5 h-5" />
              <div className="text-sm">
                <div className="font-bold">Emergency: 911</div>
                <div className="text-xs text-red-300">24/7 Medical Help</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-cyan-400 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium">Powered by IBM Granite</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-400 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
          </div>
          
          {/* Mobile Emergency Button */}
          <div className="md:hidden">
            <a 
              href="tel:911" 
              className="flex items-center space-x-2 text-red-400 bg-red-500/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-400/30 hover:bg-red-500/30 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm font-bold">911</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;