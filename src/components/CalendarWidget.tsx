import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
}

const CalendarWidget: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    // Mock events
    const mockEvents: CalendarEvent[] = [
      {
        id: 1,
        title: 'Team Meeting',
        date: '2025-06-13',
        time: '10:00 AM'
      },
      {
        id: 2,
        title: 'Project Review',
        date: '2025-06-14',
        time: '2:00 PM'
      }
    ];
    setEvents(mockEvents);
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Previous month's trailing days
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`prev-${i}`} className="p-2 text-slate-600 text-sm">
          {new Date(currentDate.getFullYear(), currentDate.getMonth(), -firstDay + i + 1).getDate()}
        </div>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && 
                     currentDate.getMonth() === new Date().getMonth() &&
                     currentDate.getFullYear() === new Date().getFullYear();
      
      days.push(
        <div
          key={day}
          className={`p-2 text-sm cursor-pointer rounded-lg transition-colors ${
            isToday
              ? 'bg-blue-600 text-white font-bold'
              : 'text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="w-5 h-5 text-blue-400" />
        <span className="text-white font-medium">Calendar</span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">{formatDate(currentDate)}</h3>
          <div className="flex gap-1">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="p-2 text-xs text-slate-500 text-center font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </div>

      <div className="border-t border-slate-700/50 pt-4">
        <div className="text-center mb-3">
          <div className="text-lg font-bold text-white">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
        
        {todayEvents.length > 0 ? (
          <div className="space-y-2">
            {todayEvents.map(event => (
              <div key={event.id} className="text-sm text-slate-300">
                <div className="font-medium">{event.title}</div>
                <div className="text-slate-400">{event.time}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400 text-sm">
            No events for this date
          </div>
        )}
      </div>

      <button
        onClick={() => window.open('https://calendar.google.com', '_blank')}
        className="w-full mt-4 py-2 text-blue-400 hover:text-blue-300 transition-colors text-sm underline"
      >
        Open Google Calendar
      </button>
    </div>
  );
};

export default CalendarWidget;