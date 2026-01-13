"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, PlaySquare, Send, Library, Moon, Menu, Search, Youtube, Facebook, X, LogIn, User, LogOut } from 'lucide-react'; 
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);

  const banners = [
    { id: 1, img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1000" },
    { id: 2, img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1000" }
  ];

  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn');
    if (savedLogin === 'true') setIsLoggedIn(true);
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

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
        <script async src="https://pl28464189.effectivegatecpm.com/1182f83355f8a97cc17cecf80297bd4e/invoke.js"></script>
      </head>
      <body className="bg-[#0b0b0b] text-white antialiased overflow-x-hidden">
        
        {/* ১. স্লাইডার ও টপ বার (২ নম্বর ছবির প্রিমিয়াম ডিজাইন) */}
        {pathname === '/' && (
          <div className="relative w-full h-[320px] md:h-[450px] overflow-hidden">
            <div className="flex transition-transform duration-1000 h-full" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
              {banners.map((banner) => (
                <img key={banner.id} src={banner.img} className="min-w-full h-full object-cover opacity-50" alt="Banner" />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/40"></div>
            
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
              <div className="flex justify-between items-center">
                <Menu size={28} onClick={() => setIsMenuOpen(true)} className="cursor-pointer" />
                <h1 className="text-xl font-black italic tracking-tighter">PRIME CLIP <span className="text-red-600 underline">ZONE</span></h1>
                <Search size={26} onClick={() => setIsSearchOpen(true)} className="cursor-pointer" />
              </div>

              {/* স্লাইডারের উপর টেলিগ্রাম ও ইউটিউব বাটন */}
              <div className="flex flex-col items-center gap-3 mb-6">
                 <div className="flex gap-4">
                   <a href="https://t.me/primeclipzone" target="_blank" className="bg-[#229ED9] px-6 py-2 rounded-lg text-[11px] font-black flex items-center gap-2 shadow-xl uppercase italic">
                      <Send size={14} fill="white" /> Telegram
                   </a>
                   <a href="http://youtube.com" target="_blank" className="bg-red-600 px-6 py-2 rounded-lg text-[11px] font-black flex items-center gap-2 shadow-xl uppercase italic">
                      <Youtube size={14} fill="white" /> Subscribe
                   </a>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* ২. সাইড মেনু (লগইন সিস্টেম) */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[110] flex animate-in slide-in-from-left duration-300">
            <div className="fixed inset-0 bg-black/80" onClick={() => setIsMenuOpen(false)}></div>
            <div className="relative w-72 bg-[#121212] h-full p-6 border-r border-gray-800">
              <div className="flex justify-between items-center mb-8 text-red-600 font-black italic">
                <span>DASHBOARD</span> <X className="text-white" size={26} onClick={() => setIsMenuOpen(false)} />
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 mb-6">
                {isLoggedIn ? (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <User size={30} className="text-green-500" />
                    <span className="text-xs font-bold text-green-500 uppercase">Member Access Active</span>
                    <button onClick={handleLogout} className="text-red-500 text-[10px] font-black border border-red-500/20 px-4 py-2 rounded-md">LOGOUT</button>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <p className="text-[10px] text-yellow-500 font-bold text-center">👉 কোড টেলিগ্রাম পিন কমেন্টে আছে ✅</p>
                    <input type="password" placeholder="Enter Code" className="bg-black p-3 border border-gray-700 rounded-lg text-xs text-center outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="bg-red-600 py-3 rounded-lg font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">LOGIN</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        <main className="min-h-screen">
          {children}
        </main>

        {/* ৩. বটম নেভিগেশন (ফেসবুক বাটন এখন সোজাসুজি লাইনে) */}
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/95 backdrop-blur-md border-t border-gray-800 flex justify-around items-center py-4 px-2 z-50">
           <Link href="/" className="flex flex-col items-center text-red-500"><Home size={22} /><span className="text-[8px] font-black uppercase mt-1">Home</span></Link>
           <Link href="/category/1" className="flex flex-col items-center text-gray-500"><PlaySquare size={22} /><span className="text-[8px] font-black uppercase mt-1">Movies</span></Link>
           
           {/* ফেসবুক বাটন - যা এখন একদম সমান পজিশনে আছে */}
           <a href="https://facebook.com" target="_blank" className="flex flex-col items-center justify-center bg-blue-600 p-2.5 rounded-full shadow-lg transition-transform active:scale-90">
             <Facebook size={22} className="text-white" />
           </a>
           
           <Link href="/category/2" className="flex flex-col items-center text-gray-500"><Library size={22} /><span className="text-[8px] font-black uppercase mt-1">Series</span></Link>
           <Link href="/category/3" className="flex flex-col items-center text-gray-500"><Moon size={22} /><span className="text-[8px] font-black uppercase mt-1">Islamic</span></Link>
        </nav>
      </body>
    </html>
  );
            }
                
