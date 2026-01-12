"use client";
import React, { useState } from 'react';
import videos from '@/data/videos.json';
import { notFound } from 'next/navigation';
import { Share2, Download, Copy, Facebook, PlayCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// নিচের এই অংশটি অবশ্যই লাগবে বিল্ড এরর কাটানোর জন্য
export async function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id.toString(),
  }));
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false);
  const video = videos.find(v => v.id.toString() === params.id);

  if (!video) {
    notFound();
  }

  const relatedVideos = videos.filter(v => v.category_id === video.category_id && v.id !== video.id).slice(0, 6);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        
        {/* ভিডিও প্লেয়ার */}
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
              <span className="bg-gray-800 px-2 py-1 text-[10px] font-bold rounded uppercase">Premium</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-6 border-y border-gray-800 py-4">
              <button onClick={shareOnFacebook} className="flex items-center gap-2 bg-[#1877F2] hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all">
                <Facebook size={18} /> Facebook
              </button>
              
              <button onClick={copyToClipboard} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-bold transition-all">
                {copied ? "Copied!" : "Copy Link"}
              </button>

              <a href={video.url} target="_blank" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-sm font-bold transition-all ml-auto">
                <Download size={18} /> Download
              </a>
            </div>
            <p className="text-gray-400 mt-5 text-sm leading-relaxed">{video.description}</p>
          </div>
        </div>

        {/* সাইডবার: রিলেটেড ভিডিও */}
        <div className="lg:w-1/3">
          <h3 className="text-lg font-bold mb-4">Related Videos</h3>
          <div className="flex flex-col gap-4">
            {relatedVideos.map((rv) => (
              <Link key={rv.id} href={`/watch/${rv.id}`} className="flex gap-3 bg-[#1a1a1a] p-2 rounded-lg hover:bg-gray-900 border border-transparent hover:border-gray-700 group">
                <div className="w-32 h-20 flex-shrink-0 bg-gray-800 rounded-md overflow-hidden">
                  <img src={rv.thumbnail_url} alt={rv.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-xs font-bold line-clamp-2 uppercase group-hover:text-red-500">{rv.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
                }
              
