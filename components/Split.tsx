import { Fragment } from "react";

/** 한 글자씩 아래에서 떠오르는 문장. 줄바꿈은 단어 단위로만 일어납니다. */
export default function Split({ text, delay = 0 }: { text: string; delay?: number }) {
  let n = 0;
  const words = text.split(" ");
  return (
    <span className="split" aria-label={text}>
      {words.map((word, w) => (
        <Fragment key={w}>
          <span className="split__word" aria-hidden="true">
            {Array.from(word).map((ch, i) => (
              <span key={i} className="split__mask">
                <span className="split__ch" style={{ animationDelay: `${delay + n++ * 0.035}s` }}>
                  {ch}
                </span>
              </span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
