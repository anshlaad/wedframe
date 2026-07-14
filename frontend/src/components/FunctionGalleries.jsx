import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import axios from 'axios';

const FunctionGalleries = () => {
  // API se data store karne ke liye state
  const [folders, setFolders] = useState([]);

  // Component load hote hi backend se data fetch karega
  useEffect(() => {
    axios.get('http://wedframe-backend.onrender.com/api/function-folders/')
      .then(response => {
        setFolders(response.data);
      })
      .catch(error => {
        console.error("Backend Error: Cannot fetch folders", error);
      });
  }, []);

  // Agar admin panel mein koi folder add nahi kiya hai, toh ye section hide rahega
  if (folders.length === 0) {
    return null; 
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-amber-400 font-serif mb-3">Memories by Function</h2>
        <p className="text-rose-200/70 tracking-wider">Tap to access specific event folders</p>
      </div>
      
      <div className="flex flex-row overflow-x-auto gap-6 w-full max-w-5xl px-4 snap-x snap-mandatory pb-6 hide-scrollbar">
        {folders.map((folder, index) => (
          <a 
            key={folder.id || index} 
            href={folder.drive_link} // Backend API field name
            target="_blank"
            rel="noopener noreferrer"
            className="group min-w-[85vw] md:min-w-[320px] snap-center bg-black/20 backdrop-blur-lg rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-rose-900/50 overflow-hidden flex-shrink-0 relative hover:-translate-y-2 transition-all duration-300 block cursor-pointer"
          >
            <div className="relative h-48 md:h-56 w-full overflow-hidden">
              <img 
                src={folder.image} // Backend API field name
                alt={folder.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              {/* Dark overlay over image for rich feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0906] to-transparent opacity-80"></div>
              
              <div className="absolute top-4 right-4 bg-black/40 border border-white/10 backdrop-blur-md p-2 rounded-full text-amber-400">
                <ExternalLink size={18} />
              </div>
            </div>

            <div className="p-6 text-center relative z-10 bg-gradient-to-b from-[#1a0906] to-transparent">
              <h3 className="text-2xl font-serif font-bold text-amber-100">{folder.name}</h3>
              <p className="text-sm text-amber-500/80 font-medium mt-2 tracking-widest uppercase">Open Folder →</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FunctionGalleries;