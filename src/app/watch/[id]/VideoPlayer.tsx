"use client";

import { useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import AdSense from '@/components/AdSense';

export default function VideoPlayer({ video, adsenseCode }: { video: any, adsenseCode: string }) {

  const handleDownload = () => {
    // Check localStorage access
    const hasAccess = localStorage.getItem('download_access') === 'true';

    if (hasAccess) {
        startDownload();
    } else {
        // এখানে আপনার নতুন ইংলিশ লেখাটি সেট করা হয়েছে
        const code = window.prompt("Need download access, please contact admin, thank you.");
        
        // পাসওয়ার্ড আগেরটাই (25802580) রাখা হয়েছে
        if (code === "25802580") {
            localStorage.setItem('download_access', 'true');
            alert("Access Granted! Download starting...");
            startDownload();
        } else if (code !== null) {
            alert("Wrong Code! Contact Admin.");
        }
    }
  };

  const startDownload = () => {
        const link = document.createElement('a');
        link.href = video.url;
        link.download = video.title; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  };

  return (
    <div>
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-6 relative border border-gray-800">
             <video src={video.url} poster={video.thumbnail_url} controls className="w-full h-full">
                 Your browser does not support the video tag.
             </video>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-gray-800 pb-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">{video.title}</h1>
                <p className="text-gray-400">{video.description}</p>
            </div>
            
            <div className="flex gap-3">
                 <button className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors bg-gray-800 hover:bg-gray-700 text-white">
                    <Share2 size={18} /> Share
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-colors bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20"
                >
                    <Download size={18} /> Download
                </button>
            </div>
        </div>

        <AdSense code={adsenseCode} />
    </div>
  );
}
