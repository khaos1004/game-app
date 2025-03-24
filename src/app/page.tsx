'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/component/public/Header";
import Footer from "@/component/public/Footer";
import BgMainVideo from "@/component/main/BgMainVideo";

export default function Home() {
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    // 마지막 텍스트 기준 5번째 문구 → 3000ms * 4 + 1500ms 이후 등장
    const timer = setTimeout(() => {
      setShowEnter(true);
    }, 13500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen relative">
        <BgMainVideo />

        <div className="w-full z-10 relative">
          <Header />
        </div>

        <main className="flex-grow relative z-10">
          {showEnter && (
            <div className="absolute bottom-90 left-1/2 -translate-x-1/2">
              <button className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r
               from-gray-400 to-gray-300 shadow-lg hover:brightness-200 hover:text-black hover:opacity-100 opacity-70 hover:cursor-pointer">
                JCodeLab 입장
              </button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
