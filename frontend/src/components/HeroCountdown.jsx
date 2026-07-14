import React, { useState, useEffect } from 'react';
import { Images } from 'lucide-react';
import axios from 'axios'; // Backend se connect karne ke liye add kiya

const HeroCountdown = () => {
  // Backend se data aane tak ka default state (tumhari nayi date ke sath)
  const [details, setDetails] = useState({
    groom_name: "Ansh",
    bride_name: "[Bride Name]",
    wedding_date: "2027-01-30T19:00:00",
    city: "Bhopal", 
    master_drive_link: "#"
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  // API se live details fetch karna
  useEffect(() => {
    axios.get('https://wedframe-backend.onrender.com/api/wedding-details/')
      .then(response => {
        if (response.data.length > 0) {
          setDetails(response.data[0]);
        }
      })
      .catch(error => console.log("Backend not connected yet", error));
  }, []);

  // Timer logic jo backend ki date par sync chalega
  useEffect(() => {
    const weddingDate = new Date(details.wedding_date).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [details.wedding_date]);

  // Date ko display format mein convert karne ke liye
  const displayDate = new Date(details.wedding_date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }).toUpperCase();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-white text-center overflow-hidden">
      
      {/* --- OPTION 1: IMAGE BACKGROUND (Premium cinematic zoom effect ke sath) --- */}
      <div 
        className="absolute inset-0 z-0 scale-105 transform transition-transform duration-[10s] hover:scale-100"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* --- OPTION 2: VIDEO BACKGROUND (Ready for Future) --- */}
      {/* Jab video lagani ho, toh upar wala Option 1 hata kar yeh niche wala uncomment kar dena */}
      {/*
      <video
        autoPlay
        loop
        muted
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="YOUR_VIDEO_URL.mp4" type="video/mp4" />
      </video>
      */}

      {/* Rich Elegant Gradient Overlay (Black to Soft Rose Gold) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#2a0800]/70 z-0"></div> 

      {/* Main Content with Animations */}
      <div className="relative z-10 px-4 flex flex-col items-center w-full">
        
        {/* Animated Top Banner */}
        <div className="animate-fade-up flex items-center gap-3 mb-4 mt-8">
          <div className="h-[1px] w-12 bg-amber-400"></div>
          <h3 className="text-sm md:text-lg font-light tracking-[0.3em] uppercase text-amber-100">The Wedding Of</h3>
          <div className="h-[1px] w-12 bg-amber-400"></div>
        </div>

        {/* Dynamic Names from Backend */}
        <h1 className="animate-fade-up delay-100 text-6xl md:text-8xl font-bold font-serif mb-6 text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] capitalize">
          {details.groom_name} <span className="text-amber-400 mx-2">&</span> {details.bride_name}
        </h1>
        
        {/* 🌟 Dynamic City Fetching Here */}
        <p className="text-lg md:text-xl font-light tracking-widest text-gray-200 mb-12 uppercase">
          {new Date(details.wedding_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {details.city}
        </p>
        
        {/* Premium Glass Countdown */}
        <div className="animate-fade-up delay-300 flex gap-3 md:gap-6 justify-center mb-12">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 w-20 md:w-28 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <span className="text-3xl md:text-5xl font-serif font-bold text-amber-400">{item.value}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] mt-2 text-gray-300">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Floating Drive Button - Dynamic Link */}
        <a 
          href={details.master_drive_link !== "#" ? details.master_drive_link : "YOUR_GOOGLE_DRIVE_LINK_HERE"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="animate-fade-up delay-300 group flex items-center gap-3 bg-amber-500/90 hover:bg-amber-400 backdrop-blur-md text-stone-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)]"
        >
          <Images size={22} className="group-hover:scale-110 transition-transform duration-300" />
          <span>Access Drive Photos</span>
        </a>

      </div>
    </div>
  );
};

export default HeroCountdown;