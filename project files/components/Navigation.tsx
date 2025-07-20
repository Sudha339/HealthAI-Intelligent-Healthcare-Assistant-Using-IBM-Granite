import React from 'react';
import { MessageCircle, Search, FileText, BarChart3, User } from 'lucide-react';

type NavigationProps = {
  activeTab: string;
  onTabChange: (tab: 'chat' | 'prediction' | 'treatment' | 'dashboard' | 'profile') => void;
};

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'chat', label: 'Chat Assistant', icon: MessageCircle },
    { id: 'prediction', label: 'Disease Prediction', icon: Search },
    { id: 'treatment', label: 'Treatment Plans', icon: FileText },
    { id: 'dashboard', label: 'Health Dashboard', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <nav className="bg-white/10 backdrop-blur-md shadow-2xl sticky top-0 z-10 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-2 px-6 py-4 whitespace-nowrap transition-all duration-300 border-b-2 relative group ${
                  isActive
                    ? 'border-cyan-400 text-cyan-400 bg-white/20 backdrop-blur-sm'
                    : 'border-transparent text-white/70 hover:text-cyan-400 hover:bg-white/10'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 rounded-t-lg"></div>
                )}
                <div className="relative z-10 flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;