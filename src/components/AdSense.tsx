"use client";

export default function AdSense({ code }: { code: string }) {
  if (!code) return null;
  return (
    <div className="my-8 w-full flex justify-center bg-gray-800 p-4 rounded-lg">
      <div dangerouslySetInnerHTML={{ __html: code }} />
      <span className="text-xs text-gray-500">Ad Space</span>
    </div>
  );
}

