"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Icon from "./Icon";

type Props = { open: boolean; onClose: () => void; label: string; children: ReactNode; wide?: boolean };

export default function Modal({ open, onClose, label, children, wide }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={panelRef}
        className={`modal__panel${wide ? " modal__panel--wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="닫기">
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>
  );
}
