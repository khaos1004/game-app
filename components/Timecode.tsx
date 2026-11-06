"use client";

import { useEffect, useState } from "react";

const FPS = 24;
const pad = (n: number) => String(n).padStart(2, "0");

/** 영상 편집기 스타일 타임코드 (HH:MM:SS:FF @ 24fps) */
export default function Timecode() {
  const [frames, setFrames] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      setFrames(Math.floor(((now - start) / 1000) * FPS));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const s = Math.floor(frames / FPS);
  return (
    <span className="mono">
      {pad(Math.floor(s / 3600))}:{pad(Math.floor(s / 60) % 60)}:{pad(s % 60)}:{pad(frames % FPS)}
    </span>
  );
}
