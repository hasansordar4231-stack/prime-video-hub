"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, PlaySquare, Library, Facebook, X, User } from 'lucide-react'; 
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  // লগইন চেক
  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn');
    if (savedLogin === 'true') setIsLoggedIn(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "25802580") {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      alert("লগইন সফল!");
      setIsMenuOpen(false);
    } else {
      alert("ভুল কোড!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    alert("লগআউট সফল!");
  };

  return (
    <html lang="en">
      <head>
        <title>PRIME CLIP ZONE</title>
        {/* আপনি চাইলে বিজ্ঞাপনের স্ক্রিপ্ট এখান থেকে সরিয়ে সরাসরি page.tsx এ বসাতে পারেন */}
      </head>
      <body className="bg-[#0b0b0b] text-white antialiased overflow-x-hidden">
        
        {/* সাইড মেনু / লগইন সিস্টেম - শুধুমাত্র এখানেই থাকবে */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[150] flex animate-in slide-in-from-left duration-300">
            <div className="fixed inset-0 bg-black/80" onClick={() => setIsMenuOpen(false)}></div>
            <div className="relative w-72 bg-[#121212] h-full p-6 border-r border-gray-800 shadow-2xl">
              <div className="flex justify-between items-center mb-8 text-red-600 font-black italic">
                <span>DASHBOARD</span> <X className="text-white cursor-pointer" size={26} onClick={() => setIsMenuOpen(false)} />
              </div>
              
              <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 shadow-inner">
                {isLoggedIn ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                       <User size={32} className="text-green-500" />
                    </div>
                    <div>
                       <span className="text-xs font-black text-green-500 uppercase tracking-widest block">Member Active</span>
                       <p className="text-[10px] text-gray-500 mt-1">Welcome back to Prime Clip Zone</p>
                    </div>
                    <button onClick={handleLogout} className="w-full text-red-500 text-[11px] font-black border border-red-500/20 px-4 py-2.5 rounded-xl hover:bg-red-500/5 transition-all mt-2">LOGOUT</button>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <p className="text-[10px] text-yellow-500 font-bold text-center leading-relaxed">👉 কোড টেলিগ্রাম পিন কমেন্টে আছে ✅</p>
                    <input 
                      type="password" 
                      placeholder="Enter Code" 
                      className="bg-black p-3.5 border border-gray-700 rounded-xl text-xs text-center outline-none focus:border-red-600 transition-all shadow-inner" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type="submit" className="bg-red-600 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/20 active:scale-95 transition-transform">LOGIN</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        <main className="min-h-screen">
          {children}
        </main>

        {/* ৩. বটম নেভিগেশন - আপনার অরিজিনাল ফেসবুক বাটনসহ */}
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0f14]/95 backdrop-blur-md border-t border-white/5 flex justify-around items-center py-4 px-2 z-[100] shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
           <Link href="/" className="flex flex-col items-center text-red-500 transition-colors">
             <Home size={22} />
             <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">Home</span>
           </Link>

           <Link href="/category/1" className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
             <PlaySquare size={22} />
             <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">Movies</span>
           </Link>
           
           {/* আপনার অরিজিনাল গোল ফেসবুক বাটন */}
           <a href="https://facebook.com/primeclipzone" target="_blank" className="flex flex-col items-center justify-center bg-blue-600 w-12 h-12 rounded-full shadow-lg shadow-blue-600/30 -mt-8 border-4 border-[#0b0b0b] transition-transform active:scale-90 z-50">
             <Facebook size={22} className="text-white" />
           </a>
           
           <Link href="/category/2" className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
             <Library size={22} />
             <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">Series</span>
           </Link>
           
           {/* Anime বাটন */}
           <Link href="/category/anime" className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
              <div className="w-5 h-5 overflow-hidden">
                <img src="https://cdn-icons-png.flaticon.com/512/2314/2314859.png" className="w-full h-full grayscale invert opacity-60" alt="Anime" />
              </div>
              <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">Anime</span>
           </Link>
        </nav>
      </body>
    </html>
  );
              }
                    
