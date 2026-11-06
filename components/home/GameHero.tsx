"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import PlatformTags from "@/components/PlatformTags";
import { gameStatusLabel, games, playDeveloper, site, won, type Game } from "@/lib/data";

const SLIDE_MS = 7000;
const SEEN_KEY = "jcodelab-intro-seen";

/** 상태에 맞는 대표 버튼 */
function primaryCta(g: Game) {
  if (g.status === "free") return { label: "Google Play에서 받기", href: g.stores?.googlePlay || g.stores?.appStore || playDeveloper };
  if (g.status === "paid") return { label: `지금 구매 · ${won(g.price)}`, href: "/gamelist#games" };
  return { label: "출시 알림 받기", href: "/contact" };
}

export default function GameHero() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [curtain, setCurtain] = useState(true);
  const n = games.length;
  const g = games[i];

  // 오프닝 커튼은 세션당 한 번만
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) setCurtain(false);
      else sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % n), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [i, hold, n]);

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);
  const cta = primaryCta(g);

  return (
    <>
      {curtain && (
        <div className="curtain" aria-hidden="true">
          <span className="curtain__word display">
            <span className="wordmark__j">J</span>
            {site.name.slice(1)}
          </span>
          <span className="curtain__sub mono">Game Studio</span>
          <span className="curtain__bar" />
        </div>
      )}

      <section
        className="gh"
        aria-roledescription="carousel"
        aria-label="JCodeLab 게임"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocusCapture={() => setHold(true)}
        onBlurCapture={() => setHold(false)}
      >
        {/* 배경: 게임 영상이 있으면 영상, 없으면 키 아트 */}
        <div className="gh__bg" aria-hidden="true">
          {games.map((x, k) => (
            <div key={x.id} className={`gh__bg-slide${k === i ? " is-active" : ""}`}>
              {x.trailer && k === i ? (
                <video src={x.trailer} autoPlay muted loop playsInline />
              ) : (
                <Image src={x.image} alt="" fill sizes="100vw" priority={k === 0} />
              )}
            </div>
          ))}
        </div>
        <div className="gh__scrim" aria-hidden="true" />
        <div className="gh__scan" aria-hidden="true" />

        <div className="wrap gh__layout">
          <div key={g.id} className="gh__info" aria-live="polite">
            <p className="gh__kicker mono">
              <span className="gh__kicker-j">JCodeLab</span> presents
            </p>
            <div className="gh__meta">
              <span className={`chip chip--${g.status === "soon" ? "dev" : g.status}`}>{gameStatusLabel[g.status]}</span>
              <PlatformTags platforms={g.platforms} />
            </div>
            <h1 className="gh__title">{g.title}</h1>
            <p className="gh__sum">{g.summary}</p>
            <p className="gh__genre mono">
              {g.genre} · {g.engine}
            </p>

            <div className="gh__cta">
              {cta.href.startsWith("http") ? (
                <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  <Icon name="play" size={16} />
                  {cta.label}
                </a>
              ) : (
                <Link href={cta.href} className="btn btn--primary">
                  {g.status === "dev" || g.status === "soon" ? <Icon name="bell" size={18} /> : <Icon name="play" size={16} />}
                  {cta.label}
                </Link>
              )}
              <Link href="/gamelist#games" className="btn btn--ghost">
                게임 정보
              </Link>
            </div>

          </div>

          {/* 가로로 눕힌 휴대폰 화면 */}
          <figure key={`f-${g.id}`} className="gh__frame gh__frame--phone" aria-hidden="true">
            <div className="gh__device">
              <div className="gh__screen">
                <Image src={g.image} alt="" fill sizes="(max-width: 900px) 90vw, 560px" />
                <span className="gh__glare" />
              </div>
              <span className="gh__notch" />
            </div>
            <span className="brackets" />
          </figure>
        </div>

        {/* 게임 선택 바 */}
        <div className="gh__picker">
          <div className="wrap gh__picker-inner">
            <button type="button" className="gh__arrow" onClick={() => go(i - 1)} aria-label="이전 게임">
              <Icon name="arrowLeft" size={18} />
            </button>
            <ol className="gh__thumbs">
              {games.map((x, k) => (
                <li key={x.id}>
                  <button
                    type="button"
                    className={`gh__thumb${k === i ? " is-active" : ""}`}
                    onClick={() => go(k)}
                    aria-current={k === i}
                    aria-label={`${x.title} 보기`}
                  >
                    <span className="gh__thumb-img">
                      <Image src={x.image} alt="" fill sizes="96px" />
                    </span>
                    <span className="gh__thumb-txt">
                      <strong>{x.title}</strong>
                      <PlatformTags platforms={x.platforms} compact />
                    </span>
                    <i className="gh__thumb-bar">{k === i && <b key={i} className={hold ? "is-held" : undefined} />}</i>
                  </button>
                </li>
              ))}
            </ol>
            <button type="button" className="gh__arrow" onClick={() => go(i + 1)} aria-label="다음 게임">
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
