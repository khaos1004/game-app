# JCodeLab 웹사이트

Unity로 모바일 게임을 만들어 Google Play에 출시하는 1인 게임 스튜디오 JCodeLab(제이코드랩)의 사이트입니다.
기존 `game-app` 프로젝트의 페이지 구성과 영상·이미지를 그대로 가져와 최신 Next.js(App Router)로 새로 만들었습니다.

## 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

`package.json`의 next / react 버전은 `latest`라서 설치하는 시점의 최신 버전이 들어옵니다.
설치 후 `package-lock.json`을 커밋하면 버전이 고정됩니다.
UI 라이브러리(Tailwind, daisyUI, framer-motion, lucide, react-icons)는 쓰지 않고 CSS와 직접 만든 컴포넌트만 씁니다.

## 페이지

| 경로 | 내용 |
|---|---|
| `/` | 대표 게임 히어로(게임별 슬라이드, Google Play·App Store 버튼, 하단 게임 선택 바), What we make, 전체 게임, 소식, 스튜디오 소개 |
| `/gamelist` | 게임: 대표 게임 캐러셀, 검색, 상세 모달(Google Play 바로가기). 상태가 섞이면 필터가 자동으로 나타납니다 |
| `/companyintro` | 스튜디오: 게임 카드 덱, 가치, 엔딩 크레딧, Unity 기술, 로드맵(단계만 표시), 연락처 |
| `/contact` | 문의 폼 → `POST /api/contact` |


```ts
// next.config.ts 예시
async rewrites() {
  return [
    { source: "/api/:path*", destination: "https://api.jcodelab.cloud/api/:path*" },
  ];
},
```

## 수정할 곳

- 문구·게임·연락처: `lib/data.ts` (게임 이미지는 `public/games/`, 출시하면 `status`와 `stores` 주소를 바꿔 주세요. `[가제]` 표시는 임시 제목입니다)
- 게임별 플랫폼: `lib/data.ts`의 `platforms: ["android"]` (iOS를 내면 `"ios"`와 `stores.appStore`를 추가)
- Google Play · App Store 링크: 게임의 `stores`에 주소를 넣으면 상세 화면에 버튼이 생깁니다
- 메인 슬라이드 배경을 게임 영상으로: 게임의 `trailer`에 `/videos/트레일러.mp4` 같은 경로를 넣으세요
- 소식: `lib/data.ts`의 `news` (최신 글이 위)
- SNS 링크: `lib/data.ts`의 `social` (주소를 넣은 것만 표시)
- 푸터 사업자 정보: `lib/data.ts`의 `company` (대표, 사업자등록번호, 통신판매업 신고 번호 등. 값을 넣은 줄만 표시)
- 회사소개 내용·로드맵: `lib/studio.ts`
- 색과 글꼴: `app/globals.css` 맨 위 `:root`

## 게임 영상

사이트에는 이제 사람이 나오는 배경 영상이 없습니다. 실제 게임 플레이 영상이 생기면 `public/videos`에 넣고
`lib/data.ts`의 해당 게임 `trailer`에 경로를 적으면 메인 첫 화면 그 게임 슬라이드의 배경으로 재생됩니다.

```bash
ffmpeg -i 원본.mov -an -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 24 -preset slow -movflags +faststart public/videos/트레일러.mp4
```

## SEO

- 메타데이터·OG 이미지: `app/layout.tsx` (네이버 사이트 인증 메타 태그 유지)
- `app/sitemap.ts`, `app/robots.ts`가 `/sitemap.xml`, `/robots.txt`를 만들어 줍니다 (next-sitemap 불필요).

## 배포 (Cloudflare)

정적 사이트로 내보내(`output: "export"`) Cloudflare Workers의 정적 자산으로 배포합니다. 설정은 `wrangler.jsonc`에 있습니다.

- 빌드 명령: `npm run build` (결과는 `out/` 폴더)
- 배포 명령: `npx wrangler deploy`
- `wrangler.jsonc`의 `name`은 Cloudflare 프로젝트 이름(`game-app`)과 같아야 합니다.

### 문의 메일

문의 폼은 `POST /api/contact`로 보내고, `worker/index.ts`가 Cloudflare Email Routing으로 메일을 보냅니다.

1. Cloudflare 대시보드 → jcodelab.cloud → **이메일 → 이메일 라우팅**을 켭니다.
2. **대상 주소**에 문의를 받을 메일(`khaos1004@naver.com`)을 추가하고, 받은 인증 메일에서 인증합니다.
3. 받는 주소를 바꾸려면 `wrangler.jsonc`의 `destination_address`와 `CONTACT_TO`를 함께 바꾸세요.

받은 메일에 답장하면 문의한 사람에게 바로 갑니다(Reply-To).
