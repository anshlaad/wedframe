import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Download } from 'lucide-react';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';

const SwipeGallery = () => {
  // State for fetching images from Django backend
  const [images, setImages] = useState([]);

  // Live API Fetch
  useEffect(() => {
    axios.get('http://wedframe-backend.onrender.com/api/gallery/')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => console.log("Gallery API Error", error));
  }, []);

  // Agar backend se images aane mein time lag raha hai ya koi image nahi hai
  if (images.length === 0) {
    return (
      <div className="w-[95%] max-w-4xl h-64 mx-auto rounded-3xl border-4 border-rose-900/40 bg-black/20 backdrop-blur-sm flex items-center justify-center text-amber-500/50 font-serif">
        Loading Beautiful Memories...
      </div>
    );
  }

  return (
    // Dark Rose-Gold & Glassmorphism Theme
    <div className="w-[95%] max-w-4xl relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-900/40 bg-black/20 backdrop-blur-sm transition-all duration-300">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        autoHeight={true} 
        className="w-full"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="w-full relative flex items-center justify-center bg-black/40">
              
              {/* Image from Django database */}
              <img 
                src={img.image} 
                alt={img.alt_text || 'Wedding Image'} 
                className="w-full max-h-[75vh] object-contain transition-all duration-300"
              />
              
              {/* Dark overlay for bottom shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0906]/80 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Premium Download Button */}
              <a 
                href={img.image} 
                download={`Wedding_Photo_${img.id}.jpg`}
                className="absolute bottom-8 right-6 bg-black/40 border border-white/20 text-amber-400 p-3 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-500 hover:text-[#1a0906] hover:scale-110 transition-all z-10"
                aria-label="Download Image"
              >
                <Download size={24} />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwipeGallery;