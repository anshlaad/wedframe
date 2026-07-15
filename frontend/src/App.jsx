import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroCountdown from './components/HeroCountdown';
//import OurStory from './components/OurStory';
import FunctionGalleries from './components/FunctionGalleries'; 
import SwipeGallery from './components/SwipeGallery';
import ProgramDetails from './components/ProgramDetails';
import Guestwish from './components/Guestwish';
import RSVP from './components/RSVP';
import VenueMap from './components/VenueMap';
import FloatingMusic from './components/FloatingMusic';
import SplashScreen from './components/SplashScreen';

// 🌟 Magical Scroll Animation Wrapper
const AnimatedSection = ({ children, className }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }} // Shuru mein invisible aur thoda niche
      whileInView={{ opacity: 1, y: 0 }} // Screen pe aate hi apni jagah par aayega
      viewport={{ once: true, margin: "-100px" }} // Ek baar hi animate hoga, scroll karne par baar baar nahi
      transition={{ duration: 0.8, ease: "easeOut" }} // Ekdum smooth aur royal speed
      className={className}
    >
      {children}
    </motion.section>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <>
      {/* Agar splash active hai toh video dikhao, varna main website */}
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (

    <div className="w-full bg-linear-to-b from-[#1a0906] via-[#2d110f] to-[#1a0906] overflow-x-hidden text-rose-50 font-sans relative">
      
      <FloatingMusic />

      {/* Hero section ko normal rakha hai kyunki usme pehle se load animations hain */}
      <section className="h-screen w-full">
        <HeroCountdown />
      </section>

      <div className="w-full flex justify-center -mt-6 relative z-20 mb-12">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-amber-900/50 flex gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <div className="w-2 h-2 rounded-full bg-rose-400"></div>
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
        </motion.div>
      </div>

      {/* Baaki saare sections ko AnimatedSection mein daal diya hai */}
      {/* 
      <AnimatedSection className="w-full py-12 md:py-16">
        <OurStory />
      </AnimatedSection>
      */}

      <AnimatedSection className="w-full py-12 md:py-20">
        <ProgramDetails />
      </AnimatedSection>

      <AnimatedSection className="w-full py-10 md:py-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-600px h-400px bg-rose-900/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
        <div className="relative z-10">
          <SwipeGallery />
        </div>
      </AnimatedSection>

      

      <AnimatedSection className="w-full py-12 md:py-16">
        <FunctionGalleries />
      </AnimatedSection>

      <AnimatedSection className="w-full py-12 md:py-16">
        <RSVP />
      </AnimatedSection>

      <AnimatedSection className="w-full py-12 md:py-20 bg-black/10 border-y border-rose-900/30">
        <Guestwish />
      </AnimatedSection>

      <AnimatedSection className="w-full">
        <VenueMap />
      </AnimatedSection>

      <footer className="w-full py-8 text-center border-t border-amber-900/30 bg-black/60 relative z-20">
        <p className="text-sm text-rose-200/60 font-serif mb-1">
          Wedding Designed & Managed By
        </p>
        <a href="https://instagram.com/teripage" target="_blank" rel="noreferrer" className="text-lg text-amber-500 font-bold tracking-widest hover:text-amber-400 transition-colors">
          BrilliantEvents
        </a>
      </footer>

    </div>
  )};
  </>
);
}

export default App;