import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder audio file - replace with actual audio later
  const audioSrc = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhDkyXz+/VgSgFl2Uc";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.loop = true;
    audio.volume = 0.3; // Low volume for background music

    const handleUserInteraction = () => {
      setHasInteracted(true);
      if (!isMuted) {
        audio.play().catch(console.error);
        setIsPlaying(true);
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      setIsMuted(false);
      if (hasInteracted) {
        audio.play().catch(console.error);
        setIsPlaying(true);
      }
    } else {
      setIsMuted(true);
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        muted={isMuted}
      />
      
      {/* Audio Control Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 bg-background/80 backdrop-blur-md border border-border p-3 shadow-lg hover:bg-muted transition-all duration-300"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>

      {/* Initial notification */}
      {!hasInteracted && (
        <div className="fixed bottom-20 right-6 z-50 bg-foreground text-background px-4 py-2 text-sm shadow-lg animate-pulse">
          Click anywhere to enable audio
        </div>
      )}
    </>
  );
};

export default AudioPlayer;