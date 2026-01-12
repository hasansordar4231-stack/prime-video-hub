import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Link from 'next/link';
import { FaTelegramPlane, FaYoutube } from 'react-icons/fa'; // আইকনের জন্য

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prime Clip Zone | Premium Streaming",
  description: "Watch HD Movie Clips and Series",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Adsterra Popunder */}
        <Script 
          src="https://pl28452578.effectivegatecpm.com/dc/c2/db/dcc2db28e11e445bb59424697084fe18.js" 
          strategy="afterInteractive" 
        />
      </head>
      <body className={`${inter.className} bg-[#0f0f0f] text-white`}>
        {/* প্রিমিয়াম হেডার (Header) */}
        <header className="sticky top-0 z-50 bg-[#121212] border-b border-gray-800 p-4 flex justify-between items-center shadow-xl">
          <div className="text-xl font-bold text-red-600">PRIME CLIP ZONE</div>
          
          <div className="flex gap-4">
            {/* ইউটিউব চ্যানেল লিঙ্ক */}
            <a href="https://www.youtube.com/@reallifestory-r2p" target="_blank" className="bg-red-600 p-2 rounded-full hover:scale-110 transition-transform">
              <span className="text-sm font-medium">YouTube</span>
            </a>
            
            {/* টেলিগ্রাম চ্যানেল লিঙ্ক */}
            <a href="https://t.me/primeclipzone" target="_blank" className="bg-blue-500 p-2 rounded-full hover:scale-110 transition-transform">
              <span className="text-sm font-medium">Telegram</span>
            </a>
          </div>
        </header>

        <main className="pb-20"> {/* নিচের মেনুর জন্য স্পেস রাখা হয়েছে */}
          {children}
        </main>

        {/* নিচের প্রিমিয়াম মেনু (Bottom Navigation) */}
        <nav className="fixed bottom-0 w-full bg-[#121212] border-t border-gray-800 flex justify-around p-3 z-50">
          <div className="text-center">
            <span className="block text-xs text-red-500">Home</span>
          </div>
          <div className="text-center">
            <span className="block text-xs text-gray-400">Movies</span>
          </div>
          <div className="text-center">
            <span className="block text-xs text-gray-400">Series</span>
          </div>
          <div className="text-center">
            <span className="block text-xs text-gray-400">Categories</span>
          </div>
        </nav>

        {/* লাইভ চ্যাট উইজেট */}
        <div className="fixed bottom-16 right-5 z-50">
           {/* আপনার চ্যাট উইজেট কম্পোনেন্ট এখানে থাকবে */}
        </div>
      </body>
    </html>
  );
}
