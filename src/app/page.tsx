"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Search,
  Menu,
  Send,
  Youtube,
  ChevronRight,
  X,
  LogIn,
  LogOut,
} from "lucide-react";

import categoriesData from "@/data/categories.json";
import videosData from "@/data/videos.json";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCode, setLoginCode] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    if (loginCode === "25802580") {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginCode("");
    } else {
      alert("Incorrect code! Check Telegram pin comment.");
    }
  };

  const filteredVideos = videosData.filter((v) =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* --- Header --- */}
      <header className="p-4 bg-black border-b border-white/5 sticky top-0 z-[1000] flex flex-col items-center">
        <div className="flex justify-between w-full items-center mb-4">
          <Menu
            size={26}
            className="cursor-pointer text-gray-300"
            onClick={() => setIsMenuOpen(true)}
          />
          <h1 className="text-xl font-black italic tracking-tighter text-red-600 uppercase">
            PRIME CLIP ZONE
          </h1>
          <div className="relative flex items-center bg-[#1a1a1a] rounded-full px-3 py-1 border border-white/10">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-[12px] outline-none w-20 sm:w-40 font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="text-gray-500" />
          </div>
        </div>

        <div className="flex gap-6 border-t border-white/5 pt-3 w-full justify-center">
          <a
            href="https://t.me/primeclipzone"
            target="_blank"
            className="flex items-center gap-1.5 text-[#229ED9] text-[10px] font-black uppercase"
          >
            <Send size={14} fill="#229ED9" /> Join Telegram
          </a>
          <a
            href="https://www.youtube.com/@prime-clip-zone"
            target="_blank"
            className="flex items-center gap-1.5 text-red-600 text-[10px] font-black uppercase"
          >
            <Youtube size={14} fill="red" /> Subscribe
          </a>
        </div>
      </header>

      {/* --- Side Menu --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[2000] bg-black/98 flex flex-col p-8 transition-all">
          <X
            className="self-end mb-8 cursor-pointer text-red-600"
            size={32}
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="space-y-6 text-xl font-black italic uppercase tracking-widest">
            {!isLoggedIn ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-3 text-green-500"
              >
                <LogIn /> Login System
              </button>
            ) : (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center gap-3 text-red-500"
              >
                <LogOut /> Logout
              </button>
            )}
            <hr className="border-white/10" />
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-red-600"
            >
              About Us
            </Link>
            <Link
              href="/privacy"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-red-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="/disclaimer"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-red-600"
            >
              Disclaimer
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm normal-case text-gray-400 font-bold"
            >
              hasanvai4231@gmail.com
            </Link>
          </div>
        </div>
      )}

      {/* --- Login Modal --- */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[3000] bg-black/90 flex items-center justify-center p-4">
          <div className="bg-[#111] p-6 rounded-2xl w-full max-w-sm border border-red-600/30 text-center shadow-2xl">
            <h2 className="mb-4 font-bold text-yellow-500 text-sm italic">
              Login ✅ Code in Telegram Pin Comment ✅
            </h2>
            <input
              type="password"
              placeholder="Enter Code (25802580)"
              className="w-full p-3 bg-black rounded-lg mb-4 text-center border border-white/20 focus:border-red-600 outline-none font-bold text-white"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-red-600 py-3 rounded-lg font-black uppercase active:scale-95 text-white"
            >
              Verify & Login
            </button>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 text-gray-500 text-xs uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- Video Sections --- */}
      <div className="mt-10 px-4 space-y-12">
        {categoriesData.map((cat, idx) => {
          const catVideos = filteredVideos.filter(
            (v) => String(v.category_id) === String(cat.id)
          );
          if (catVideos.length === 0) return null;

          return (
            <div key={cat.id} className="space-y-4">
              <div className="flex items-center justify-between border-l-4 border-red-600 pl-3">
                <h2 className="text-[14px] font-black uppercase tracking-widest">
                  {cat.name}
                </h2>
                <ChevronRight size={18} className="text-gray-600" />
              </div>

              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x transition-all duration-300">
                {catVideos.map((video) => (
                  <Link
                    key={video.id}
                    href={`/watch/${video.id}`}
                    className="min-w-[160px] sm:min-w-[220px] snap-start group block"
                  >
                    <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-[#151515] border border-white/5 shadow-2xl group-hover:ring-2 group-hover:ring-red-600">
                      <img
                        src={video.thumbnail_url || video.thumbnail}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={video.title}
                      />
                      <div className="absolute top-2 right-2 bg-blue-600 text-[9px] px-2 py-0.5 rounded font-black shadow-lg">
                        EP {video.id}
                      </div>
                      {video.tag && (
                        <div className="absolute bottom-2 left-2 bg-red-600 text-[8px] px-1.5 py-0.5 rounded font-black italic uppercase shadow-lg">
                          {video.tag}
                        </div>
                      )}
                    </div>
                    <h3 className="mt-2 text-[10px] font-bold text-gray-400 line-clamp-2 uppercase italic tracking-tighter group-hover:text-red-600 leading-tight">
                      {video.title}
                    </h3>
                  </Link>
                ))}
              </div>

              {/* --- Banner Ad --- */}
              {idx === 1 && (
                <div className="my-8 flex justify-center border-y border-white/5 py-6">
                  <div id="container-c71fa39abdc2a4ee82cc5f9d2a8b5e05"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <script
        src="https://pl28595065.effectivegatecpm.com/34/95/5d/34955d11745783891e5e1882f225e510.js"
        async
      ></script>
    </div>
  );
          }
