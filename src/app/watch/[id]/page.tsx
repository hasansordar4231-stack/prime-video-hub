import React from 'react';
import videos from '@/data/videos.json';
import { notFound } from 'next/navigation';

// এই ফাংশনটি এরর দূর করতে সাহায্য করবে
export async function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id.toString(),
  }));
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const video = videos.find(v => v.id.toString() === params.id);

  if (!video) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="aspect-video w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <iframe 
            src={video.url.replace("watch?v=", "embed/").replace("shorts/", "embed/")}
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mt-6">{video.title}</h1>
        <p className="text-gray-400 mt-4">{video.description}</p>
      </div>
    </div>
  );
    }
