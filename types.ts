export type TimerMode = 'FOCUS' | 'SHORT_BREAK' | 'LONG_BREAK';

export interface AmbientSound {
  id: string;
  name: string;
  icon: string; // Icon name from Lucide
  url: string; // Audio file URL
  volume: number; // 0 to 100
  isPlaying: boolean;
}

export interface TodoTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Scene {
  id: string;
  name: string;
  type: 'video' | 'image';
  src: string; // YouTube ID or Image URL
  thumbnail: string;
}

export interface AppState {
  // Timer State
  timerMode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  setTimerMode: (mode: TimerMode) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;

  // Audio State
  sounds: AmbientSound[];
  setVolume: (id: string, volume: number) => void;
  toggleSound: (id: string) => void;

  // Scene/Background State
  currentScene: Scene;
  setScene: (scene: Scene) => void;
  
  // Widget Visibility
  showTimer: boolean;
  showTodoList: boolean;
  showMixer: boolean;
  showSceneSelector: boolean;
  toggleWidget: (widget: 'timer' | 'todo' | 'mixer' | 'scenes') => void;

  // Todo State
  tasks: TodoTask[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}