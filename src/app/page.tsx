"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, FolderOpen, Search, Menu, Send, Youtube, ChevronRight } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import videosData from '@/data/videos.json';

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // স্লাইডারের জন্য আপনার সব ভিডিও (সব মুভি ও ড্রামা অটো দৌড়াবে)
  const allSliderVideos = videosData;

  useEffect(() => {
    if (allSliderVideos.length > 0) {
      const interval = setInterval(() => {
        setSlideIndex((prev) => (prev + 1) % allSliderVideos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [allSliderVideos.length]);

  const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // আপনার দেওয়া ছবির মতো সিরিয়াল এবং ক্যাটাগরি ফিল্টারিং লজিক
  const categoriesWithVideos = categoriesData.map(cat => {
      const videos = videosData.filter(v => String(v.category_id) === String(cat.id));
      const filteredVideos = selectedLetter 
        ? videos.filter(v => v.title.toUpperCase().startsWith(selectedLetter))
        : videos;
      
      return { ...cat, videos: filteredVideos };
  }).filter(cat => cat.videos.length > 0); 

  return (
    <div className="pb-24 bg-[#0b0b0b] min-h-screen text-white">
      
      {/* ১. প্রিমিয়াম টপ সেকশন (Play Drama Flix স্টাইল) */}
      <header className="p-4 bg-black border-b border-white/5 sticky top-0 z-[110]">
        <div className="flex justify-between items-center mb-4">
          <Menu size={24} className="cursor-pointer active:scale-90" />
          <h1 className="text-xl font-bold flex items-center gap-1 italic tracking-tighter">
             <span className="text-white">Play</span>
             <span className="text-pink-600 font-black">Drama Flix</span>
          </h1>
          <Search size={24} className="cursor-pointer active:scale-90" />
        </div>
        
        {/* সোশ্যাল বাটন পজিশন */}
        <div className="flex justify-center gap-8 border-t border-white/5 pt-3">
          <a href="https://t.me/primeclipzone" className="flex items-center gap-1.5 text-[#229ED9] text-[10px] font-black uppercase">
            <Send size={14} fill="#229ED9" className="text-white" /> Join Telegram
          </a>
          <a href="#" className="flex items-center gap-1.5 text-red-600 text-[10px] font-black uppercase">
            <Youtube size={14} fill="red" className="text-white" /> Subscribe
          </a>
        </div>
      </header>

      {/* ২. A-Z স্টিকি ফিল্টার (ছবির মতো ঝকঝকে ডিজাইন) */}
      <div className="sticky top-[105px] z-[100] bg-[#0b0b0b]/95 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="flex overflow-x-auto gap-1 px-4 py-3 scrollbar-hide items-center">
          <button 
            onClick={() => setSelectedLetter(null)} 
            className={`min-w-[42px] h-8 flex items-center justify-center rounded text-[11px] font-black ${!selectedLetter ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            ALL
          </button>
          {alphabet.map(l => (
            <button 
              key={l} 
              onClick={() => setSelectedLetter(l)} 
              className={`min-w-[32px] h-8 flex items-center justify-center rounded text-[11px] font-black transition-all ${selectedLetter === l ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* ৩. অটো দৌড়ানো স্লাইডার (বাম দিকে ৫ সেকেন্ড পরপর দৌড়াবে) */}
      {!selectedLetter && allSliderVideos.length > 0 && (
        <div className="relative w-full h-[250px] md:h-[450px] overflow-hidden mt-3 px-4">
          <div 
            className="flex transition-transform duration-[1200ms] ease-in-out h-full rounded-xl overflow-hidden shadow-2xl" 
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {allSliderVideos.map((v, i) => (
              <div key={i} className="min-w-full h-full relative group">
                <img 
                  src={v.thumbnail_url || v.thumbnail} 
                  className="w-full h-full object-cover opacity-50 transition-transform duration-[6000ms] scale-105 group-hover:scale-100" 
                  alt={v.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-5 z-20">
                  <h2 className="text-lg font-black uppercase italic text-white drop-shadow-lg leading-tight">{v.title}</h2>
                  <Link href={`/watch/${v.id}`} className="mt-3 bg-red-600 text-white px-5 py-2 rounded-full font-black text-[10px] inline-flex items-center gap-2 uppercase shadow-xl active:scale-95 transition-all">
                    <Play fill="white" size={14} /> Play Episode
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* স্লাইডার ডটস */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {allSliderVideos.slice(0, 10).map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${slideIndex === i ? 'w-6 bg-white' : 'w-1.5 bg-gray-600'}`}></div>
            ))}
          </div>
        </div>
      )}

      {/* ৪. ড্রামা সিরিয়াল গ্রিড (আপনার চাওয়া ১-৩০ এপিসোড সিস্টেম) */}
      <div className="px-4 mt-8 space-y-12 pb-10">
        {categoriesWithVideos.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <div className="flex items-center justify-between border-l-4 border-red-600 pl-3">
              <h2 className="text-[14px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                <FolderOpen size={18} className="text-red-600" /> {cat.name}
              </h2>
              <Link href={`/category/${cat.id}`} className="text-[10px] font-bold text-gray-500 flex items-center gap-1 hover:text-white transition-colors uppercase">
                View All <ChevronRight size={12} />
              </Link>
            </div>
            
            {/* ছবির মতো ৩ কলামের প্রিমিয়াম থাম্বনেইল গ্রিড */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
              {cat.videos.map((video) => (
                <Link key={video.id} href={`/watch/${video.id}`} className="group flex flex-col gap-2 transition-all">
                   <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-lg group-hover:ring-2 group-hover:ring-red-600">
                     <img 
                       src={video.thumbnail_url || video.thumbnail} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                       alt={video.title} 
                     />
                     {/* এপিসোড নাম্বার (EP 1, EP 2... ৩০ পর্যন্ত দেখাবে) */}
                     <div className="absolute top-2 right-2 bg-blue-600 text-[8px] px-2 py-0.5 rounded font-black shadow-lg">
                        EP {video.id} 
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                   </div>
                   <h3 className="text-[10px] font-bold leading-tight line-clamp-2 px-1 text-gray-300 group-hover:text-red-600 transition-colors uppercase italic tracking-tighter">
                      {video.title}
                   </h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
                        }
  
