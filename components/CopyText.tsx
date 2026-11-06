"use client";

import { useRef, useState } from "react";

/** 이메일·전화번호처럼 복사할 텍스트. 클립보드를 못 쓰면 텍스트를 선택해 줍니다. */
export default function CopyText({ text, label }: { text: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      const r = document.createRange();
      if (ref.current) {
        r.selectNodeContents(ref.current);
        const s = window.getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
      }
    }
  };

  return (
    <span className="copy">
      <span ref={ref} className="copy__text mono">
        {text}
      </span>
      <button type="button" className="copy__btn" onClick={copy} aria-label={`${label} 복사`}>
        {done ? "복사됨" : "복사"}
      </button>
    </span>
  );
}
