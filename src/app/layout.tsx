"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, PlaySquare, Send, Library, Moon, Menu, Search, Youtube, Facebook, X, LogIn, User, Lock } from 'lucide-react'; 
import Script from 'next/script';
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const correctPass = "25802580"; 

  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn');
    if (savedLogin === 'true') setIsLoggedIn(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPass) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      alert("লগইন সফল! এখন থেকে আজীবন ডাউনলোড করতে পারবেন।");
      setIsMenuOpen(false);
    } else {
      alert("ভুল কোড! সঠিক কোড টেলিগ্রাম পিন কমেন্টে দেখুন।");
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={22} /> },
    { name: 'Movies', path: '/category/1', icon: <PlaySquare size={22} /> }, 
    { name: 'Facebook', path: 'https://www.facebook.com/profile.php?id=61574419225273&mibextid=ZbWKwL', icon: <Facebook size={22} />, external: true },
    { name: 'Series', path: '/category/2', icon: <Library size={22} /> },
    { name: 'Islamic', path: '/category/3', icon: <Moon size={22} /> },
  ];

  return (
    <html lang="en">
      <head>
        {/* Adsterra Native Banner Script */}
        <script async="async" data-cfasync="false" src="https://pl28464189.effectivegatecpm.com/1182f83355f8a97cc17cecf80297bd4e/invoke.js"></script>
        {/* Social Bar Script */}
        <script src="https://pl28464315.effectivegatecpm.com/d9/06/de/d906de20c2fa65fcd2b8ae1747a4309b.js"></script>
      </head>
      <body className="bg-[#0f0f0f] text-white antialiased overflow-x-hidden font-sans">
        
        <header className="bg-[#0f0f0f] p-4 border-b border-gray-800 sticky top-0 z-50">
          <div className="flex justify-between items-center max-w-7xl mx-auto gap-2">
            {!isSearchOpen ? (
              <>
                <Menu className="text-gray-400 cursor-pointer" size={28} onClick={() => setIsMenuOpen(true)} />
                <div className="flex flex-col items-center flex-1">
                   <h1 className="text-2xl font-black tracking-tighter text-white italic">
                     PRIME CLIP <span className="text-red-600 underline decoration-red-600/30">ZONE</span>
                   </h1>
                   <div className="flex gap-4 mt-2">
                     <a href="https://t.me/primeclipzone" target="_blank" className="flex items-center gap-1 text-[11px] font-bold text-blue-400">
                        <Send size={14} fill="currentColor" /> Join Telegram
                     </a>
                     <a href="https://www.youtube.com/@prime-clip-zone" target="_blank" className="flex items-center gap-1 text-[11px] font-bold text-red-600">
                        <Youtube size={14} fill="currentColor" /> Subscribe
                     </a>
                   </div>
                </div>
                <Search className="text-gray-400 cursor-pointer" size={26} onClick={() => setIsSearchOpen(true)} />
              </>
            ) : (
              <form onSubmit={(e) => {e.preventDefault(); router.push(`/search?q=${searchQuery}`); setIsSearchOpen(false);}} className="flex items-center w-full gap-2">
                <input autoFocus type="text" placeholder="Search..." className="w-full bg-gray-900 border border-gray-700 rounded-full py-2 px-4 text-white outline-none focus:border-red-600" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <X className="text-gray-400 cursor-pointer" size={26} onClick={() => setIsSearchOpen(false)} />
              </form>
            )}
          </div>
        </header>

        {/* --- Sidebar Menu --- */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] flex animate-in slide-in-from-left duration-300">
            <div className="fixed inset-0 bg-black/70" onClick={() => setIsMenuOpen(false)}></div>
            <div className="relative w-72 bg-[#121212] h-full p-6 shadow-2xl border-r border-gray-800">
              <div className="flex justify-between items-center mb-8 text-red-600 font-black italic">
                <span>DASHBOARD</span> <X className="text-white cursor-pointer" size={24} onClick={() => setIsMenuOpen(false)} />
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 mb-6 shadow-inner">
                {isLoggedIn ? (
                  <div className="flex flex-col items-center gap-2 text-green-500 font-bold">
                    <User size={30} /> <span>Member Access Active</span>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <p className="text-[11px] text-yellow-500 font-bold leading-relaxed text-center">
                      👉 লগইন কোড টেলিগ্রাম চ্যানেলের পিন কমেন্টে ✅👈
                    </p>
                    <input type="password" placeholder="Enter Code" className="bg-black p-3 border border-gray-700 rounded-lg text-sm text-center focus:border-red-600 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="bg-red-600 p-3 rounded-lg font-black text-sm flex items-center justify-center gap-2 tracking-widest"><LogIn size={18} /> LOGIN</button>
                  </form>
                )}
              </div>

              <nav className="flex flex-col gap-5 font-bold text-gray-400 mt-4">
                <Link href="/" className="hover:text-white transition" onClick={() => setIsMenuOpen(false)}>HOME</Link>
                <Link href="/category/1" className="hover:text-white transition" onClick={() => setIsMenuOpen(false)}>ALL MOVIES</Link>
                <a href="https://t.me/primeclipzone" target="_blank" className="text-blue-400">SUPPORT HELP</a>
              </nav>
            </div>
          </div>
        )}

        <main className="pb-32 min-h-screen">
          {/* Native Banner */}
          <div className="flex justify-center my-4">
            <div id="container-1182f83355f8a97cc17cecf80297bd4e"></div>
          </div>

          {children}

          {/* Banner 320x50 */}
          <div className="flex flex-col items-center gap-2 my-8">
            <iframe src="https://www.highperformanceformat.com/88e64fc2b349b73b6919070f767e696b/invoke.js" height="50" width="320" className="border-none overflow-hidden rounded shadow-lg"></iframe>
          </div>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-800 flex justify-around items-end py-3 px-1 z-50 md:hidden">
          {navItems.map((item) => (
            item.external ? (
              <a key={item.name} href={item.path} target="_blank" className="flex flex-col items-center gap-1 group">
                <div className="bg-blue-600 p-3 rounded-full text-white -mt-9 shadow-xl border-4 border-[#0f0f0f] transition-transform">{item.icon}</div>
                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
              </a>
            ) : (
              <Link key={item.name} href={item.path} className={`flex flex-col items-center gap-1 transition-all ${pathname === item.path ? 'text-red-500 scale-110' : 'text-gray-400'}`}>
                {item.icon}
                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
              </Link>
            )
          ))}
        </nav>
      </body>
    </html>
  );
          }
            
