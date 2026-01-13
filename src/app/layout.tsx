"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, PlaySquare, Send, Library, Moon, Menu, Search, Youtube, Facebook, X, LogIn, User, LogOut } from 'lucide-react'; 
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
      alert("লগইন সফল! এখন থেকে আজীবন ডাউনলোড করতে পারবেন।");
      setIsMenuOpen(false);
    } else {
      alert("ভুল কোড! সঠিক কোড টেলিগ্রাম পিন কমেন্টে দেখুন।");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    alert("লগআউট সফল হয়েছে।");
  };

  return (
    <html lang="en">
      <head>
        <title>PRIME CLIP ZONE</title>
        <script async src="https://pl28464189.effectivegatecpm.com/1182f83355f8a97cc17cecf80297bd4e/invoke.js"></script>
        <script src="https://pl28464315.effectivegatecpm.com/d9/06/de/d906de20c2fa65fcd2b8ae1747a4309b.js"></script>
      </head>
      <body className="bg-[#0b0b0b] text-white antialiased overflow-x-hidden">
        
        {/* উপরের স্লাইডার ও ডিজাইন */}
        {pathname === '/' && (
          <div className="relative w-full h-[380px] overflow-hidden">
            <div className="flex transition-transform duration-1000 ease-in-out h-full" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
              {banners.map((banner) => (
                <img key={banner.id} src={banner.img} className="min-w-full h-full object-cover opacity-60" alt="Slider" />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/30"></div>
            
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
              <div className="flex justify-between items-center">
                <Menu size={30} onClick={() => setIsMenuOpen(true)} className="cursor-pointer" />
                <h1 className="text-2xl font-black italic tracking-tighter">PRIME CLIP <span className="text-red-600 underline">ZONE</span></h1>
                <Search size={28} onClick={() => setIsSearchOpen(true)} className="cursor-pointer" />
              </div>

              <div className="flex flex-col items-center gap-4 mb-4">
                 <div className="flex gap-3">
                   <a href="https://t.me/primeclipzone" target="_blank" className="bg-[#229ED9] px-5 py-2 rounded-full text-[12px] font-black flex items-center gap-2 shadow-lg">
                      <Send size={14} fill="white" /> Telegram
                   </a>
                   <a href="https://www.youtube.com/@prime-clip-zone" target="_blank" className="bg-red-600 px-5 py-2 rounded-full text-[12px] font-black flex items-center gap-2 shadow-lg">
                      <Youtube size={14} fill="white" /> Subscribe
                   </a>
                 </div>
                 <div className="flex justify-between w-full max-w-md text-[11px] font-bold text-gray-500 border-t border-white/10 pt-3 px-2 overflow-x-auto no-scrollbar whitespace-nowrap">
                    {['#','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'].map(l => <span key={l} className="px-1.5">{l}</span>)}
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* সাইড মেনু যেখানে আপনার অরিজিনাল লগইন সিস্টেম আছে */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[110] flex animate-in slide-in-from-left duration-300">
            <div className="fixed inset-0 bg-black/80" onClick={() => setIsMenuOpen(false)}></div>
            <div className="relative w-72 bg-[#121212] h-full p-6 border-r border-gray-800">
              <div className="flex justify-between items-center mb-8 text-red-600 font-black italic">
                <span>DASHBOARD</span> <X className="text-white" size={26} onClick={() => setIsMenuOpen(false)} />
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 mb-6">
                {isLoggedIn ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-green-500 font-bold flex items-center gap-2 text-sm"><User size={24} /> <span>Member Access Active</span></div>
                    <button onClick={handleLogout} className="flex items-center gap-1.5 text-red-500 text-[11px] font-black border border-red-500/20 px-4 py-2 rounded-lg">
                      <LogOut size={16} /> LOGOUT
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    {/* আপনার অরিজিনাল মেসেজ */}
                    <p className="text-[11px] text-yellow-500 font-bold text-center leading-relaxed">
                      👉 লগইন কোড টেলিগ্রাম চ্যানেলের পিন কমেন্টে ✅👈
                    </p>
                    <input type="password" placeholder="Enter Code" className="bg-black p-3 border border-gray-700 rounded-xl text-sm text-center focus:border-red-600 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="bg-red-600 py-3 rounded-xl font-black text-sm uppercase tracking-widest"><LogIn size={18} /> Login</button>
                  </form>
                )}
              </div>

              <nav className="flex flex-col gap-6 font-bold text-gray-500 uppercase text-xs tracking-widest">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>Home Page</Link>
                <Link href="/category/1" onClick={() => setIsMenuOpen(false)}>Movies List</Link>
                <Link href="/category/2" onClick={() => setIsMenuOpen(false)}>Series / Drama</Link>
              </nav>
            </div>
          </div>
        )}

        <main className="min-h-screen pb-32">
          {children}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/95 backdrop-blur-md border-t border-gray-800 flex justify-around py-4 px-2 z-50">
           <Link href="/" className="flex flex-col items-center gap-1 text-red-500"><Home size={24} /><span className="text-[9px] font-black uppercase">Home</span></Link>
           <Link href="/category/1" className="flex flex-col items-center gap-1 text-gray-500"><PlaySquare size={24} /><span className="text-[9px] font-black uppercase">Movies</span></Link>
           <a href="https://facebook.com" target="_blank" className="flex flex-col items-center gap-1 text-blue-500 -mt-10 bg-[#0b0b0b] p-3 rounded-full border-4 border-[#0f0f0f] shadow-2xl transition-transform hover:scale-110"><Facebook size={26} /></a>
           <Link href="/category/2" className="flex flex-col items-center gap-1 text-gray-500"><Library size={24} /><span className="text-[9px] font-black uppercase">Series</span></Link>
           <Link href="/category/3" className="flex flex-col items-center gap-1 text-gray-500"><Moon size={24} /><span className="text-[9px] font-black uppercase">Islamic</span></Link>
        </nav>
      </body>
    </html>
  );
    }
                
