"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlaySquare, Send, Library, Moon, Menu, Search, Youtube, Facebook } from 'lucide-react'; 
import Script from 'next/script';
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // মেনু আইটেম: মাঝখানের বাটনটি এখন ফেসবুকের জন্য
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
        <Script 
          src="https://pl28452578.effectivegatecpm.com/dc/c2/db/dcc2db28e11e445bb59424697084fe18.js" 
          strategy="afterInteractive" 
        />
      </head>
      <body className="bg-[#0f0f0f] text-white antialiased">
        
        {/* --- উপরে হেডার: Telegram এবং YouTube লিঙ্কসহ --- */}
        <header className="bg-[#0f0f0f] p-4 border-b border-gray-800 sticky top-0 z-50">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <Menu className="text-gray-400" size={28} />
            
            <div className="flex flex-col items-center">
               <h1 className="text-2xl font-black tracking-tighter text-white italic">
                 PRIME CLIP <span className="text-red-600 underline decoration-red-600/30">ZONE</span>
               </h1>
               
               <div className="flex gap-4 mt-2">
                 {/* ওপরের টেলিগ্রাম লিঙ্ক */}
                 <a href="https://t.me/primeclipzone" target="_blank" className="flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300">
                    <Send size={14} fill="currentColor" /> Join Telegram
                 </a>
                 {/* ওপরের ইউটিউব লিঙ্ক */}
                 <a href="https://www.youtube.com/@prime-clip-zone" target="_blank" className="flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-500">
                    <Youtube size={14} fill="currentColor" /> Subscribe
                 </a>
               </div>
            </div>

            <Search className="text-gray-400" size={26} />
          </div>
        </header>

        <main className="pb-24 min-h-screen">
          {children}
        </main>

        {/* --- নিচে বটম বার: মাঝখানে Facebook লিঙ্কসহ --- */}
        <nav className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-t border-gray-800 flex justify-around items-end py-3 px-1 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] md:hidden">
          {navItems.map((item) => (
            item.external ? (
              <a key={item.name} href={item.path} target="_blank" className="flex flex-col items-center gap-1 text-gray-400 group">
                <div className="bg-blue-600 p-3 rounded-full text-white -mt-8 shadow-lg border-4 border-[#0f0f0f] transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
              </a>
            ) : (
              <Link key={item.name} href={item.path} className={`flex flex-col items-center gap-1 transition-all ${pathname === item.path ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-gray-200'}`}>
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
