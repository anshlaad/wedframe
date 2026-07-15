import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const RSVP = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', is_attending: 'Yes', guests_count: 1 });
  const [status, setStatus] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "https://wedframe-backend.onrender.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    axios.post(`${API_URL}/api/rsvp/`, formData)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 text-center relative z-10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-600/20 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
      
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 mb-4"
      >
        You're Invited
      </motion.h2>
      <p className="text-rose-200/80 mb-10 tracking-widest uppercase text-sm">Please RSVP by 1st March</p>
      
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div 
            key="success"
            initial={{ scale: 0.8, opacity: 0, rotateX: 90 }} 
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-amber-500/50 p-8 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mx-auto mb-4 text-green-400 text-2xl">✓</div>
            <h3 className="text-3xl font-serif text-amber-400 mb-2">Thank You, {formData.name.split(' ')[0]}!</h3>
            <p className="text-rose-100/80">Your VIP presence has been confirmed. We can't wait to host you.</p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            onSubmit={handleSubmit} 
            className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-rose-900/40 flex flex-col gap-8 shadow-2xl relative overflow-hidden"
          >
            {/* Minimalist Inputs */}
            <div className="relative">
              <input required type="text" placeholder="Your Full Name" 
                className="w-full bg-transparent border-b-2 border-rose-900/50 p-3 text-rose-50 text-lg focus:outline-none focus:border-amber-500 transition-colors placeholder:text-rose-200/30"
                onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div className="relative">
              <input required type="text" placeholder="WhatsApp Number" 
                className="w-full bg-transparent border-b-2 border-rose-900/50 p-3 text-rose-50 text-lg focus:outline-none focus:border-amber-500 transition-colors placeholder:text-rose-200/30"
                onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <select className="flex-1 bg-[#1a0906] border-b-2 border-rose-900/50 p-3 text-rose-50 text-lg focus:outline-none focus:border-amber-500 transition-colors"
                onChange={(e) => setFormData({...formData, is_attending: e.target.value})}>
                <option value="Yes">Joyfully Accept</option>
                <option value="No">Regretfully Decline</option>
              </select>
              
              <input required type="number" min="1" placeholder="Guests" value={formData.guests_count}
                className="w-full md:w-32 bg-transparent border-b-2 border-rose-900/50 p-3 text-rose-50 text-lg focus:outline-none focus:border-amber-500 text-center"
                onChange={(e) => setFormData({...formData, guests_count: e.target.value})} />
            </div>

            <button type="submit" disabled={status === "submitting"} 
              className="mt-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black py-4 rounded-xl font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:-translate-y-1"
            >
              {status === "submitting" ? "Confirming..." : "Confirm Attendance"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RSVP;