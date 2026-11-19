import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgramDetails = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('https://wedframe-backend.onrender.com/api/programs/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Backend not connected or API error:", error);
      });
  }, []);

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-6">
      <h2 className="text-3xl md:text-5xl font-bold text-amber-400 mb-10 font-serif text-center px-4">
        Wedding Itinerary
      </h2>
      
      {/* Outer container jo slider ko frame ke andar rakhega */}
      <div className="w-full max-w-6xl overflow-hidden py-4">
        
        {/* Auto-Sliding Track */}
        <div className="animate-auto-slide gap-6 pr-6">
          {[...events, ...events].map((event, index) => (
            <div 
              key={`${event.id || 'event'}-${index}`} 
              className="w-[280px] md:w-[320px] shrink-0 bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-rose-900/50 hover:border-amber-500/50 transition-colors"
            >
              <div className="relative">
                {/* Backend se aane wali image */}
                <img src={event.image} alt={event.name} className="w-full h-44 md:h-52 object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0906] to-transparent"></div>
              </div>
              
              <div className="p-6 text-center -mt-4 relative z-10">
                {/* Backend se aane wali details */}
                <h3 className="text-2xl font-serif font-bold text-amber-100 mb-2">{event.name}</h3>
                <p className="text-amber-500 font-medium mb-1 tracking-wide">{event.date_text} | {event.time_text}</p>
                
                <div className="mt-5 pt-5 border-t border-rose-900/40">
                  <p className="text-xs text-rose-300/60 uppercase tracking-[0.2em] mb-1">Dress Code</p>
                  <p className="text-rose-100 font-semibold">{event.dress_code}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProgramDetails;