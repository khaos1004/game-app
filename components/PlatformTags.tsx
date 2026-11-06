import Icon from "./Icon";
import { platformLabel, type Platform } from "@/lib/data";


/** 게임이 나오는 플랫폼을 아이콘과 함께 표시 */
export default function PlatformTags({ platforms, compact }: { platforms: Platform[]; compact?: boolean }) {
  return (
    <ul className={`ptags${compact ? " ptags--compact" : ""}`} aria-label="플랫폼">
      {platforms.map((p) => (
        <li key={p}>
          <Icon name="phone" size={compact ? 14 : 16} />
          <span>{platformLabel[p]}</span>
        </li>
      ))}
    </ul>
  );
}
