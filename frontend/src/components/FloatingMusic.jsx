import React, { useState, useRef } from 'react';
import { Music, Pause } from 'lucide-react';

const FloatingMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Audio Element (Apna koi bhi romantic mp3 link yahan daal dena) */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      <button 
        onClick={togglePlay}
        className={`p-4 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.3)] backdrop-blur-md border border-amber-500/50 transition-all duration-300 flex items-center justify-center ${isPlaying ? 'bg-amber-500 text-stone-900 animate-pulse' : 'bg-black/60 text-amber-400 hover:bg-black/80'}`}
      >
        {isPlaying ? <Pause size={24} /> : <Music size={24} className="animate-bounce" />}
      </button>
    </div>
  );
};

export default FloatingMusic;