import React, { useState, useEffect } from 'react';
import Weather from './Weather';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  // Create clock face with hour markers
  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) - 90;
    const x1 = 50 + 35 * Math.cos(angle * Math.PI / 180);
    const y1 = 50 + 35 * Math.sin(angle * Math.PI / 180);
    const x2 = 50 + 40 * Math.cos(angle * Math.PI / 180);
    const y2 = 50 + 40 * Math.sin(angle * Math.PI / 180);
    
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
      />
    );
  });

  // Calculate hand positions
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (hours * 30) + (minutes * 0.5) - 90;
  const minuteAngle = (minutes * 6) - 90;
  const secondAngle = (seconds * 6) - 90;

  const hourX = 50 + 20 * Math.cos(hourAngle * Math.PI / 180);
  const hourY = 50 + 20 * Math.sin(hourAngle * Math.PI / 180);
  
  const minuteX = 50 + 30 * Math.cos(minuteAngle * Math.PI / 180);
  const minuteY = 50 + 30 * Math.sin(minuteAngle * Math.PI / 180);

  const secondX = 50 + 32 * Math.cos(secondAngle * Math.PI / 180);
  const secondY = 50 + 32 * Math.sin(secondAngle * Math.PI / 180);

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 h-[280px]">
      <div className="flex flex-col items-center">
        <div className="w-32 h-28 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Clock face */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />
            
            {/* Hour markers */}
            {hourMarkers}
            
            {/* Hour hand */}
            <line
              x1="50"
              y1="50"
              x2={hourX}
              y2={hourY}
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Minute hand */}
            <line
              x1="50"
              y1="50"
              x2={minuteX}
              y2={minuteY}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Second hand */}
            <line
              x1="50"
              y1="50"
              x2={secondX}
              y2={secondY}
              stroke="#3b82f6"
              strokeWidth="1"
              strokeLinecap="round"
            />
            
            {/* Center dot */}
            <circle cx="50" cy="50" r="2" fill="white" />
          </svg>
        </div>
        
        
          <div className="text-white font-medium text-lg mb-1">{formatDate(time)}</div>
         
              <Weather />
      
        </div>
      
    </div>
  );
};

export default Clock;