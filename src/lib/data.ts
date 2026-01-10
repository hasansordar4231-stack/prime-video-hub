import videos from '@/data/videos.json';
import categories from '@/data/categories.json';
import settings from '@/data/settings.json';

export interface Video {
  id: number;
  title: string;
  description: string;
  category_id: number;
  url: string;
  thumbnail_url: string;
  is_featured: number;
  created_at: string;
}

export function getVideos(): Video[] { return videos; }
export function getCategories() { return categories.sort((a, b) => a.order_index - b.order_index); }
export function getSettings() { return settings; }
export function getVideoById(id: string | number) { return videos.find(v => v.id == id); }
export function getVideosByCategory(categoryId: number) { return videos.filter(v => v.category_id === categoryId); }
export function getFeaturedVideos() { return videos.filter(v => v.is_featured === 1); }

