"use client";
import React, { useState } from 'react';
import { MessageCircle, Send, X, Youtube, Bell } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  const phoneNumber = "8801822271462"; 
  const whatsappMessage = "Hello Admin, I need help with Prime Clip Zone!"; 
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const telegramLink = "https://t.me/primeclipzone";

  return (
    <div className="fixed bottom-20 right-6 z-[60] flex flex-col items-end gap-3">
      
      {/* মেনু ওপেন হলে এই বাটনগুলো দেখাবে */}
      {isOpen && (
        <div className="flex flex-col gap-3 mb-2 animate-in fade-in slide-in-from-bottom-5">
          {/* ইউটিউব বাটন */}
          <a
            href="https://www.youtube.com/@reallifestory-r2p"
            target="_blank"
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold border border-white/20 hover:scale-105 transition-all"
          >
            <Youtube size={18} /> Subscribe
          </a>

          {/* টেলিগ্রাম বাটন */}
          <a
            href={telegramLink}
            target="_blank"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold border border-white/20 hover:scale-105 transition-all"
          >
            <Send size={18} /> Join Telegram
          </a>

          {/* হোয়াটসঅ্যাপ বাটন */}
          <a
            href={whatsappLink}
            target="_blank"
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold border border-white/20 hover:scale-105 transition-all"
          >
            <MessageCircle size={18} /> Request Movie
          </a>
        </div>
      )}

      {/* মেইন ফ্লোটিং বাটন */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-2xl transition-all border-2 border-white/30 flex items-center justify-center ${
          isOpen ? 'bg-gray-800 rotate-90' : 'bg-red-600 animate-bounce'
        }`}
        style={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)' }}
      >
        {isOpen ? <X size={28} className="text-white" /> : <Bell size={28} className="text-white" />}
      </button>
    </div>
  );
              }
        
