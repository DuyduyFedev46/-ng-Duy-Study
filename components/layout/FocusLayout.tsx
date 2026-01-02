import React from 'react';
import { BackgroundController } from './BackgroundController';
import { Timer } from '../widgets/Timer';
import { SoundMixer } from '../widgets/SoundMixer';
import { TodoList } from '../widgets/TodoList';
import { SceneSelector } from './SceneSelector';
import { useStore } from '../../store/useStore';
import { CheckSquare, Music, Clock, Image as ImageIcon } from 'lucide-react';

export const FocusLayout: React.FC = () => {
  const { 
    showTimer, showTodoList, showMixer, showSceneSelector,
    toggleWidget 
  } = useStore();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* LAYER 1: Background Video/Image (z-0) */}
      <BackgroundController />

      {/* LAYER 2: UI Overlay Content (z-20) */}
      <main className="relative z-20 w-full h-full p-6 flex flex-col">
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/5 shadow-lg">
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            <span className="font-bold text-lg tracking-tight">FocusFlow</span>
          </div>
          
          <div className="flex gap-2">
             <a href="https://github.com/google/generative-ai-js" target="_blank" rel="noreferrer" className="px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-sm hover:bg-white/10 transition-colors border border-white/5 font-medium">
                About
             </a>
          </div>
        </header>

        {/* Center Workspace Area */}
        <div className="flex-1 flex items-center justify-center relative perspective-1000">
          
          {/* Centered Timer */}
          <div className={`transition-all duration-500 ease-out transform ${showTimer ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute'}`}>
            <Timer />
          </div>

          {/* Sound Mixer: Left Side */}
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out transform ${showMixer ? 'translate-x-0 opacity-100 blur-0' : '-translate-x-12 opacity-0 blur-sm pointer-events-none'}`}>
            <SoundMixer />
          </div>

          {/* Todo List: Right Side */}
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out transform ${showTodoList ? 'translate-x-0 opacity-100 blur-0' : 'translate-x-12 opacity-0 blur-sm pointer-events-none'}`}>
            <TodoList />
          </div>

          {/* Scene Selector: Bottom Center (Above dock) */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-8 transition-all duration-500 ease-out transform origin-bottom ${showSceneSelector ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90 pointer-events-none'}`}>
             <SceneSelector />
          </div>

        </div>

        {/* Bottom Dock / Control Bar */}
        <footer className="mt-auto flex justify-center pb-6 pt-2">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-2xl flex items-center gap-8 hover:bg-black/70 transition-colors duration-300">
            <ControlButton 
              active={showTimer} 
              onClick={() => toggleWidget('timer')} 
              icon={Clock} 
              label="Timer" 
            />
            <ControlButton 
              active={showMixer} 
              onClick={() => toggleWidget('mixer')} 
              icon={Music} 
              label="Sounds" 
            />
            <ControlButton 
              active={showTodoList} 
              onClick={() => toggleWidget('todo')} 
              icon={CheckSquare} 
              label="Tasks" 
            />
            <div className="w-px h-8 bg-white/10 mx-2" />
            <ControlButton 
              active={showSceneSelector} 
              onClick={() => toggleWidget('scenes')} 
              icon={ImageIcon} 
              label="Spaces" 
            />
          </div>
        </footer>
      </main>
    </div>
  );
};

interface ControlButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`group relative flex flex-col items-center gap-1 transition-all duration-300 ease-out hover:-translate-y-1 ${active ? 'text-white' : 'text-white/50 hover:text-white'}`}
  >
    <div className={`p-3 rounded-2xl transition-all duration-300 ${
      active 
        ? 'bg-white/15 shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-110' 
        : 'hover:bg-white/10 hover:scale-110'
    }`}>
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    </div>
    <span className="text-[11px] font-medium absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 text-white/80">
      {label}
    </span>
    {active && (
      <span className="absolute -top-1 right-0 w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_#6366f1] border-2 border-black" />
    )}
  </button>
);
