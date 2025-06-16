import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';

interface Reminder {
  label: string;
  start?: number;
  end?: number;
  repeatEvery?: number;
  type?: 'vibrate' | 'standard';
  customTime?: string;
}

const reminders: Reminder[] = [
  { label: '🍽️ Breakfast Time!', start: 8 * 60, end: 9 * 60 },
  { label: '🍱 Lunch Time!', start: 12 * 60 + 30, end: 13 * 60 + 30 },
  { label: '☕ Short Break', start: 15 * 60, end: 16 * 60 },
  { label: '🧘 Relax Your Mind', start: 20 * 60, end: 21 * 60 },
  { label: '🍛 Dinner Time!', start: 20 * 60 + 30, end: 21 * 60 + 30 },
  { label: '🛌 Time to Sleep', start: 23 * 60, end: 24 * 60 },
  { label: '💧 Time for Water!', repeatEvery: 60 },
  { label: '👁️ Relax Your Eyes', repeatEvery: 20, type: 'vibrate' },
];

const SelfCareReminder: React.FC = () => {
  const [activeReminder, setActiveReminder] = useState<string | null>(null);
  const [nextReminder, setNextReminder] = useState<Reminder | null>(null);
  const [completedReminders, setCompletedReminders] = useState<string[]>([]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const checkReminders = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const totalMinutes = hour * 60 + minute;

      let nextUpcoming: Reminder | null = null;
      let minDiff = Infinity;

      // Check if on proctored test sites
      const currentUrl = window.location.href;
      const proctoredSites = ['placements.skect.ac.in', 'skcet.amypo.com'];
      const isOnProctoredSite = proctoredSites.some(site => currentUrl.includes(site));

      if (isOnProctoredSite) {
        setNextReminder(null);
        setActiveReminder(null);
        return;
      }

      for (const reminder of reminders) {
        // Skip completed reminders
        if (completedReminders.includes(reminder.label)) continue;

        // Custom time reminder
        if (reminder.customTime) {
          const [customHour, customMinute] = reminder.customTime.split(':').map(Number);
          const customTotalMinutes = customHour * 60 + customMinute;
          const timeDiff = customTotalMinutes - totalMinutes;

          if (timeDiff <= 10 && timeDiff > 0) {
            triggerReminder(reminder);
            return;
          }

          if (timeDiff > 0 && timeDiff < minDiff) {
            minDiff = timeDiff;
            nextUpcoming = reminder;
          }
        }

        // Scheduled time-based reminder
        if (reminder.start !== undefined && reminder.end !== undefined) {
          const preNotifyTime = reminder.start - 10;
          if ((totalMinutes >= preNotifyTime && totalMinutes <= reminder.end) || 
              (totalMinutes >= reminder.start && totalMinutes <= reminder.end)) {
            if (!reminder.label.includes('Relax Your Eyes')) {
              triggerReminder(reminder);
              return;
            }
          }
          // Find next upcoming reminder
          if (preNotifyTime > totalMinutes && (preNotifyTime - totalMinutes) < minDiff) {
            minDiff = preNotifyTime - totalMinutes;
            nextUpcoming = reminder;
          }
        }

        // Repeat interval reminder
        if (reminder.repeatEvery && !reminder.label.includes('Relax Your Eyes')) {
          if (totalMinutes % reminder.repeatEvery === 0) {
            triggerReminder(reminder);
            return;
          }
        }
      }

      setNextReminder(nextUpcoming);
      if (!activeReminder) setActiveReminder(null);
    };

    const triggerReminder = (reminder: Reminder) => {
      setActiveReminder(reminder.label);

      // Check if on proctored test sites before showing notification
      const currentUrl = window.location.href;
      const proctoredSites = ['placement.skect.ac.in', 'skcet.amypo.com'];
      const isOnProctoredSite = proctoredSites.some(site => currentUrl.includes(site));

      if (!isOnProctoredSite && Notification.permission === 'granted') {
        new Notification(reminder.label, {
          body: reminder.customTime 
            ? `Event starting in 10 minutes! (${reminder.customTime})`
            : 'Gentle reminder to care for yourself 🧠',
        });

        if (reminder.type === 'vibrate' && 'vibrate' in navigator) {
          navigator.vibrate(200);
        }
      }
    };

    checkReminders(); // Initial check
    const interval = setInterval(checkReminders, 60 * 1000); // Every minute

    return () => clearInterval(interval);
  }, [completedReminders, activeReminder]);

  const handleComplete = (label: string) => {
    setCompletedReminders([...completedReminders, label]);
    setActiveReminder(null);
  };

  return (
    <div className="bg-teal-700/20 border border-teal-500/30 backdrop-blur-sm rounded-xl p-3">
      {activeReminder ? (
        <div className="flex items-center gap-2 text-teal-100">
          <Bell className="w-4 h-4" />
          <span className="text-sm font-medium">{activeReminder}</span>
          <input
            type="checkbox"
            className="ml-auto"
            onChange={() => handleComplete(activeReminder)}
          />
        </div>
      ) : nextReminder ? (
        <div className="flex items-center gap-2 text-teal-100/70">
          <Bell className="w-4 h-4" />
          <span className="text-sm">Next up: {nextReminder.label}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-teal-100/70">
          <Bell className="w-4 h-4" />
          <span className="text-sm">No upcoming reminders</span>
        </div>
      )}
    </div>
  );
};

export default SelfCareReminder;