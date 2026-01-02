import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { SCENES } from '../../constants';

export const SceneSelector: React.FC = () => {
  const { currentScene, setScene } = useStore();

  return (
    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white w-full max-w-2xl mx-auto shadow-xl">
      <div className="flex items-center gap-2 mb-4 px-2">
        <ImageIcon size={18} />
        <h3 className="font-semibold">Select Environment</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {SCENES.map((scene) => (
          <button
            key={scene.id}
            onClick={() => setScene(scene)}
            className={`relative group aspect-video rounded-xl overflow-hidden border-2 transition-all ${
              currentScene.id === scene.id 
                ? 'border-white ring-2 ring-white/20' 
                : 'border-transparent hover:border-white/50'
            }`}
          >
            <img 
              src={scene.thumbnail} 
              alt={scene.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <span className="absolute bottom-2 left-2 text-xs font-medium text-white shadow-sm">
              {scene.name}
            </span>
            {currentScene.id === scene.id && (
              <div className="absolute inset-0 bg-white/10 animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};