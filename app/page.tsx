import Image from "next/image";
import Link from "next/link";
import GameHero from "@/components/home/GameHero";
import TrackList from "@/components/home/TrackList";
import GameRail from "@/components/home/GameRail";
import Marquee from "@/components/Marquee";
import Timecode from "@/components/Timecode";
import Icon from "@/components/Icon";
import ArtCycle from "@/components/ArtCycle";
import { games, news, platforms } from "@/lib/data";
import "./home.css";


export default function HomePage() {
  const bandGame = games.find((g) => g.id === "undead-horde") ?? games[0];
  const tracks = platforms.map((p) => ({
    k: p.k,
    t: p.t,
    d: p.d,
    badge: p.badge,
    href: "/gamelist#games",
  }));

  return (
    <main>
      <GameHero />

      <Marquee items={["Mobile Games", "Google Play", "Free to Play", "Made with Unity", "Indie Studio", "One Hand Play"]} />

      {/* 선언 */}
      <section className="section manifesto">
        <div className="wrap manifesto__grid">
          <p className="eyebrow rv">What we make</p>
          <h2 className="manifesto__text rv">
            우리는 <em>모바일 게임</em>만 만듭니다. <em>Unity</em>로, 손안에서 가장 재미있는 순간을 위해.
          </h2>
        </div>
        <div className="wrap">
          <TrackList tracks={tracks} />
        </div>
      </section>

      {/* 게임 */}
      <section className="section section--alt games-sec">
        <div className="wrap">
          <div className="section__head">
            <div className="rv">
              <p className="eyebrow">Games</p>
              <h2 className="h2 h2--xl">전체 게임</h2>
            </div>
            <Link href="/gamelist#games" className="link-arrow rv">
              전체 게임 보기 <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
        <GameRail />
      </section>

      {/* 소식 */}
      <section id="news" className="section">
        <div className="wrap">
          <div className="section__head">
            <div className="rv">
              <p className="eyebrow">News</p>
              <h2 className="h2 h2--xl">새 소식</h2>
            </div>
          </div>
          <div className="news">
            <article className="news__lead rv" data-spot>
              <ArtCycle sizes="(max-width: 900px) 100vw, 520px" />
              <span className={`ncat ncat--${news[0].cat}`}>{news[0].cat}</span>
              <h3>{news[0].title}</h3>
              <p className="muted">
                JCodeLab이 만드는 모바일 게임의 새 소식과 개발 과정을 이곳에서 가장 먼저 전해 드립니다.
              </p>
              <time className="news__date mono">{news[0].date}</time>
            </article>
            <ul className="news__list">
              {news.slice(1).map((n) => (
                <li key={n.title} className="news__item rv">
                  <span className={`ncat ncat--${n.cat}`}>{n.cat}</span>
                  <div>
                    <h3>{n.title}</h3>
                    {n.game && <p>{n.game}</p>}
                  </div>
                  <time className="news__date mono">{n.date}</time>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 스튜디오 */}
      <section className="studio-band">
        <div className="studio-band__bg" aria-hidden="true">
          <Image src={bandGame.image} alt="" fill sizes="100vw" />
        </div>
        <div className="letterbox letterbox--top letterbox--static" aria-hidden="true" />
        <div className="letterbox letterbox--bottom letterbox--static" aria-hidden="true" />
        <div className="studio-band__hud wrap" aria-hidden="true">
          <span className="studio-band__rec">
            <i /> REC
          </span>
          <Timecode />
          <span className="studio-band__ue">MADE WITH UNITY</span>
        </div>
        <div className="wrap studio-band__text">
          <p className="eyebrow rv">Now on Google Play · {games.length} Games</p>
          <h2 className="studio-band__title rv">
            {games.length}개의 게임,
            <br />지금 Google Play에서.
          </h2>
          <p className="lede rv">
            Unity로 기획부터 레벨, 연출, 사운드까지 한 사람이 끝까지 만듭니다. 다음 게임도 이미 만들고 있습니다.
          </p>
          <div className="rv">
            <Link href="/companyintro" className="btn btn--primary">
              스튜디오 이야기
            </Link>
          </div>
        </div>
      </section>

      {/* 문의 */}
      <section className="cta-band">
        <div className="wrap cta-band__inner">
          <h2 className="display cta-band__title rv-fade">
            Let&apos;s play
            <br />
            <span className="cta-band__outline">together.</span>
          </h2>
          <div className="cta-band__side rv">
            <p className="lede">협업과 퍼블리싱 제안, 게임에 대한 피드백까지 무엇이든 편하게 보내 주세요.</p>
            <Link href="/contact" className="btn btn--primary">
              문의하기 <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
