"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlaySquare, Send, Library, Ghost } from 'lucide-react'; // আইকন লাইব্রেরি

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // মেনু আইটেম সেটআপ
  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Movies', path: '/category/movies', icon: <PlaySquare size={20} /> },
    { name: 'Telegram', path: 'https://t.me/primeclipzone', icon: <Send size={20} />, external: true },
    { name: 'Series', path: '/category/series', icon: <Library size={20} /> },
    { name: 'Anime', path: '/category/anime', icon: <Ghost size={20} /> },
  ];

  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-white">
        <main className="pb-20">
          {children}
        </main>

        {/* ছবির মতো বটম ন্যাভিগেশন বার */}
        <nav className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-gray-800 flex justify-around items-center py-2 px-1 z-50 shadow-2xl md:hidden">
          {navItems.map((item) => (
            item.external ? (
              <a key={item.name} href={item.path} target="_blank" className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400">
                <div className={item.name === 'Telegram' ? 'bg-blue-500 p-2 rounded-full text-white -mt-6 shadow-lg border-4 border-[#0f0f0f]' : ''}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-medium">{item.name}</span>
              </a>
            ) : (
              <Link key={item.name} href={item.path} className={`flex flex-col items-center gap-1 transition-colors ${pathname === item.path ? 'text-red-500' : 'text-gray-400'}`}>
                {item.icon}
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            )
          ))}
        </nav>
      </body>
    </html>
  );
}
