"use client";

import { useEffect } from "react";

/**
 * 페이지 전체의 작은 상호작용:
 * - [data-spot] 요소 위에서 커서를 따라 빛이 움직이는 스포트라이트 (--mx, --my)
 * - [data-tilt] 요소의 아주 약한 3D 기울기
 */
export default function Ambient() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-spot]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      if (!reduced && el.hasAttribute("data-tilt")) {
        el.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
        el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
      }
    };
    const onLeave = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-tilt]");
      if (el && !el.contains(e.relatedTarget as Node)) {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return <div className="grain" aria-hidden="true" />;
}
