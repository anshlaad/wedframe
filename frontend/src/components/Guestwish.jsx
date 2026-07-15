import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Guestwish = () => {
  const [wishes, setWishes] = useState([]);
  const [showWishes, setShowWishes] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "https://wedframe-backend.onrender.com";

  // Fetch Wishes (Dhyan rakhna tera API link /api/guestbook/ ya jo tune set kiya ho wo ho)
  const fetchWishes = () => {
    axios.get(`${API_URL}/api/guestbook/`)
      .then(res => setWishes(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    axios.post(`${API_URL}/api/guestbook/`, formData)
      .then(() => {
        setStatus("success");
        setFormData({ name: '', message: '' });
        fetchWishes(); // Nayi wish aane par list update karo
      })
      .catch(() => setStatus("error"));
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-5xl font-serif text-amber-500 mb-6">Leave a Wish</h2>
      
      {/* Wish Form */}
      <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-rose-900/30 mb-8 flex flex-col gap-4">
        <input required type="text" placeholder="Your Name" value={formData.name}
          className="bg-black/50 border border-rose-900/50 rounded-lg p-3 text-rose-50 focus:outline-none focus:border-amber-500"
          onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <textarea required placeholder="Your Message for the Couple..." rows="3" value={formData.message}
          className="bg-black/50 border border-rose-900/50 rounded-lg p-3 text-rose-50 focus:outline-none focus:border-amber-500"
          onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
        <button type="submit" className="bg-amber-700/80 hover:bg-amber-600 text-rose-50 py-3 rounded-lg font-semibold transition-all">
          {status === "submitting" ? "Posting..." : "Post Wish"}
        </button>
        {status === "success" && <p className="text-green-400 mt-2 text-sm">Wish posted successfully!</p>}
      </form>

      {/* Toggle Button */}
      <button onClick={() => setShowWishes(!showWishes)} className="border border-amber-500/50 text-amber-500 px-6 py-2 rounded-full hover:bg-amber-500/10 transition-all">
        {showWishes ? "Hide Wishes" : `Read Wishes (${wishes.length})`}
      </button>

      {/* Hidden Wishes List */}
      <AnimatePresence>
        {showWishes && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-8 flex flex-col gap-4 text-left overflow-hidden">
            {wishes.map((wish, index) => (
              <div key={index} className="bg-rose-950/20 border border-rose-900/30 p-4 rounded-xl">
                <h4 className="font-bold text-amber-400">{wish.name}</h4>
                <p className="text-rose-100/90 mt-1 italic">"{wish.message}"</p>
              </div>
            ))}
            {wishes.length === 0 && <p className="text-center text-rose-200/50">No wishes yet. Be the first!</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Guestwish;