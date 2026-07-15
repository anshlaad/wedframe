import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const RSVP = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', is_attending: 'Yes', guests_count: 1 });
  const [status, setStatus] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "https://wedframe-backend.onrender.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    // Dhyan rakhna ki tera Django endpoint /api/rsvp/ ho
    axios.post(`${API_URL}/api/rsvp/`, formData)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-5xl font-serif text-amber-500 mb-6">RSVP</h2>
      <p className="text-rose-200/80 mb-8">We would love to know if you can make it!</p>
      
      {status === "success" ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-green-900/30 border border-green-500/50 p-6 rounded-2xl">
          <h3 className="text-xl text-green-400">Thank You!</h3>
          <p className="text-rose-100 mt-2">Your response has been saved.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-rose-900/30 flex flex-col gap-4">
          <input required type="text" placeholder="Your Name" className="bg-black/50 border border-rose-900/50 rounded-lg p-3 text-rose-50 focus:outline-none focus:border-amber-500"
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
            
          <input required type="text" placeholder="Phone Number" className="bg-black/50 border border-rose-900/50 rounded-lg p-3 text-rose-50 focus:outline-none focus:border-amber-500"
            onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            
          <div className="flex gap-4">
            <select className="flex-1 bg-black/50 border border-rose-900/50 rounded-lg p-3 text-rose-50 focus:outline-none focus:border-amber-500"
              onChange={(e) => setFormData({...formData, is_attending: e.target.value})}>
              <option value="Yes">Yes, I'll attend</option>
              <option value="No">Sorry, I can't</option>
            </select>
            
            <input required type="number" min="1" placeholder="Guests" className="w-24 bg-black/50 border border-rose-900/50 rounded-lg p-3 text-rose-50 focus:outline-none focus:border-amber-500"
              value={formData.guests_count}
              onChange={(e) => setFormData({...formData, guests_count: e.target.value})} />
          </div>

          <button type="submit" disabled={status === "submitting"} className="mt-4 bg-amber-700/80 hover:bg-amber-600 text-rose-50 py-3 rounded-lg font-semibold transition-all">
            {status === "submitting" ? "Sending..." : "Send RSVP"}
          </button>
        </form>
      )}
    </div>
  );
};

export default RSVP;