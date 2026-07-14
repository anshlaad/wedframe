import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgramDetails = () => {
  // Backend se events store karne ke liye state
  const [events, setEvents] = useState([]);

  // Component load hote hi Django API se data fetch karega
  useEffect(() => {
    axios.get('http://wedframe-backend.onrender.com/api/programs/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Backend not connected or API error:", error);
      });
  }, []);

  // Agar admin panel se koi event add nahi hua hai, toh yeh section hide rahega
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl md:text-5xl font-bold text-amber-400 mb-10 font-serif text-center">Wedding Itinerary</h2>
      
      <div className="flex flex-row overflow-x-auto gap-6 w-full max-w-5xl px-4 snap-x snap-mandatory pb-6 hide-scrollbar">
        {events.map((event, index) => (
          <div key={event.id || index} className="min-w-[85vw] md:min-w-[320px] snap-center bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-rose-900/50 flex-shrink-0">
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
  );
};

export default ProgramDetails;