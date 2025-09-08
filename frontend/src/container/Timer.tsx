import React, { useState, useEffect } from 'react';
import type { TimerProps } from '../types';
import { formatTime } from '../utils';
import { Play, Pause, RotateCcw, Clock, Save } from 'lucide-react';
import Button from '../components/ui/Button';

interface TimerPropsExtended extends TimerProps {
  onSaveSession?: (startTime: string, endTime: string) => void;
}

const Timer: React.FC<TimerPropsExtended> = ({ time: initialTime = 0, onSaveSession }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  // Timer automatique
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleToggle = () => setIsRunning(prev => !prev);

  const handleSaveSession = () => {
    if (onSaveSession && time > 0) {
      const now = new Date();
      const endTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const startTimeDate = new Date(now.getTime() - time * 1000);
      const startTime = startTimeDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      onSaveSession(startTime, endTime);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-blue-600" />
            Timer
          </h2>
        </div>
        <p className="text-gray-600">Track your focused work sessions</p>
      </div>

      {/* Timer Display */}
      <div className="relative z-10 text-center mb-8">
        <div className="text-3xl font-mono font-bold text-gray-800">{formatTime(time)}</div>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex items-center justify-center space-x-4">
        <Button
          onClick={handleToggle}
          className={`px-16 py-2 rounded-xl font-semibold text-white shadow-lg transform transition-all duration-200 ${
            isRunning
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
          }`}
        >
          {isRunning ? <><Pause className="w-6 h-6 mr-2" /> Pause</> : <><Play className="w-6 h-6 mr-2" /> Start</>}
        </Button>

        {!isRunning && time > 0 && onSaveSession && (
          <Button
            onClick={handleSaveSession}
            className="px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
          >
            <Save className="w-5 h-5 mr-2" /> Save Session
          </Button>
        )}

        {time > 0 && (
          <Button
            onClick={handleReset}
            className="p-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
            <span className="sr-only">Reset Timer</span>
          </Button>
        )}
      </div>

      {/* Summary */}
      <div className="relative z-10 mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-gray-900">{Math.floor(time / 60)}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Minutes</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{Math.floor((time / 3600) * 10) / 10}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Hours</div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="relative z-10 mt-6 text-center">
        <p className="text-xs text-gray-400 italic">
          {isRunning
            ? "Keep going! Every minute counts towards your goals."
            : time > 0
              ? "Session paused. Save your progress or continue working."
              : "Ready to boost your productivity? Let's start tracking!"
          }
        </p>
      </div>
    </div>
  );
};

export default Timer;
