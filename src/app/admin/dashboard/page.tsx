"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, LogOut, Code } from 'lucide-react';
import settings from '@/data/settings.json';

export default function AdminDashboard() {
  const router = useRouter();
  const [videoJson, setVideoJson] = useState('');
  
  // Inputs
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [thumb, setThumb] = useState('');
  const [catId, setCatId] = useState('1');
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    const code = localStorage.getItem('admin_code');
    if (code !== settings.admin_code) {
        const input = prompt("Enter Admin Code:");
        if (input === settings.admin_code) {
            localStorage.setItem('admin_code', input);
        } else {
            router.push('/');
        }
    }
  }, [router]);

  const generateJson = () => {
      const newVideo = {
          id: Date.now(), 
          title,
          description: desc,
          category_id: parseInt(catId),
          url,
          thumbnail_url: thumb,
          is_featured: isFeatured ? 1 : 0,
          created_at: new Date().toISOString()
      };
      setVideoJson(JSON.stringify(newVideo, null, 2) + ","); 
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(videoJson);
      alert('Code Copied! Now go to GitHub -> src/data/videos.json and paste it inside the array.');
  };

  const logout = () => {
      localStorage.removeItem('admin_code');
      router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
                <h1 className="text-3xl font-bold text-blue-500 flex items-center gap-2">
                    <Code /> Static Admin
                </h1>
                <button onClick={logout} className="text-red-500 hover:text-red-400 flex items-center gap-2 font-medium"><LogOut size={20} /> Logout</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-gray-200">Add New Video</h2>
                    
                    <div>
                        <label className="text-xs text-gray-500 ml-1">Title</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Video Title" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    
                    <div>
                        <label className="text-xs text-gray-500 ml-1">Description</label>
                        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Short description..." className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-24 focus:outline-none focus:border-blue-500" />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 ml-1">Video URL (Direct Link)</label>
                        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/video.mp4" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500" />
                    </div>

                    <div>
                         <label className="text-xs text-gray-500 ml-1">Thumbnail URL</label>
                        <input value={thumb} onChange={e => setThumb(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 ml-1">Category ID</label>
                            <input type="number" value={catId} onChange={e => setCatId(e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex items-center pt-6">
                            <label className="flex items-center cursor-pointer select-none">
                                <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="mr-3 w-5 h-5 accent-blue-600" /> 
                                <span className="font-medium">Featured?</span>
                            </label>
                        </div>
                    </div>
                    <button onClick={generateJson} className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95">Generate JSON Code</button>
                </div>

                <div className="bg-black p-6 rounded-xl border border-gray-800 shadow-xl flex flex-col">
                    <h2 className="text-xl font-bold mb-4 text-green-400">Generated Code</h2>
                    <p className="text-gray-500 text-sm mb-2">Copy this and paste it into `src/data/videos.json` in GitHub.</p>
                    <div className="relative flex-1 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                        <pre className="p-4 text-green-400 overflow-auto h-full text-xs font-mono absolute inset-0">{videoJson || '// Fill the form to generate code...'}</pre>
                    </div>
                    {videoJson && <button onClick={copyToClipboard} className="mt-4 w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg text-white flex items-center justify-center gap-2 font-medium border border-gray-700 transition-colors"><Copy size={18} /> Copy Code</button>}
                </div>
            </div>
        </div>
    </div>
  );
        }
        
