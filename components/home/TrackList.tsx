import Link from "next/link";
import Icon from "@/components/Icon";

type Track = { k: string; t: string; d: string; href: string; badge?: string; main?: boolean };

/** 플랫폼 목록 */
export default function TrackList({ tracks }: { tracks: Track[] }) {
  return (
    <ol className="tracks">
      {tracks.map((s) => (
        <li key={s.k} className={`track rv${s.main ? " track--main" : ""}`}>
          <span className="track__k display">{s.k}</span>
          <div className="track__body">
            <h3>
              {s.t}
              {s.badge && <span className={`chip${s.main ? " chip--main" : ""}`}>{s.badge}</span>}
            </h3>
            <p>{s.d}</p>
          </div>
          <Link href={s.href} className="track__go" aria-label={`${s.t} 자세히 보기`}>
            <Icon name="arrowRight" size={22} />
          </Link>
        </li>
      ))}
    </ol>
  );
}
