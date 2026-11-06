import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PlatformTags from "@/components/PlatformTags";
import CardDeck from "@/components/CardDeck";
import CopyText from "@/components/CopyText";
import Icon from "@/components/Icon";
import Marquee from "@/components/Marquee";
import Split from "@/components/Split";
import { games, site } from "@/lib/data";
import { credits, roadmap, serviceList, tech, values } from "@/lib/studio";
import "./studio.css";

export const metadata: Metadata = {
  title: "회사소개",
  description: "JCodeLab은 Unity로 모바일 게임을 만드는 1인 게임 스튜디오입니다.",
  openGraph: { title: "회사소개 - JCodeLab", url: `${site.url}/companyintro` },
};

export default function CompanyIntroPage() {
  return (
    <main>
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden="true">
          {games.map((g) => (
            <Image key={g.id} src={g.image} alt="" width={640} height={366} />
          ))}
        </div>
        <div className="about-hero__scrim" aria-hidden="true" />
        <div className="about-hero__scan" aria-hidden="true" />

        <div className="wrap about-hero__layout">
          <div className="about-hero__content">
            <p className="eyebrow">About {site.name}</p>
            <h1 className="display about-hero__title">
              <span>
                <Split text="One mind." delay={0.2} />
              </span>
              <span className="about-hero__outline">
                <Split text="One world." delay={0.55} />
              </span>
            </h1>
            <p className="lede">
              {site.tagline}. {site.nameKo}는 Unity로 모바일 게임을 기획부터 출시까지 혼자 만드는 1인 게임 스튜디오입니다.
            </p>
            <PlatformTags platforms={["android"]} />
          </div>

          <CardDeck />
        </div>
      </section>

      <Marquee items={["Mobile", "Android", "Unity", "Game Design", "C#", "Sound"]} reverse />

      {/* 가치 */}
      <section className="section">
        <div className="wrap about-split">
          <div>
            <p className="eyebrow rv">Value of JCodeLab</p>
            <h2 className="h2 h2--xl rv">작은 화면에서도 오래 기억에 남는 게임을 만듭니다.</h2>
          </div>
          <dl className="values">
            {values.map((v) => (
              <div key={v.k} className="values__row rv">
                <dt>{v.k}</dt>
                <dd>{v.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 크레딧 */}
      <section className="section section--alt">
        <div className="wrap about-split about-split--center">
          <div>
            <p className="eyebrow rv">The Studio</p>
            <h2 className="h2 h2--xl rv">엔딩 크레딧에 이름이 하나뿐인 스튜디오.</h2>
            <p className="lede about-gap">
              기획, 레벨, 코드, 조명, 시네마틱, 사운드까지 모든 공정을 직접 다룹니다. 그래서 작고 단단한 결과물을
              만듭니다.
            </p>
            <ul className="services">
              {serviceList.map((s) => (
                <li key={s}>
                  <Icon name="check" size={16} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="credits" aria-label="크레딧">
            <div className="credits__roll">
              {[0, 1].map((dup) => (
                <ul key={dup} aria-hidden={dup === 1 ? true : undefined}>
                  {credits.map((c) => (
                    <li key={c.role}>
                      <span className="credits__role">{c.role}</span>
                      <span className="credits__name">{c.name}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 기술 */}
      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <div className="rv">
              <p className="eyebrow">Built with Unity</p>
              <h2 className="h2 h2--xl">작은 화면에 맞춘, 단단한 기술.</h2>
            </div>
          </div>
          <div className="tech" role="list">
            {tech.map((t) => (
              <div key={t.sys} className="tech__row rv" role="listitem">
                <span className="tech__sys mono">{t.sys}</span>
                <span className="tech__t">{t.t}</span>
                <span className="tech__d">{t.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 로드맵 */}
      <section className="section section--alt">
        <div className="wrap">
          <div className="section__head">
            <div className="rv">
              <p className="eyebrow">Roadmap</p>
              <h2 className="h2 h2--xl">하나의 게임이 나오기까지</h2>
            </div>
          </div>
          <ol className="roadmap">
            {roadmap.map((r) => (
              <li key={r.n} className="stage rv">
                <span className="stage__n mono" aria-label={`${Number(r.n)}단계`}>
                  {r.n}
                </span>
                <div>
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 연락처 */}
      <section className="section">
        <div className="wrap about-split">
          <div>
            <p className="eyebrow rv">Contact to JCodeLab</p>
            <h2 className="h2 h2--xl rv">협업과 퍼블리싱 문의를 기다립니다.</h2>
            <div className="about-gap">
              <Link href="/contact" className="btn btn--primary">
                문의 남기기
              </Link>
            </div>
          </div>
          <dl className="contact-list">
            <div>
              <dt>
                <Icon name="mail" size={18} /> 이메일
              </dt>
              <dd>
                <CopyText text={site.email} label="이메일" />
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="call" size={18} /> 전화
              </dt>
              <dd>
                <CopyText text={site.phone} label="전화번호" />
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="clock" size={18} /> 응대 시간
              </dt>
              <dd>{site.phoneHours}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
