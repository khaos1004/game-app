"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { games } from "@/lib/data";

/** 게임 키 아트가 몇 초마다 자동으로 바뀌는 이미지 영역 */
export default function ArtCycle({ interval = 3800, sizes = "520px" }: { interval?: number; sizes?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % games.length), interval);
    return () => window.clearInterval(t);
  }, [interval]);

  return (
    <div className="artcycle" aria-hidden="true">
      {games.map((g, k) => (
        <div key={g.id} className={`artcycle__slide${k === i ? " is-active" : ""}`}>
          <Image src={g.image} alt="" fill sizes={sizes} />
        </div>
      ))}
      <span className="artcycle__shade" />
      <span key={i} className="artcycle__cap">
        {games[i].title}
      </span>
      <span className="artcycle__dots">
        {games.map((g, k) => (
          <i key={g.id} className={k === i ? "is-on" : undefined} />
        ))}
      </span>
    </div>
  );
}
