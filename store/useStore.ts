import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, TimerMode } from '../types';
import { SCENES, INITIAL_SOUNDS, TIMER_SETTINGS } from '../constants';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // --- Timer Logic ---
      timerMode: 'FOCUS',
      timeLeft: TIMER_SETTINGS.FOCUS,
      isRunning: false,
      
      setTimerMode: (mode: TimerMode) => set({ 
        timerMode: mode, 
        timeLeft: TIMER_SETTINGS[mode],
        isRunning: false 
      }),
      
      toggleTimer: () => set((state) => ({ isRunning: !state.isRunning })),
      
      resetTimer: () => set((state) => ({ 
        timeLeft: TIMER_SETTINGS[state.timerMode], 
        isRunning: false 
      })),
      
      tickTimer: () => set((state) => {
        if (state.timeLeft <= 0) {
          return { isRunning: false, timeLeft: 0 };
        }
        return { timeLeft: state.timeLeft - 1 };
      }),

      // --- Audio Logic ---
      sounds: INITIAL_SOUNDS,
      
      setVolume: (id, volume) => set((state) => ({
        sounds: state.sounds.map(s => s.id === id ? { ...s, volume } : s)
      })),
      
      toggleSound: (id) => set((state) => ({
        sounds: state.sounds.map(s => s.id === id ? { ...s, isPlaying: !s.isPlaying } : s)
      })),

      // --- Scene Logic ---
      currentScene: SCENES[0],
      setScene: (scene) => set({ currentScene: scene }),

      // --- UI/Widget Logic ---
      showTimer: true,
      showTodoList: false,
      showMixer: false,
      showSceneSelector: false,
      
      toggleWidget: (widget) => set((state) => {
        switch (widget) {
          case 'timer': return { showTimer: !state.showTimer };
          case 'todo': return { showTodoList: !state.showTodoList };
          case 'mixer': return { showMixer: !state.showMixer };
          case 'scenes': return { showSceneSelector: !state.showSceneSelector };
          default: return state;
        }
      }),

      // --- Todo Logic ---
      tasks: [
        { id: '1', text: 'Define MVP Features', completed: true },
        { id: '2', text: 'Implement Global Store', completed: true },
        { id: '3', text: 'Design UI Layout', completed: false },
      ],
      
      addTask: (text) => set((state) => ({
        tasks: [...state.tasks, { id: Date.now().toString(), text, completed: false }]
      })),
      
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),
      
      removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      }))
    }),
    {
      name: 'focus-flow-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        currentScene: state.currentScene,
        // Persist only volume settings, not playing state to avoid auto-play issues on reload
        sounds: state.sounds.map(s => ({ ...s, isPlaying: false }))
      })
    }
  )
);
