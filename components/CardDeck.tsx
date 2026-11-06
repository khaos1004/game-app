"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { gameStatusLabel, games, platformsText } from "@/lib/data";

const SHUFFLE_MS = 3200;

/**
 * 게임마다 한 장씩 만든 카드를 부채꼴로 겹쳐 두고, 맨 앞 카드가 자동으로 맨 뒤로 섞여 들어갑니다.
 * 마우스를 올리면 멈추고 부채가 넓게 펼쳐지며, 카드를 누르면 그 카드가 앞으로 옵니다.
 * 바닥에는 거울처럼 비친 반사가 생깁니다.
 */
export default function CardDeck() {
  const [order, setOrder] = useState(() => games.map((_, i) => i));
  const [hold, setHold] = useState(false);
  const [leaving, setLeaving] = useState<number | null>(null);

  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      setLeaving(order[0]);
      window.setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setLeaving(null);
      }, 420);
    }, SHUFFLE_MS);
    return () => window.clearTimeout(t);
  }, [order, hold]);

  const bringFront = (gi: number) => setOrder((o) => [gi, ...o.filter((x) => x !== gi)]);

  return (
    <div
      className={`deck${hold ? " is-open" : ""}`}
      data-spot
      data-tilt
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
    >
      <div className="deck__cards">
        {games.map((g, gi) => {
          const pos = order.indexOf(gi);
          return (
            <button
              key={g.id}
              type="button"
              className={`gcard pos-${pos}${pos === 0 ? " is-front" : ""}${leaving === gi ? " is-leaving" : ""}`}
              style={{ zIndex: games.length - pos }}
              onClick={() => bringFront(gi)}
              aria-label={`${g.title} 카드 앞으로`}
              tabIndex={pos === 0 ? 0 : -1}
            >
              <span className="gcard__art">
                <Image src={g.image} alt="" fill sizes="340px" priority={gi === 0} />
              </span>
              <span className="gcard__shade" />
              <span className="gcard__foil" />
              <span className="gcard__top">
                <span className={`gcard__status gcard__status--${g.status}`}>{gameStatusLabel[g.status]}</span>
                <span className="gcard__gems" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </span>
              <span className="gcard__bottom">
                <span className="gcard__title">{g.title}</span>
                <span className="gcard__meta">
                  {g.genre} · {platformsText(g)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <span className="deck__floor" aria-hidden="true" />
    </div>
  );
}
