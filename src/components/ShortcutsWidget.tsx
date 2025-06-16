import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Shortcut {
  name: string;
  url: string;
  icon: string;
  color: string;
}

const ShortcutsWidget: React.FC = () => {
  const shortcuts: Shortcut[] = [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', color: 'bg-blue-600' },
    { name: 'YouTube', url: 'https://youtube.com', icon: '📺', color: 'bg-red-600' },
    { name: 'GitHub', url: 'https://github.com', icon: '🐙', color: 'bg-gray-800' },
    { name: 'Netflix', url: 'https://netflix.com', icon: '🎬', color: 'bg-red-700' },
    { name: 'JioCinema', url: 'https://jiocinema.com', icon: '🎭', color: 'bg-purple-600' },
    { name: 'LeetCode', url: 'https://leetcode.com', icon: '💻', color: 'bg-orange-500' },
    { name: 'GeeksforGeeks', url: 'https://geeksforgeeks.org', icon: '🤓', color: 'bg-green-600' },
    { name: 'WhatsApp', url: 'https://web.whatsapp.com', icon: '💬', color: 'bg-green-500' }
  ];

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-medium text-lg">Shortcuts</h3>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {shortcuts.map((shortcut, index) => (
          <a
            key={index}
            href={shortcut.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-4 rounded-xl hover:bg-slate-700/30 transition-all duration-200"
          >
            <div className={`w-12 h-12 ${shortcut.color} rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200`}>
              <span className="text-xl">{shortcut.icon}</span>
            </div>
            <span className="text-slate-300 text-sm text-center group-hover:text-white transition-colors">
              {shortcut.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShortcutsWidget;