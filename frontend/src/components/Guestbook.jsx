import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Guestbook = () => {
  const [wishes, setWishes] = useState([]);
  const [showWishes, setShowWishes] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "https://wedframe-backend.onrender.com";

  const fetchWishes = () => {
    axios.get(`${API_URL}/api/guestbook/`)
      .then(res => setWishes(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { fetchWishes(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    axios.post(`${API_URL}/api/guestbook/`, formData)
      .then(() => {
        setStatus("success");
        setFormData({ name: '', message: '' });
        fetchWishes();
        setTimeout(() => setStatus(null), 3000); // Reset success after 3 sec
      })
      .catch(() => setStatus("error"));
  };

  // Staggered Animation variants for cards
  const containerVars = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVars = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-serif text-amber-500 mb-2">Blessings & Love</h2>
      <p className="text-rose-200/60 mb-10 italic">Leave a note for the couple's new journey</p>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-amber-900/30 mb-10 flex flex-col gap-6 shadow-xl relative group focus-within:border-amber-500/50 transition-colors">
        <input required type="text" placeholder="Your Name" value={formData.name}
          className="bg-white/5 border border-rose-900/30 rounded-xl p-4 text-rose-50 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-all placeholder:text-rose-200/40"
          onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <textarea required placeholder="Write your heartfelt wishes here..." rows="3" value={formData.message}
          className="bg-white/5 border border-rose-900/30 rounded-xl p-4 text-rose-50 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-all placeholder:text-rose-200/40 resize-none"
          onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
        
        <button type="submit" className="bg-rose-900/80 hover:bg-amber-600 text-rose-50 py-4 rounded-xl font-bold tracking-wide transition-all border border-rose-700 hover:border-amber-400">
          {status === "submitting" ? "Sending Love..." : status === "success" ? "Wish Sent! ❤️" : "Drop Your Wish"}
        </button>
      </form>

      <button onClick={() => setShowWishes(!showWishes)} 
        className="flex items-center gap-2 mx-auto border-b-2 border-amber-500 text-amber-400 pb-1 hover:text-amber-300 transition-colors uppercase tracking-widest text-sm font-bold">
        {showWishes ? "Hide Messages" : `Read Guest Messages (${wishes.length})`}
      </button>

      <AnimatePresence>
        {showWishes && (
          <motion.div variants={containerVars} initial="hidden" animate="show" exit="hidden" 
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
          >
            {wishes.map((wish, index) => (
              <motion.div key={index} variants={itemVars} 
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-rose-900/30 p-6 rounded-2xl hover:border-amber-500/40 hover:-translate-y-2 transition-all group overflow-hidden"
              >
                {/* Decorative Quote Mark */}
                <div className="absolute top-2 right-4 text-6xl text-amber-500/10 font-serif group-hover:text-amber-500/20 transition-colors">"</div>
                <p className="text-rose-100/90 leading-relaxed mb-4 italic relative z-10">{wish.message}</p>
                <div className="w-10 h-[1px] bg-amber-500/50 mb-3"></div>
                <h4 className="font-bold text-amber-400 tracking-wide">{wish.name}</h4>
              </motion.div>
            ))}
            {wishes.length === 0 && <p className="text-center text-rose-200/50 col-span-full">The book is empty. Be the first to write a wish!</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Guestbook;