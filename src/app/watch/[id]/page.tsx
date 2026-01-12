import React from 'react';
import videos from '@/data/videos.json';
import { notFound } from 'next/navigation';
import WatchClient from './WatchClient';

export async function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id.toString(),
  }));
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const video = videos.find(v => v.id.toString() === params.id);
  if (!video) notFound();
  const relatedVideos = videos.filter(v => v.category_id === video.category_id && v.id !== video.id).slice(0, 6);

  return <WatchClient video={video} relatedVideos={relatedVideos} />;
}
