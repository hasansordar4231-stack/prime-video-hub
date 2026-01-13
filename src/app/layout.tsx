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

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    alert("লগআউট সফল হয়েছে।");
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={22} /> },
    { name: 'Movies', path: '/category/1', icon: <PlaySquare size={22} /> }, 
    { name: 'FB', path: 'https://www.facebook.com/profile.php?id=61574419225273', icon: <Facebook size={22} />, external: true },
    { name: 'Series', path: '/category/2', icon: <Library size={22} /> },
    { name: 'Islamic', path: '/category/3', icon: <Moon size={22} /> },
  ];

  return (
    <html lang="en">
      <head>
        <title>PRIME CLIP ZONE</title>
        <script async="async" data-cfasync="false" src="https://pl28464189.effectivegatecpm.com/1182f83355f8a97cc17cecf80297bd4e/invoke.js"></script>
        <script src="https://pl28464315.effectivegatecpm.com/d9/06/de/d906de20c2fa65fcd2b8ae1747a4309b.js"></script>
      </head>
      <body className="bg-[#0b0b0b] text-white antialiased overflow-x-hidden font-sans">
        
        <header className="bg-[#0f0f0f] p-4 border-b border-gray-800 sticky top-0 z-50 shadow-lg">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            {!isSearchOpen ? (
              <>
                <Menu className="text-gray-300 cursor-pointer" size={28} onClick={() => setIsMenuOpen(true)} />
                <div className="flex flex-col items-center flex-1">
                   <h1 className="text-2xl font-black italic tracking-tighter">PRIME CLIP <span className="text-red-600 underline">ZONE</span></h1>
                   <div className="flex gap-2 mt-2.5">
                     <a href="https://t.me/primeclipzone" target="_blank" className="flex items-center gap-1.5 bg-[#229ED9] px-3 py-1.5 rounded text-[10px] font-black shadow-md uppercase">
                        <Send size={12} fill="white" /> Join Telegram
                     </a>
                     <a href="https://www.youtube.com/@prime-clip-zone" target="_blank" className="flex items-center gap-1.5 bg-red-600 px-3 py-1.5 rounded text-[10px] font-black shadow-md uppercase">
                        <Youtube size={12} fill="white" /> Subscribe
                     </a>
                   </div>
                </div>
                <Search className="text-gray-300 cursor-pointer" size={26} onClick={() => setIsSearchOpen(true)} />
              </>
            ) : (
              <form onSubmit={(e) => {e.preventDefault(); router.push(`/search?q=${searchQuery}`); setIsSearchOpen(false);}} className="flex items-center w-full gap-2 px-2">
                <input autoFocus type="text" placeholder="Search..." className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <X className="text-gray-400 cursor-pointer" size={26} onClick={() => setIsSearchOpen(false)} />
              </form>
            )}
          </div>
        </header>

        {pathname === '/' && (
          <div className="mt-3 px-2">
             <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="min-w-[130px] aspect-[9/14] bg-gray-900 rounded-lg border border-gray-800 relative overflow-hidden shadow-lg">
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                     <p className="absolute bottom-2 left-2 text-[9px] font-bold text-gray-500 uppercase italic">Drama {i}</p>
                  </div>
                ))}
             </div>
             <div className="flex justify-between text-[10px] font-black text-gray-700 border-y border-gray-900 py-2 mt-2 px-2">
                {['#','A','B','C','D','E','F','G','H','I','J','K','L','M','N'].map(l => <span key={l}>{l}</span>)}
             </div>
          </div>
        )}

        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] flex animate-in slide-in-from-left duration-300">
            <div className="fixed inset-0 bg-black/80" onClick={() => setIsMenuOpen(false)}></div>
            <div className="relative w-72 bg-[#121212] h-full p-6 shadow-2xl border-r border-gray-800">
              <div className="flex justify-between items-center mb-8 text-red-600 font-black italic text-lg">
                <span>DASHBOARD</span> <X className="text-white cursor-pointer" size={24} onClick={() => setIsMenuOpen(false)} />
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 mb-6">
                {isLoggedIn ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-green-500 font-bold flex items-center gap-2"><User size={20} /> Member Active</div>
                    <button onClick={handleLogout} className="text-[11px] text-red-500 font-black uppercase border border-red-500/20 px-4 py-2 rounded-md hover:bg-red-500/10 transition flex items-center gap-1.5">
                      <LogOut size={14} /> Logout Account
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <p className="text-[11px] text-yellow-500 font-bold text-center italic">👉 লগইন কোড টেলিগ্রাম চ্যানেলের পিন কমেন্টে ✅👈</p>
                    <input type="password" placeholder="Enter Code" className="bg-black p-3 border border-gray-700 rounded-lg text-sm text-center focus:border-red-600 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="bg-red-600 p-3 rounded-lg font-black text-sm flex items-center justify-center gap-2 uppercase"><LogIn size={18} /> Login</button>
                  </form>
                )}
              </div>
              <nav className="flex flex-col gap-6 font-black text-gray-500 mt-4 uppercase text-sm tracking-wider">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition">Home</Link>
                <Link href="/category/1" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition">Movies</Link>
                <Link href="/category/2" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition">Drama Series</Link>
              </nav>
            </div>
          </div>
        )}

        <main className="pb-24 min-h-screen">
          {children}
          <div className="flex justify-center my-6">
            <iframe src="https://www.highperformanceformat.com/88e64fc2b349b73b6919070f767e696b/invoke.js" height="50" width="320" className="border-none overflow-hidden rounded shadow-lg bg-gray-900"></iframe>
          </div>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/95 backdrop-blur-sm border-t border-gray-800 flex justify-around py-3 px-2 z-50">
           {navItems.map((item) => (
            <Link key={item.name} href={item.path} className={`flex flex-col items-center gap-1 transition-all ${pathname === item.path ? 'text-red-500' : 'text-gray-500'}`}>
              {item.icon} <span className="text-[9px] font-black uppercase">{item.name}</span>
            </Link>
           ))}
        </nav>
      </body>
    </html>
  );
                    }
            
