"use client";
import React from 'react';
import Link from 'next/link';
import { Play, Video, ChevronLeft } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import videosData from '@/data/videos.json';

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = parseInt(params.id);
  const category = categoriesData.find(c => c.id === categoryId);
  const filteredVideos = videosData.filter(v => v.category_id === categoryId);

  if (!category) return <div className="p-10 text-center">Category not found!</div>;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-20">
      <div className="p-4 border-b border-gray-800 flex items-center gap-4 sticky top-0 bg-[#0f0f0f] z-10">
        <Link href="/"><ChevronLeft size={24} /></Link>
        <h1 className="text-xl font-bold uppercase">{category.name}</h1>
      </div>

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <Link key={video.id} href={`/watch/${video.id}`} className="group bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg border border-transparent hover:border-red-600 transition-all">
               <div className="aspect-[2/3] relative">
                 <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                    <Play fill="white" size={30} />
                 </div>
               </div>
               <div className="p-2">
                 <h3 className="text-[11px] font-bold truncate uppercase">{video.title}</h3>
               </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-20">এই ক্যাটাগরিতে এখনো কোনো ভিডিও আপলোড করা হয়নি।</p>
        )}
      </div>
    </div>
  );
                   }

