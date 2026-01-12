"use client";
import React, { useState } from 'react';
import { Share2, Download, Copy, Facebook, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function WatchClient({ video, relatedVideos }: any) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4 md:p-6">
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
            <div className="flex flex-wrap gap-4 mt-6 border-y border-gray-800 py-4">
              <button onClick={shareOnFacebook} className="flex items-center gap-2 bg-[#1877F2] px-4 py-2 rounded-lg text-sm font-bold">
                <Facebook size={18} /> Facebook
              </button>
              <button onClick={copyToClipboard} className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg text-sm font-bold">
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-red-600 px-6 py-2 rounded-lg text-sm font-bold ml-auto">
                <Download size={18} /> Download
              </a>
            </div>
            <p className="text-gray-400 mt-5 text-sm">{video.description}</p>
          </div>
        </div>

        <div className="lg:w-1/3">
          <h3 className="text-lg font-bold mb-4">Related Videos</h3>
          <div className="flex flex-col gap-4">
            {relatedVideos.map((rv: any) => (
              <Link key={rv.id} href={`/watch/${rv.id}`} className="flex gap-3 bg-[#1a1a1a] p-2 rounded-lg group">
                <div className="w-32 h-20 flex-shrink-0 bg-gray-800 rounded-md overflow-hidden">
                  <img src={rv.thumbnail_url} alt={rv.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xs font-bold uppercase group-hover:text-red-500">{rv.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
                }
              
