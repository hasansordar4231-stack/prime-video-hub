import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from '@/components/ChatWidget'; // এই লাইনটি যোগ করা হয়েছে

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
      <body className={inter.className}>
        {children}
        <ChatWidget /> {/* এই লাইনটি যোগ করা হয়েছে, যা বাটন দেখাবে */}
      </body>
    </html>
  );
}
