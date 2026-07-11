import React from 'react';

const OurStory = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-10 animate-fade-up">
        <h2 className="text-3xl md:text-5xl font-bold text-amber-400 font-serif mb-4">Our Story</h2>
        <p className="text-rose-200/80 tracking-widest uppercase text-sm md:text-base">A glimpse into our magical journey</p>
      </div>

      <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.15)] border border-rose-900/50 relative bg-black/40 backdrop-blur-sm aspect-video">
        {/* Yahan apni YouTube video ka embed link dalna, ya fir direct <video> tag use karna */}
        <iframe 
          className="w-full h-full"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE?autoplay=0&controls=1&rel=0" 
          title="Our Story Teaser"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default OurStory;