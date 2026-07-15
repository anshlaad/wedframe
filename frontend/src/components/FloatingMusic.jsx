import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Browser policy ke hisaab se pehle click par auto-play
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Auto-play blocked", err));
      }
      // Ek baar click hone ke baad is event ko hata do
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Yahan src mein apne MP3 file ka exact naam daalna */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      
      <motion.button 
        onClick={togglePlay}
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border-2 transition-all ${
          isPlaying 
            ? 'bg-black/60 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
            : 'bg-black/80 border-rose-900/50'
        }`}
      >
        {isPlaying ? (
          // Rotating Music Icon (Jab gaana chal raha ho)
          <div className="flex gap-1 items-center justify-center">
            <span className="w-1 h-3 bg-amber-400 rounded-full animate-pulse"></span>
            <span className="w-1 h-5 bg-amber-400 rounded-full animate-pulse delay-75"></span>
            <span className="w-1 h-3 bg-amber-400 rounded-full animate-pulse delay-150"></span>
          </div>
        ) : (
          // Muted Icon (Jab gaana band ho)
          <svg className="w-6 h-6 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4L8 8H4v8h4l4 4V4z M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" opacity="0.3"/>
            <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingMusic;