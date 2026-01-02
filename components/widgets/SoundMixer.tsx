import React, { useEffect, useRef } from 'react';
import { Volume2, CloudRain, Flame, Bird, Coffee } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AmbientSound } from '../../types';

const IconMap: Record<string, React.FC<any>> = {
  CloudRain,
  Flame,
  Bird,
  Coffee,
};

const SoundItem: React.FC<{ sound: AmbientSound }> = ({ sound }) => {
  const { toggleSound, setVolume } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle Play/Pause and Volume changes efficiently
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (sound.isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.warn("Audio autoplay prevented:", error);
            // Optional: Update UI to show it's paused if autoplay fails
        });
      }
    } else {
      audio.pause();
    }
  }, [sound.isPlaying]);

  useEffect(() => {
     if (audioRef.current) {
        audioRef.current.volume = sound.volume / 100;
     }
  }, [sound.volume]);

  const Icon = IconMap[sound.icon] || Volume2;

  return (
    <div className="flex items-center gap-4 mb-4 group">
      {/* Use the loop attribute for continuous play */}
      <audio ref={audioRef} src={sound.url} loop />
      
      <button
        onClick={() => toggleSound(sound.id)}
        className={`p-3 rounded-xl transition-all duration-300 transform active:scale-95 ${
          sound.isPlaying 
            ? 'bg-white text-black shadow-lg shadow-white/20' 
            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
        }`}
      >
        <Icon size={20} />
      </button>

      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1.5 font-medium">
          <span className={`transition-colors ${sound.isPlaying ? 'text-white' : 'text-white/50'}`}>
            {sound.name}
          </span>
          <span className="text-white/40 tabular-nums">{sound.volume}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sound.volume}
          onChange={(e) => setVolume(sound.id, Number(e.target.value))}
          disabled={!sound.isPlaying}
          className={`w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125
            ${sound.isPlaying ? 'opacity-100' : 'opacity-40 grayscale'}`}
        />
      </div>
    </div>
  );
};

export const SoundMixer: React.FC = () => {
  const sounds = useStore((state) => state.sounds);

  return (
    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white w-80 shadow-xl max-h-[60vh] overflow-y-auto custom-scrollbar transition-transform hover:scale-[1.01]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Volume2 size={18} /> Soundscapes
        </h3>
      </div>
      
      <div className="space-y-1">
        {sounds.map((sound) => (
          <SoundItem key={sound.id} sound={sound} />
        ))}
      </div>
    </div>
  );
};
