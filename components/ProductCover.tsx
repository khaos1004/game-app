import Image from "next/image";
import type { Game } from "@/lib/data";

/** 게임 키 아트 커버 */
export default function ProductCover({ p, priority, sizes }: { p: Game; priority?: boolean; sizes?: string }) {
  return (
    <div className="cover cover--game">
      <Image
        src={p.image}
        alt=""
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"}
        className="cover__img"
      />
    </div>
  );
}
