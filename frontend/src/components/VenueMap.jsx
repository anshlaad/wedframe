import React, { useState, useEffect } from 'react';
import { MapPin, Phone } from 'lucide-react';
import axios from 'axios';

const VenueMap = () => {
  // 🌟 Default state matching the backend model
  const [venue, setVenue] = useState({
    venue_name: "Lotus City",
    venue_address: "City Name, State, Pincode",
    map_embed_url: "https://www.google.com/maps/embed?pb=...", // Default map
    contact_1_name: "Family Member 1",
    contact_1_phone: "+91 98765 43210",
    contact_2_name: "Family Member 2",
    contact_2_phone: "+91 98765 43211",
  });

  // 🌟 Fetching from the same WeddingDetails API
  useEffect(() => {
    axios.get('http://localhost:8000/api/wedding-details/')
      .then(response => {
        if (response.data.length > 0) {
          setVenue(response.data[0]);
        }
      })
      .catch(error => console.log("Venue API Error", error));
  }, []);

  return (
    <div className="w-full text-rose-50 flex flex-col items-center justify-between pt-10 pb-6 px-6">
      
      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-8 items-center justify-center">
        
        <div className="flex-1 w-full space-y-8 text-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-amber-400 mb-4 drop-shadow-md">See You There!</h2>
            <p className="text-lg text-rose-200/80">We can't wait to celebrate our special day with you.</p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-xl border border-rose-900/50 p-8 rounded-3xl shadow-2xl flex flex-col items-center">
            
            <div className="flex flex-col items-center gap-3 mb-8">
              <MapPin className="text-amber-500 shrink-0" size={32} />
              <div>
                <h3 className="text-xl font-serif font-semibold text-amber-100 mb-2">{venue.venue_name}</h3>
                <p className="text-rose-200/70 text-sm leading-relaxed whitespace-pre-line">
                  {venue.venue_address}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Phone className="text-amber-500 shrink-0" size={32} />
              <div>
                <h3 className="text-xl font-serif font-semibold text-amber-100 mb-2">Contact For Help</h3>
                <p className="text-rose-200/70 text-sm">{venue.contact_1_name}: {venue.contact_1_phone}</p>
                {venue.contact_2_name && (
                  <p className="text-rose-200/70 text-sm mt-1">{venue.contact_2_name}: {venue.contact_2_phone}</p>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className="flex-1 w-full h-72 md:h-[420px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(251,191,36,0.1)] border border-rose-900/50 relative opacity-90 hover:opacity-100 transition-opacity">
          {/* 🌟 Dynamic Iframe Src */}
          <iframe 
            title="Venue Location Map"
            src={venue.map_embed_url || "https://www.google.com/maps/embed"} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="mt-16 w-full text-center">
        <div className="w-32 h-[1px] bg-rose-900/50 mx-auto mb-6"></div>
        <p className="text-xs md:text-sm text-rose-300/50 tracking-wider">
          Managed & Organized beautifully by <span className="text-amber-500/80 font-bold tracking-widest uppercase">BrilliantEvents</span>
        </p>
      </div>

    </div>
  );
};

export default VenueMap;