"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Video, FolderOpen, ChevronRight } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import videosData from '@/data/videos.json';

export default function Home() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  // স্লাইডারের জন্য ফিচারড ভিডিও
  const featured = videosData.filter(v => v.is_featured === 1);

  // অটো স্লাইডিং লজিক (৫ সেকেন্ড পর পর)
  useEffect(() => {
    if (featured.length > 1) {
      const interval = setInterval(() => {
        setSlideIndex((prev) => (prev + 1) % featured.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featured.length]);

  const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // ক্যাটাগরি ও ফিল্টারিং লজিক
  const categoriesWithVideos = categoriesData.map(cat => {
      const videos = videosData.filter(v => v.category_id === cat.id);
      
      // অক্ষর অনুযায়ী ফিল্টার করার আসল লজিক
      const filteredVideos = selectedLetter 
        ? (selectedLetter === "#" 
            ? videos.filter(v => /^\d/.test(v.title)) // যদি সংখ্যা দিয়ে শুরু হয়
            : videos.filter(v => v.title.toUpperCase().startsWith(selectedLetter)))
        : videos;
      
      return { ...cat, videos: filteredVideos };
  }).filter(cat => cat.videos.length > 0); 

  return (
    <div className="pb-24 bg-[#0b0b0b] min-h-screen text-white">
      
      {/* ১. স্লাইডার সেকশন */}
      {featured.length > 0 && !selectedLetter && (
        <div className="relative w-full h-[320px] md:h-[500px] overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out h-full" 
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {featured.map((v, i) => (
              <div key={i} className="min-w-full h-full relative">
                <img src={v.thumbnail_url} className="w-full h-full object-cover opacity-50" alt={v.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/30"></div>
                <div className="absolute bottom-12 left-0 p-6 w-full">
                  <h1 className="text-2xl font-black mb-4 uppercase italic">{v.title}</h1>
                  <Link href={`/watch/${v.id}`} className="bg-white text-black px-6 py-2 rounded font-black text-sm inline-flex items-center gap-2 uppercase">
                    <Play fill="currentColor" size={16} /> Play Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ২. A-Z ফিল্টার (আপনার পছন্দের ছবির মতো স্টাইল) */}
      <div className="sticky top-0 z-40 bg-[#0b0b0b]/90 backdrop-blur-md border-b border-white/5 shadow-lg">
        <div className="flex overflow-x-auto gap-1 px-4 py-3 scrollbar-hide items-center justify-between">
          <button 
            onClick={() => setSelectedLetter(null)}
            className={`min-w-[40px] h-8 flex items-center justify-center rounded text-xs font-black uppercase transition-all ${!selectedLetter ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            All
          </button>
          {alphabet.map(letter => (
            <button 
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`min-w-[32px] h-8 flex items-center justify-center rounded text-xs font-black transition-all ${selectedLetter === letter ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* ৩. ভিডিও ক্যাটাগরি ও থাম্বনেইল */}
      <div className="px-4 space-y-10 mt-6">
        {categoriesWithVideos.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <div className="flex items-center justify-between border-l-4 border-red-600 pl-3">
              <h2 className="text-sm font-black uppercase tracking-widest">{cat.name}</h2>
              <span className="text-[10px] font-bold text-gray-500 uppercase">{cat.videos.length} Items</span>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {cat.videos.map((video) => (
                <Link key={video.id} href={`/watch/${video.id}`} className="group flex flex-col gap-2">
                   <div className="aspect-[2/3] relative rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/5">
                     <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute top-1.5 right-1.5 bg-red-600 text-[8px] px-1.5 py-0.5 rounded font-black">HD</div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                   </div>
                   <h3 className="text-[10px] font-black leading-tight line-clamp-2 px-1 text-gray-300 group-hover:text-red-600 transition-colors uppercase italic">
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
                
