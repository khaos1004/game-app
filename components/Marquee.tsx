/** 끝없이 흐르는 키워드 띠 */
export default function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const row = (hidden?: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t}>
          <span>{t}</span>
          <i aria-hidden="true">✦</i>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee${reverse ? " marquee--rev" : ""}`}>
      <div className="marquee__track">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
