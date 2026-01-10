import { getVideoById, getVideos, getSettings } from '@/lib/data';
import VideoPlayer from './VideoPlayer';

// Generate static pages for all videos at build time
export async function generateStaticParams() {
  const videos = getVideos();
  return videos.map((video) => ({
    id: String(video.id),
  }));
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const video = getVideoById(params.id);
  const settings = getSettings();
  const adsenseCode = settings.adsense_code || '';

  if (!video) return <div className="text-center py-20 text-2xl text-red-500 bg-gray-950 min-h-screen">Video not found</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
            <VideoPlayer video={video} adsenseCode={adsenseCode} />
        </div>
    </div>
  );
}

