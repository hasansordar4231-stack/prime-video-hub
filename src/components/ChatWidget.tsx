"use client";

import { MessageCircle } from 'lucide-react';

export default function ChatWidget() {
  // আপনার দেওয়া নম্বরটি এখানে সেট করা হয়েছে
  const phoneNumber = "8801822271462"; 
  const message = "Hello Admin, I need download access code."; 

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg transition-all hover:scale-105 border-2 border-white"
      style={{ boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)' }}
    >
      <MessageCircle size={24} />
      <span className="font-bold hidden md:inline">Live Chat</span>
    </a>
  );
}

