import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <video
          autoPlay
          muted
          playsInline
          onEnded={onComplete} // Video khatam hote hi main site dikha dega
          className="w-full h-full object-cover"
        >
          {/* Yahan apni invitation video ka link daal dena */}
          <source src="YOUR_INVITATION_VIDEO_URL.mp4" type="video/mp4" />
        </video>

        {/* Agar video load hone mein time le, toh ek 'Skip' button bhi daal sakte ho */}
        <button 
          onClick={onComplete}
          className="absolute bottom-10 text-white/50 text-sm tracking-widest uppercase hover:text-white transition-colors"
        >
          Skip Intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;