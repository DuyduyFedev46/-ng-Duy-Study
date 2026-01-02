import { Scene, AmbientSound } from './types';

// Reliable YouTube Video IDs for embedding
// Thumbnails updated to Unsplash for high-quality error fallbacks
export const SCENES: Scene[] = [
  {
    id: 'lofi-girl',
    name: 'Lofi Girl Study',
    type: 'video',
    src: 'jfKfPfyJRdk', // Lofi Girl - 24/7 (Safe ID)
    thumbnail: 'https://images.unsplash.com/photo-1518558997970-4ddc236affcd?q=80&w=2560&auto=format&fit=crop'
  },
  {
    id: 'coffee-shop',
    name: 'Cozy Coffee Shop',
    type: 'video',
    src: 'hbgJxQEKCHC', // Coffee Shop Ambience (Safe ID)
    thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2560&auto=format&fit=crop'
  },
  {
    id: 'nature-rain',
    name: 'Rainy Forest',
    type: 'video',
    src: 'q76bMs-NwRk', // Rain in Forest (Safe ID)
    thumbnail: 'https://images.unsplash.com/photo-1440262206549-8af75161a156?q=80&w=2560&auto=format&fit=crop'
  },
  {
    id: 'space-dream',
    name: 'Deep Space',
    type: 'video',
    src: '1_iJ-l0xsFk', // Space Ambience
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2560&auto=format&fit=crop'
  }
];

export const INITIAL_SOUNDS: AmbientSound[] = [
  {
    id: 'rain',
    name: 'Rain',
    icon: 'CloudRain',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-1253.mp3',
    volume: 50,
    isPlaying: false,
  },
  {
    id: 'fire',
    name: 'Fireplace',
    icon: 'Flame',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-campfire-crackles-1330.mp3',
    volume: 40,
    isPlaying: false,
  },
  {
    id: 'birds',
    name: 'Birds',
    icon: 'Bird',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-1210.mp3',
    volume: 30,
    isPlaying: false,
  },
  {
    id: 'cafe',
    name: 'Coffee Shop',
    icon: 'Coffee',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-restaurant-crowd-talking-ambience-440.mp3',
    volume: 60,
    isPlaying: false,
  }
];

export const TIMER_SETTINGS = {
  FOCUS: 25 * 60,
  SHORT_BREAK: 5 * 60,
  LONG_BREAK: 15 * 60,
};

export const ALARM_SOUND_URL = "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3";