'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/banner/2d.webp",
  "/banner/2d2.webp",
  "/banner/ca.webp",
  "/banner/ca2.webp",
  "/banner/dark.webp",
  "/banner/dark2.webp",
  
];

const BannerCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 overflow-hidden rounded-lg shadow-lg">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`banner-${i}`}
            width={1200}
            height={500}
            className="w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        ◀
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        ▶
      </button>
    </div>
  );
};

export default BannerCarousel;
