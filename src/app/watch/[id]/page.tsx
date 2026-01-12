"use client";
import React, { useState } from 'react';
import videos from '@/data/videos.json';
import { notFound } from 'next/navigation';
import { Share2, Download, Copy, Facebook, PlayCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WatchPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false);
  const video = videos.find(v => v.id.toString() === params.id);

  if (!video) {
    notFound();
  }

  // রিলেটেড ভিডিও (একই ক্যাটাগরির অন্য ভিডিও)
  const relatedVideos = videos.filter(v => v.category_id === video.category_id && v.id !== video.id).slice(0, 6);

  // লিঙ্ক কপি করার ফাংশন
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ফেসবুক শেয়ার
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        
        {/* বাম পাশ: ভিডিও প্লেয়ার এবং ডিটেইলস */}
        <div className="lg:w-2/3">
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
            <iframe 
              src={video.url.replace("watch?v=", "embed/").replace("shorts/", "embed/")}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-5 bg-[#1a1a1a] p-5 rounded-xl border border-gray-800">
            <h1 className="text-xl md:text-3xl font-bold">{video.title}</h1>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="bg-red-600 px-2 py-1 text-[10px] font-bold rounded">HD 4K</span>
              <span className="bg-gray-800 px-2 py-1 text-[10px] font-bold rounded uppercase">{video.category_id || 'Drama'}</span>
            </div>

            {/* বাটন সেকশন: ডাউনলোড ও শেয়ার */}
            <div className="flex flex-wrap gap-4 mt-6 border-y border-gray-800 py-4">
              <button 
                onClick={shareOnFacebook}
                className="flex items-center gap-2 bg-[#1877F2] hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all"
              >
                <Facebook size={18} /> Facebook
              </button>
              
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-bold transition-all"
              >
                {copied ? <><Copy size={18} /> Copied!</> : <><Share2 size={18} /> Copy Link</>}
              </button>

              <a 
                href={video.url} 
                download
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-sm font-bold transition-all ml-auto"
              >
                <Download size={18} /> Download
              </a>
            </div>

            <p className="text-gray-400 mt-5 text-sm leading-relaxed">
              {video.description || "Enjoy the full movie/clip in high quality. Join our Telegram for more updates."}
            </p>
          </div>

          {/* এপিসোড সেকশন (যদি থাকে) */}
          <div className="mt-8">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <PlayCircle className="text-red-600" /> All Episodes
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((ep) => (
                <button key={ep} className="bg-[#1a1a1a] border border-gray-800 hover:border-red-600 p-3 rounded-lg text-xs font-bold transition-all text-center">
                  Episode {ep}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ডান পাশ: সাজেস্টেড ভিডিও */}
        <div className="lg:w-1/3">
          <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
            Related Videos <ChevronRight size={20} className="text-red-600" />
          </h3>
          <div className="flex flex-col gap-4">
            {relatedVideos.map((rv) => (
              <Link key={rv.id} href={`/watch/${rv.id}`} className="flex gap-3 bg-[#1a1a1a] p-2 rounded-lg hover:bg-gray-900 transition-all border border-transparent hover:border-gray-700 group">
                <div className="w-32 h-20 flex-shrink-0 bg-gray-800 rounded-md overflow-hidden relative">
                  <img src={rv.thumbnail_url} alt={rv.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                    <PlayCircle size={20} />
                  </div>
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                  <h4 className="text-xs font-bold line-clamp-2 leading-tight uppercase group-hover:text-red-500">{rv.title}</h4>
                  <span className="text-[10px] text-gray-500 mt-1 italic">HD Quality</span>
                </div>
              </Link>
            ))}
          </div>

          {/* অ্যাড ব্যানার এর জন্য জায়গা */}
          <div className="mt-8 p-4 bg-gray-900/50 rounded-xl border border-dashed border-gray-700 text-center">
            <span className="text-gray-600 text-[10px] uppercase font-bold">Advertisement</span>
            <div className="h-64 flex items-center justify-center">
               {/* এখানে আপনার Adsterra ব্যানার কোড বসাতে পারেন */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
        }
      
