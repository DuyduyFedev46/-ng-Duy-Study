import React, { useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TimerMode } from '../../types';
import { ALARM_SOUND_URL } from '../../constants';

export const Timer: React.FC = () => {
  const { 
    timerMode, timeLeft, isRunning, 
    setTimerMode, toggleTimer, resetTimer, tickTimer 
  } = useStore();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Timer finished
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
      resetTimer(); // Or you could keep it at 0
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, tickTimer, resetTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const modes: { id: TimerMode; label: string }[] = [
    { id: 'FOCUS', label: 'Focus' },
    { id: 'SHORT_BREAK', label: 'Short Break' },
    { id: 'LONG_BREAK', label: 'Long Break' },
  ];

  return (
    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white w-full max-w-sm shadow-xl transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-black/50">
      <audio ref={audioRef} src={ALARM_SOUND_URL} preload="auto" />
      
      <div className="flex justify-between mb-8 bg-black/40 rounded-full p-1">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setTimerMode(mode.id)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
              timerMode === mode.id 
                ? 'bg-white text-black shadow-lg' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="text-center mb-8">
        <div className="text-7xl font-bold tracking-tight font-mono tabular-nums drop-shadow-lg">
          {formatTime(timeLeft)}
        </div>
        <div className="text-white/50 text-sm mt-2 font-medium tracking-wide uppercase">
          {isRunning ? 'Stay Focused' : 'Ready to start?'}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="group h-14 w-14 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-all shadow-lg shadow-white/10 hover:scale-110 active:scale-95"
        >
          {isRunning ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-1 group-hover:translate-x-0.5 transition-transform" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="h-14 w-14 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/5 hover:rotate-180 duration-500"
        >
          <RotateCcw size={22} />
        </button>
      </div>
    </div>
  );
};
