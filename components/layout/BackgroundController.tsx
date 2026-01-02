import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

export const BackgroundController: React.FC = () => {
  const currentScene = useStore((state) => state.currentScene);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset states when scene changes
  useEffect(() => {
    setIsVideoLoaded(false);
    setHasError(false);
  }, [currentScene.id]);

  // Construct YouTube URL with all necessary params for seamless background
  const getYoutubeUrl = (id: string) => {
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      controls: '0',
      showinfo: '0',
      rel: '0',
      loop: '1',
      playlist: id, // Crucial for looping the single video
      playsinline: '1',
      modestbranding: '1',
      iv_load_policy: '3', // Hide annotations
      disablekb: '1',
      fs: '0',
      enablejsapi: '1',
      origin: typeof window !== 'undefined' ? window.location.origin : ''
    });
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  };

  const isVideo = currentScene.type === 'video';
  // Logic: Show video only if it is a video type, loaded successfully, and no error occurred.
  const showVideo = isVideo && !hasError;
  
  // Logic: Show fallback image if:
  // 1. It's an image type scene
  // 2. Video hasn't loaded yet (placeholder)
  // 3. Video encountered an error (fallback)
  const showThumbnail = !isVideo || !isVideoLoaded || hasError;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-black">
      {/* 1. Base Gradient Fallback (Deepest Layer - prevents black screen if everything fails) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* 2. Image Placeholder / Fallback */}
      <img 
        src={currentScene.thumbnail} 
        alt="Background Placeholder" 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          showThumbnail ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3. YouTube Iframe */}
      {showVideo && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none select-none"> 
           {/* Scaled to 150% to push YouTube controls/branding off-screen */}
          <iframe
            src={getYoutubeUrl(currentScene.src)}
            title="Background Video"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ pointerEvents: 'none' }}
            onLoad={() => setIsVideoLoaded(true)}
            onError={() => {
              console.warn("Video load failed, switching to fallback image.");
              setHasError(true);
            }}
          />
        </div>
      )}
      
      {/* 4. Overlay for UI readability */}
      {/* Increased opacity to bg-black/50 as requested for better contrast */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      
      {/* Optional subtle gradient to make bottom text (Scene Selector) more readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-[1]" />
    </div>
  );
};