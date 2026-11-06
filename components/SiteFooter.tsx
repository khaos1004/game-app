import Link from "next/link";
import { company, playDeveloper, site, social } from "@/lib/data";
import { Wordmark } from "./SiteHeader";

const cols: { t: string; links: { href: string; label: string; ext?: boolean }[] }[] = [
  {
    t: "바로가기",
    links: [
      { href: "/gamelist", label: "게임" },
      { href: "/#news", label: "소식" },
      { href: "/companyintro", label: "스튜디오" },
      { href: "/contact", label: "문의하기" },
    ],
  },
  {
    t: "게임 받기",
    links: [{ href: playDeveloper, label: "Google Play", ext: true }],
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          <Wordmark />
          <p>
            {site.tagline}. {site.nameKo}는 Unity로 모바일 게임을 만드는 1인 게임 스튜디오입니다.
          </p>
          {social.length > 0 && (
            <ul className="site-footer__social" aria-label="SNS">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cols.map((c) => (
          <div key={c.t} className="site-footer__col">
            <h2>{c.t}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.href}>
                  {l.ext ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label} ↗
                    </a>
                  ) : (
                    <Link href={l.href}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="site-footer__col">
          <h2>연락처</h2>
          <ul>
            <li className="mono">{site.email}</li>
            <li className="mono">{site.phone}</li>
            <li className="muted">{site.phoneHours}</li>
          </ul>
        </div>
      </div>
      <div className="site-footer__giant" aria-hidden="true">
        <span>
          <b>J</b>CODELAB
        </span>
      </div>
      {company.length > 0 && (
        <dl className="wrap site-footer__biz">
          {company.map((r) => (
            <div key={r.k}>
              <dt>{r.k}</dt>
              <dd>{r.v}</dd>
            </div>
          ))}
          <div>
            <dt>이메일</dt>
            <dd>{site.email}</dd>
          </div>
        </dl>
      )}
      <div className="wrap site-footer__base">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>Unity는 Unity Technologies 또는 그 계열사의 상표입니다.</span>
      </div>
    </footer>
  );
}
