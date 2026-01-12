import React from 'react';
import Link from 'next/link';
import { Play, ChevronLeft } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import videosData from '@/data/videos.json';

// বিল্ড এরর কাটানোর জন্য এই ফাংশনটি জরুরি
export async function generateStaticParams() {
  return categoriesData.map((cat) => ({
    id: cat.id.toString(),
  }));
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = parseInt(params.id);
  const category = categoriesData.find(c => c.id === categoryId);
  
  // ভিডিওগুলো ফিল্টার করা হচ্ছে
  const filteredVideos = videosData.filter(v => v.category_id === categoryId);

  if (!category) {
    return <div className="p-10 text-center text-white bg-[#0f0f0f] min-h-screen">Category not found!</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-24">
      {/* হেডার */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-4 sticky top-0 bg-[#0f0f0f]/90 backdrop-blur-md z-10">
        <Link href="/" className="hover:bg-gray-800 p-2 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold uppercase tracking-wider">{category.name}</h1>
      </div>

      {/* ভিডিও গ্রিড */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <Link key={video.id} href={`/watch/${video.id}`} className="group relative bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg border border-transparent hover:border-red-600 transition-all">
               <div className="aspect-[2/3] relative">
                 <img 
                    src={video.thumbnail_url} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                    <Play fill="white" size={30} />
                 </div>
               </div>
               <div className="p-2">
                 <h3 className="text-[11px] font-bold truncate uppercase group-hover:text-red-500">{video.title}</h3>
                 <span className="text-[9px] text-gray-500 uppercase italic">HD Quality</span>
               </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 mb-4 text-sm uppercase">এই ক্যাটাগরিতে এখনো কোনো ভিডিও নেই</p>
            <Link href="/" className="text-red-500 font-bold border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-all">
              অন্যান্য ভিডিও দেখুন
            </Link>
          </div>
        )}
      </div>
    </div>
  );
                 }
            
