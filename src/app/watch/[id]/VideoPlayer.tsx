"use client";

import React, { useState, useEffect } from 'react';

interface VideoPlayerProps {
  url: string;
  poster?: string;
}

export default function VideoPlayer({ url, poster }: VideoPlayerProps) {
  const [showAd, setShowAd] = useState(false);

  // ১. ৩-৪ সেকেন্ড পর অ্যাড দেখানোর টাইমার
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true); // ৪ সেকেন্ড পর অ্যাড চালু হবে
    }, 4000); // 4000ms = 4 seconds

    return () => clearTimeout(timer);
  }, []);

  const getYoutubeId = (link: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = link.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderPlayer = () => {
    // ইউটিউব
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = getYoutubeId(url);
      return (
        <iframe 
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&color=white`}
          title="Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }
    
    // গুগল ড্রাইভ
    if (url.includes('drive.google.com')) {
      const embedUrl = url.replace('/view', '/preview');
      return (
        <iframe 
          className="w-full h-full rounded-xl border-none"
          src={embedUrl} 
          allow="autoplay"
          allowFullScreen
        ></iframe>
      );
    }

    // টেলিগ্রাম
    if (url.includes('t.me')) {
      const embedUrl = url.includes('?') ? `${url}&embed=1` : `${url}?embed=1`;
      return (
        <iframe 
          className="w-full h-full rounded-xl bg-black"
          src={embedUrl} 
          frameBorder="0"
        ></iframe>
      );
    }

    // ডিরেক্ট ভিডিও
    return (
      <video 
        controls 
        autoPlay 
        className="w-full h-full rounded-xl bg-black shadow-inner"
        poster={poster}
        controlsList="nodownload"
      >
        <source src={url} type="video/mp4" />
      </video>
    );
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-gray-800 group">
      
      {/* ভিডিও প্লেয়ার */}
      {renderPlayer()}

      {/* --- বিজ্ঞাপন বা অ্যাড সেকশন (Ad Overlay) --- */}
      {showAd && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* নিচের এই div-এর ভেতর ভবিষ্যতে অ্যাড কোড বসাবেন */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 shadow-2xl pointer-events-auto relative max-w-sm mx-4">
                
                {/* ক্লোজ বাটন (অ্যাড কাটার জন্য) */}
                <button 
                  onClick={() => setShowAd(false)}
                  className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg"
                >
                  ✕
                </button>

                {/* এখানে অ্যাড দেখাবে */}
                <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-black text-center rounded">
                    <p className="font-bold text-sm">
                        Advertisement <br/> (Google AdSense Here)
                    </p>
                    {/* ভবিষ্যতে আপনার Google Ads code এখানে পেস্ট করবেন */}
                </div>

            </div>
        </div>
      )}

    </div>
  );
        }
        
