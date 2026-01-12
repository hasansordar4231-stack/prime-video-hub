"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlaySquare, Send, Library, Moon } from 'lucide-react'; 
import Script from 'next/script';
import './globals.css'; // <--- এই লাইনটি অবশ্যই থাকতে হবে ডিজাইন পাওয়ার জন্য

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={22} /> },
    { name: 'Movies', path: '/category/1', icon: <PlaySquare size={22} /> }, 
    { name: 'Telegram', path: 'https://t.me/primeclipzone', icon: <Send size={22} />, external: true },
    { name: 'Series', path: '/category/2', icon: <Library size={22} /> },
    { name: 'Islamic', path: '/category/3', icon: <Moon size={22} /> },
  ];

  return (
    <html lang="en">
      <head>
        {/* Adsterra Popunder Ad Code */}
        <Script 
          src="https://pl28452578.effectivegatecpm.com/dc/c2/db/dcc2db28e11e445bb59424697084fe18.js" 
          strategy="afterInteractive" 
        />
      </head>
      <body className="bg-[#0f0f0f] text-white antialiased">
        <main className="pb-24 min-h-screen">
          {children}
        </main>

        {/* ছবির মতো বটম ন্যাভিগেশন বার */}
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
