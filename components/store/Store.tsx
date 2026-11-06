"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import ProductCover from "@/components/ProductCover";
import { games, gameStatusLabel, metaOf, playDeveloper, platformLabel, won, type Game } from "@/lib/data";

type Filter = "all" | "free" | "paid" | "soon" | "dev";

// 일부 게임에만 해당하는 필터만 보여 줍니다 (전체는 항상)
const filters: { k: Filter; label: string; test: (g: Game) => boolean }[] = (
  [
    { k: "all", label: "전체", test: () => true },
    { k: "free", label: "무료", test: (g) => g.status === "free" },
    { k: "paid", label: "구매 가능", test: (g) => g.status === "paid" },
    { k: "soon", label: "출시 예정", test: (g) => g.status === "soon" },
    { k: "dev", label: "개발 중", test: (g) => g.status === "dev" },
  ] as { k: Filter; label: string; test: (g: Game) => boolean }[]
).filter((f) => {
  if (f.k === "all") return true;
  const n = games.filter(f.test).length;
  return n > 0 && n < games.length;
});

const storeButtons = (g: Game) =>
  [
    g.platforms.includes("android") && { label: "Google Play", href: g.stores?.googlePlay || playDeveloper },
    g.stores?.appStore && { label: "App Store", href: g.stores.appStore },
  ].filter(Boolean) as { label: string; href: string }[];

function PriceTag({ g }: { g: Game }) {
  if (g.status !== "paid")
    return <span className={`chip chip--${g.status === "free" ? "free" : "dev"}`}>{gameStatusLabel[g.status]}</span>;
  return <span className="price">{won(g.price)}</span>;
}

export default function Store() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<Game | null>(null);

  const q = query.trim().toLowerCase();
  const shown = useMemo(() => {
    const test = filters.find((f) => f.k === filter)!.test;
    return games.filter(
      (g) => test(g) && (!q || [g.title, g.summary, g.description, metaOf(g)].some((s) => s.toLowerCase().includes(q))),
    );
  }, [filter, q]);

  return (
    <main className="store">
      <Featured onOpen={setDetail} />

      <div className="store__bar">
        <div className="wrap store__bar-inner">
          {filters.length > 1 && (
          <div className="seg" role="group" aria-label="게임 상태">
            {filters.map((f) => (
              <button key={f.k} type="button" aria-pressed={filter === f.k} onClick={() => setFilter(f.k)}>
                {f.label}
                <span className="mono">{games.filter(f.test).length}</span>
              </button>
            ))}
          </div>
          )}
          <label className="store__search field__box">
            <Icon name="search" />
            <span className="sr-only">게임 검색</span>
            <input
              id="store-search"
              type="search"
              placeholder="게임 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="wrap store__body">
        <section id="games" className="store__group" aria-labelledby="games-h">
          <div className="store__group-head rv">
            <h2 id="games-h" className="h2 h2--xl">
              게임
            </h2>
            <p className="muted">JCodeLab이 Unity로 직접 만드는 모바일 게임들</p>
          </div>
          {shown.length ? (
            <div className="store__grid">
              {shown.map((g, i) => (
                <article key={g.id} className="pcard rv" data-spot data-tilt>
                  <button type="button" className="pcard__open" onClick={() => setDetail(g)} aria-label={`${g.title} 자세히 보기`}>
                    <ProductCover p={g} priority={i < 2} />
                    <div className="pcard__body">
                      <div className="pcard__meta">
                        <span>{metaOf(g)}</span>
                      </div>
                      <h3 className="pcard__title">{g.title}</h3>
                      <p className="pcard__sum">{g.summary}</p>
                    </div>
                  </button>
                  <div className="pcard__foot">
                    <PriceTag g={g} />
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => setDetail(g)}>
                      자세히
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="store__empty">
              조건에 맞는 게임이 없습니다. 다른 필터나 검색어를 골라 보세요.
            </p>
          )}
        </section>
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} label={detail ? `${detail.title} 상세` : "상세"} wide>
        {detail && (
          <div className="detail">
            <div className="detail__cover">
              <ProductCover p={detail} sizes="(max-width: 820px) 100vw, 420px" />
            </div>
            <div className="modal__body">
              <p className="eyebrow eyebrow--mute">
                {detail.genre} · {detail.engine}
              </p>
              <h2 className="h2">{detail.title}</h2>
              <ul className="detail__platforms" aria-label="플랫폼">
                {detail.platforms.map((p) => (
                  <li key={p} className="chip">
                    {platformLabel[p]}
                  </li>
                ))}
              </ul>
              <p className="detail__desc">{detail.description}</p>
              <ul className="detail__features">
                {detail.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={16} /> {f}
                  </li>
                ))}
              </ul>
              <div className="detail__buy">
                <PriceTag g={detail} />
                {storeButtons(detail).length > 0 && (
                  <div className="detail__stores">
                    {storeButtons(detail).map((b) => (
                      <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
                        <Icon name="download" size={16} /> {b.label}에서 받기
                      </a>
                    ))}
                  </div>
                )}
                {detail.status !== "free" && detail.status !== "paid" && (
                  <p className="notice notice--info">
                    {detail.status === "soon" ? "곧 출시됩니다." : "지금 만들고 있는 게임입니다."} 소식은 <Link href="/contact">문의하기</Link>로 받아 보세요.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

    </main>
  );
}

/** 상단 대표 게임 캐러셀 */
function Featured({ onOpen }: { onOpen: (g: Game) => void }) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const n = games.length;

  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % n), 6000);
    return () => window.clearTimeout(t);
  }, [i, hold, n]);

  const g = games[i];

  return (
    <section
      className="featured"
      aria-roledescription="carousel"
      aria-label="대표 게임"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
    >
      {games.map((x, k) => (
        <div key={x.id} className={`featured__slide${k === i ? " is-active" : ""}`} aria-hidden={k !== i}>
          <Image src={x.image} alt="" fill priority={k === 0} sizes="100vw" className="featured__img" />
        </div>
      ))}
      <div className="featured__shade" aria-hidden="true" />

      <div className="wrap featured__content">
        <div key={g.id} className="featured__text" aria-live="polite">
          <span className={`chip chip--${g.status === "soon" ? "dev" : g.status}`}>{gameStatusLabel[g.status]}</span>
          <h1 className="featured__title">{g.title}</h1>
          <p className="featured__sum">{g.summary}</p>
          <p className="featured__meta mono">{metaOf(g)}</p>
          <div className="featured__cta">
            <button type="button" className="btn btn--primary" onClick={() => onOpen(g)}>
              자세히 보기
            </button>
          </div>
        </div>

        <div className="featured__nav">
          <button type="button" onClick={() => setI((i - 1 + n) % n)} aria-label="이전 게임">
            <Icon name="arrowLeft" />
          </button>
          <div className="featured__dots">
            {games.map((x, k) => (
              <button
                key={x.id}
                type="button"
                className={k === i ? "is-active" : undefined}
                onClick={() => setI(k)}
                aria-label={`${k + 1}번째: ${x.title}`}
                aria-current={k === i}
              >
                <span className="mono">{String(k + 1).padStart(2, "0")}</span>
                <i>{k === i && <b key={i} className={hold ? "is-held" : undefined} />}</i>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setI((i + 1) % n)} aria-label="다음 게임">
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>
    </section>
  );
}
