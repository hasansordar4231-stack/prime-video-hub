import React from 'react';
import videos from '@/data/videos.json';
import { notFound } from 'next/navigation';
import WatchClient from './WatchClient'; // আমরা এখন একটি নতুন ফাইল বানাবো

// সার্ভার সাইড ফাংশন (এরর আসবে না এখানে)
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

  // ভিডিও ডেটা এবং রিলেটেড ভিডিও ক্লায়েন্ট কম্পোনেন্টে পাঠিয়ে দিচ্ছি
  const relatedVideos = videos.filter(v => v.category_id === video.category_id && v.id !== video.id).slice(0, 6);

  return <WatchClient video={video} relatedVideos={relatedVideos} />;
}
