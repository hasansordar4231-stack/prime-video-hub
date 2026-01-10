import Link from 'next/link';
import { Play, Video } from 'lucide-react';
import { getCategories, getFeaturedVideos, getVideosByCategory } from '@/lib/data';

export default function Home() {
  const categories = getCategories();
  const featured = getFeaturedVideos();
  
  const categoriesWithVideos = categories.map(cat => {
      const videos = getVideosByCategory(cat.id).slice(0, 10);
      return { ...cat, videos };
  }).filter(cat => cat.videos.length > 0); 

  return (
    <div className="pb-10 bg-gray-950 min-h-screen text-white">
      {featured.length > 0 && (
        <div className="relative w-full h-[50vh] md:h-[70vh] bg-gray-900 overflow-hidden group">
             <div className="absolute inset-0">
                {featured[0].thumbnail_url ? (
                     <img src={featured[0].thumbnail_url} alt={featured[0].title} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-black to-gray-800 opacity-60"></div>
                )}
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
             
             <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
                 <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{featured[0].title}</h1>
                 <p className="text-gray-200 text-lg mb-6 line-clamp-3 drop-shadow-md">{featured[0].description}</p>
                 <Link href={`/watch/${featured[0].id}`} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-lg inline-flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-red-600/30">
                    <Play fill="currentColor" /> Watch Now
                 </Link>
             </div>
        </div>
      )}

      <div className="px-4 md:px-12 space-y-10 mt-10">
        {categoriesWithVideos.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-100 border-l-4 border-red-600 pl-3">{cat.name}</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x">
              {cat.videos.map((video) => (
                <Link key={video.id} href={`/watch/${video.id}`} className="snap-start flex-none w-[200px] md:w-[250px] group relative aspect-video bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105 shadow-md">
                   {video.thumbnail_url ? (
                       <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
                   ) : (
                       <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-500">
                           <Video size={40} />
                       </div>
                   )}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <div className="bg-red-600 p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform">
                           <Play fill="currentColor" size={24} />
                       </div>
                   </div>
                   <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
                       <h3 className="text-sm font-medium truncate text-gray-100">{video.title}</h3>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
          }
               
