"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { games, gameStatusLabel, metaOf } from "@/lib/data";

/** 가로로 넘겨 보는 게임 목록. 마우스로 끌거나 화살표로 넘길 수 있습니다. */
export default function GameRail() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });
  const [progress, setProgress] = useState(0);
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const by = (dir: 1 | -1) => {
    const el = ref.current;
    const item = el?.querySelector<HTMLElement>(".rail__item");
    if (el && item) el.scrollBy({ left: dir * (item.offsetWidth + 20), behavior: "smooth" });
  };

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { on: true, x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.on || !ref.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4 && !d.moved) {
      d.moved = true;
      setGrabbing(true);
    }
    if (d.moved) ref.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    drag.current.on = false;
    setGrabbing(false);
  };

  return (
    <div className="rail-wrap">
      <div
        ref={ref}
        className={`rail${grabbing ? " is-grabbing" : ""}`}
        role="list"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
      >
        {games.map((g, i) => (
          <Link key={g.id} href="/gamelist#games" className="rail__item" role="listitem" data-spot draggable={false}>
            <Image src={g.image} alt="" fill sizes="(max-width: 700px) 86vw, 44vw" className="rail__img" priority={i === 0} draggable={false} />
            <span className="rail__shade" aria-hidden="true" />
            <span className="rail__info">
              <span className={`chip chip--${g.status === "soon" ? "dev" : g.status}`}>{gameStatusLabel[g.status]}</span>
              <span className="rail__title">{g.title}</span>
              <span className="rail__meta">
                {metaOf(g)}
              </span>
            </span>
          </Link>
        ))}
      </div>
      <div className="wrap rail-ctrl">
        <span className="rail-ctrl__track" aria-hidden="true">
          <i style={{ transform: `scaleX(${0.18 + progress * 0.82})` }} />
        </span>
        <button type="button" onClick={() => by(-1)} aria-label="이전 게임">
          <Icon name="arrowLeft" />
        </button>
        <button type="button" onClick={() => by(1)} aria-label="다음 게임">
          <Icon name="arrowRight" />
        </button>
      </div>
    </div>
  );
}
