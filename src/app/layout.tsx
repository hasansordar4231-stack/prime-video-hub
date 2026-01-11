import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from '@/components/ChatWidget';
import Script from 'next/script'; // নতুন স্ক্রিপ্ট লোডার যোগ করা হয়েছে

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrimeVideoHub",
  description: "Free Static Video Streaming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adsterra Popunder Code - এটি আপনার prime-clip-zone সাইটের জন্য */}
        <Script 
          src="https://pl28452578.effectivegatecpm.com/dc/c2/db/dcc2db28e11e445bb59424697084fe18.js" 
          strategy="afterInteractive" 
        />
      </head>
      <body className={inter.className}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
