"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/data";
import Icon from "./Icon";

export function Wordmark({ small, tag = true }: { small?: boolean; tag?: boolean }) {
  return (
    <span className={`wordmark${small ? " wordmark--sm" : ""}`}>
      <span className="wordmark__j">J</span>
      {site.name.slice(1)}
      {tag && <span className="wordmark__tag">Game Studio</span>}
    </span>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlay = pathname === "/";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overlay || scrolled || open;

  return (
    <header className={`site-header${solid ? " is-solid" : ""}`}>
      <div className="wrap site-header__inner">
        <Link href="/" aria-label={`${site.name} 홈`}>
          <Wordmark />
        </Link>

        <nav aria-label="주요 메뉴" className="site-nav">
          {navLinks.map((n) => (
            <Link key={n.href} href={n.href} className={pathname === n.href ? "is-active" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <div className="wrap mobile-menu__inner">
          {navLinks.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
