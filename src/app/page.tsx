"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Video, FolderOpen } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import videosData from '@/data/videos.json';

export default function Home() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // বর্ণমালা (A-Z) লিস্ট
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // ফিচারড ভিডিও বের করা
  const featured = videosData.filter(v => v.is_featured === 1);
  
  // ভিডিও আছে এমন ক্যাটাগরিগুলো
  const categoriesWithVideos = categoriesData.map(cat => {
      const videos = videosData.filter(v => v.category_id === cat.id);
      // যদি কোনো লেটার সিলেক্ট করা থাকে তবে ফিল্টার হবে
      const filteredVideos = selectedLetter 
        ? videos.filter(v => v.title.toUpperCase().startsWith(selectedLetter))
        : videos.slice(0, 10);
      
      return { ...cat, videos: filteredVideos };
  }).filter(cat => cat.videos.length > 0); 

  return (
    <div className="pb-20 bg-[#0f0f0f] min-h-screen text-white">
      
      {/* ১. বড় ব্যানার সেকশন */}
      {featured.length > 0 && !selectedLetter && (
        <div className="relative w-full h-[50vh] md:h-[70vh] bg-black overflow-hidden group">
             <div className="absolute inset-0">
                {featured[0].thumbnail_url ? (
                     <img src={featured[0].thumbnail_url} alt={featured[0].title} className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-black to-gray-900 opacity-60"></div>
                )}
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent"></div>
             
             <div className="absolute bottom-10 left-0 p-6 md:p-16 max-w-3xl">
                 <span className="bg-red-600 text-xs font-bold px-2 py-1 rounded mb-3 inline-block">FEATURED MOVIE</span>
                 <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl">{featured[0].title}</h1>
                 <Link href={`/watch/${featured[0].id}`} className="bg-white text-black hover:bg-red-600 hover:text-white px-8 py-3 rounded-md font-bold text-lg inline-flex items-center gap-2 transition-all shadow-xl">
                    <Play fill="currentColor" size={20} /> Watch Now
                 </Link>
             </div>
        </div>
      )}

      {/* ২. A-Z অ্যালফাবেট ফিল্টার (প্রিমিয়াম স্টাইল) */}
      <div className="px-4 md:px-12 mt-8 overflow-x-auto">
        <div className="flex gap-2 pb-4 scrollbar-hide">
          <button 
            onClick={() => setSelectedLetter(null)}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${!selectedLetter ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            All
          </button>
          {alphabet.map(letter => (
            <button 
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${selectedLetter === letter ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* ৩. ফোল্ডার এবং ক্যাটাগরি সেকশন */}
      <div className="px-4 md:px-12 space-y-12 mt-5">
        {categoriesWithVideos.map((cat) => (
          <div key={cat.id} className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
              <FolderOpen className="text-red-600" size={24} />
              <h2 className="text-2xl font-bold uppercase tracking-wider">{cat.name}</h2>
              <span className="text-gray-500 text-sm ml-auto">{cat.videos.length} Items</span>
            </div>
            
            {/* প্রিমিয়াম থাম্বনেল গ্রিড */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {cat.videos.map((video) => (
                <Link key={video.id} href={`/watch/${video.id}`} className="group relative block bg-[#1a1a1a] rounded-lg overflow-hidden transition-all hover:ring-2 hover:ring-red-600 shadow-lg">
                   <div className="aspect-[2/3] relative">
                     {video.thumbnail_url ? (
                         <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                             <Video size={40} />
                         </div>
                     )}
                     {/* প্রিমিয়াম ব্যাজ */}
                     <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-[10px] px-2 py-1 rounded font-bold border border-gray-700">
                        HD 4K
                     </div>
                   </div>
                   
                   {/* টাইটেল এবং তথ্য */}
                   <div className="p-3">
                       <h3 className="text-xs font-bold truncate text-gray-200 group-hover:text-red-500 transition-colors uppercase">{video.title}</h3>
                       <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-gray-500">Dual Audio</span>
                          <Play size={12} className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
          }
      
