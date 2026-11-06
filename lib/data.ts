// 사이트 전체에서 쓰는 데이터. 문구·게임·연락처는 여기서 수정합니다.
// [예시] 표시가 붙은 항목은 화면 구성을 위한 샘플이니 실제 데이터로 바꿔 주세요.

export const site = {
  name: "JCodeLab",
  nameKo: "제이코드랩",
  url: "https://jcodelab.cloud",
  tagline: "상상에 가치를 더하다",
  email: "contact@jcodelab.cloud",
  phone: "010-7794-6488",
  phoneHours: "오전 6시 ~ 오후 11시",
};

export const navLinks = [
  { href: "/gamelist", label: "게임" },
  { href: "/#news", label: "소식" },
  { href: "/companyintro", label: "스튜디오" },
  { href: "/contact", label: "문의하기" },
];

/** SNS 주소. 값을 넣은 것만 푸터와 메인에 아이콘으로 나타납니다. */
export const social: { label: string; href: string }[] = [
  { label: "YouTube", href: "" },
  { label: "Discord", href: "" },
  { label: "Instagram", href: "" },
  { label: "X", href: "" },
].filter((s) => s.href);

/** 푸터 사업자 정보. 게임을 판매하려면 통신판매업 신고 번호 등을 표시해야 합니다. 값이 있는 줄만 나타납니다. */
export const company: { k: string; v: string }[] = [
  { k: "상호", v: "제이코드랩 (JCodeLab)" },
  { k: "대표", v: "" },
  { k: "사업자등록번호", v: "" },
  { k: "통신판매업 신고", v: "" },
  { k: "주소", v: "" },
].filter((r) => r.v);

export type Platform = "android" | "ios";

export const platformLabel: Record<Platform, string> = { android: "Android", ios: "iOS" };

/** 메인 "What we make" 목록 */
export const platforms: { id: string; k: string; t: string; d: string; badge: string }[] = [
  {
    id: "android",
    k: "Android",
    t: "Android 게임",
    badge: "Google Play",
    d: "모든 게임을 Google Play에 출시했습니다. 지금 바로 받아 보세요.",
  },
  {
    id: "free",
    k: "Free",
    t: "모두 무료",
    badge: "Free to Play",
    d: "JCodeLab의 모든 게임은 무료로 받아 바로 즐길 수 있습니다.",
  },
  {
    id: "unity",
    k: "Unity",
    t: "Made with Unity",
    badge: "엔진",
    d: "기획부터 출시까지, 모든 게임을 Unity로 직접 만듭니다.",
  },
];

export type GameStatus = "free" | "paid" | "dev" | "soon";

export type Game = {
  id: string;
  title: string;
  genre: string;
  platforms: Platform[];
  engine: string;
  summary: string;
  description: string;
  image: string;
  status: GameStatus;
  price: number;
  features: string[];
  /** 메인 첫 화면에서 이 게임 슬라이드에 깔 플레이 영상 (예: public/videos/트레일러.mp4). 없으면 키 아트를 씁니다. */
  trailer?: string;
  /** 스토어 페이지 주소. 값이 있으면 상세 화면과 메인에 버튼이 생깁니다. */
  stores?: { googlePlay?: string; appStore?: string };
};

const play = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;

/** Google Play 주소를 아직 넣지 않은 게임은 이 개발자 검색 페이지로 연결됩니다. */
export const playDeveloper = "https://play.google.com/store/search?q=JcodeLab&c=apps";

/**
 * JCodeLab의 모바일 게임 (모두 Unity, Google Play 출시).
 * stores.googlePlay는 각 Unity 프로젝트의 Android 패키지 이름으로 만든 주소입니다.
 */
export const games: Game[] = [
  {
    id: "candy-jump",
    title: "캔디 점프",
    genre: "캐주얼 점프",
    platforms: ["android"],
    engine: "Unity",
    summary: "사탕 섬 위로, 끝없이 높이 점프!",
    description:
      "말랑한 젤리 친구와 함께 사탕 섬의 발판을 밟고 끝없이 올라가는 무한 등반 점프 게임입니다. 비눗방울에 갇힌 친구를 구해 능력이 다른 캐릭터를 모으고, 날개·제트팩·프로펠러 같은 변신 아이템으로 하늘 끝까지 날아오르세요.",
    image: "/games/candy-jump.webp",
    status: "free",
    price: 0,
    features: ["무한 등반", "비눗방울 친구 구출", "캐릭터 수집", "변신 아이템", "무료 플레이"],
    stores: { googlePlay: play("com.jcodelab.candyjump") },
  },
  {
    id: "chain-pop",
    title: "체인 팝",
    genre: "폭탄 퍼즐",
    platforms: ["android"],
    engine: "Unity",
    summary: "한 번의 터치, 연쇄로 터지는 쾌감",
    description:
      "세로 화면에서 폭탄을 터뜨려 연쇄 폭발을 만드는 퍼즐 게임입니다. 레벨이 올라갈수록 가파르게 어려워져, 한 판 한 판 머리를 쓰게 만듭니다.",
    image: "/games/chain-pop.webp",
    status: "free",
    price: 0,
    features: ["연쇄 폭발 퍼즐", "갈수록 어려워지는 레벨", "세로 한 손 플레이", "한국어 지원", "무료 플레이"],
    stores: { googlePlay: play("com.jcodelab.chainpop") },
  },
  {
    id: "undead-horde",
    title: "언데드 호드",
    genre: "다크 판타지 서바이벌",
    platforms: ["android"],
    engine: "Unity",
    summary: "붉은 달 아래, 밤의 숲을 뒤덮는 언데드의 물결",
    description:
      "끝없이 몰려오는 언데드 무리를 베어 넘기며 살아남는 다크 판타지 서바이벌 게임입니다. 픽셀화된 3D 그래픽으로, 전사·궁수·법사로 시작해 전직으로 더 강해집니다.",
    image: "/games/undead-horde.webp",
    status: "free",
    price: 0,
    features: ["픽셀 3D 그래픽", "전사 · 궁수 · 법사", "전직 시스템", "장비 강화", "무료 플레이"],
    stores: { googlePlay: play("com.jcodelab.undeadhorde") },
  },
  {
    id: "panel-story",
    title: "잔혹동화", // [가제]
    genre: "그림 패널 퍼즐",
    platforms: ["android"],
    engine: "Unity",
    summary: "그림 조각을 맞추면, 동화가 다시 흘러갑니다",
    description:
      "한 장씩 그려진 그림 패널을 옮기고 겹쳐 길을 이어 가는 스토리 퍼즐 게임입니다. 화마다 새로운 잔혹동화와 함께 다른 동물 친구가 따라다니며, 갈수록 새로운 형태의 퍼즐이 등장합니다.",
    image: "/games/panel-story.webp",
    status: "free",
    price: 0,
    features: ["그림 패널 퍼즐", "화별 스토리", "동물 동료", "아련한 동화 일러스트", "무료 플레이"],
    stores: {}, // TODO: Google Play 주소 (Unity에 Android 패키지 이름이 아직 없음)
  },
  {
    id: "rift-spirit",
    title: "Rift Spirit",
    genre: "2D 횡스크롤 액션",
    platforms: ["android"],
    engine: "Unity",
    summary: "불타는 대지를 가르는 한 자루의 검",
    description:
      "화산과 폐허, 빙하를 넘나들며 거대한 보스와 맞서는 픽셀 아트 횡스크롤 액션 게임입니다. 화려한 픽셀 이펙트의 스킬과 콤보로 싸웁니다.",
    image: "/games/rift-spirit.webp",
    status: "free",
    price: 0,
    features: ["픽셀 아트 액션", "보스 전투", "스킬 · 콤보", "다양한 지역", "무료 플레이"],
    stores: { googlePlay: play("com.riftspirit.game") },
  },
  {
    id: "horde-defense",
    title: "좀비 디펜스", // [가제]
    genre: "물량 디펜스",
    platforms: ["android"],
    engine: "Unity",
    summary: "몰려오는 수백의 좀비, 기지를 지켜라",
    description:
      "오른쪽에서 끝없이 밀려오는 좀비와 괴물 무리를 목책과 타워로 막아 내는 물량 디펜스 게임입니다. 기지를 짓고 방어선을 넓혀 마지막 밤까지 버티세요.",
    image: "/games/horde-defense.webp",
    status: "free",
    price: 0,
    features: ["대규모 좀비 물량", "기지 · 타워 건설", "다양한 몬스터", "무료 플레이"],
    stores: {}, // TODO: Google Play 주소 (Unity에 Android 패키지 이름이 아직 없음)
  },
  {
    id: "speaking-grammar",
    title: "스피킹 그래머",
    genre: "영어 학습",
    platforms: ["android"],
    engine: "Unity",
    summary: "말하면서 익히는 영어 문법",
    description:
      "문장을 직접 말하며 영어 문법을 익히는 스피킹 학습 앱입니다. 게임처럼 단계를 깨며 자주 쓰는 문법 표현을 입에 붙게 만듭니다.",
    image: "/games/speaking-grammar.webp",
    status: "free",
    price: 0,
    features: ["말하기 중심 학습", "단계별 문법", "무료 이용"],
    stores: { googlePlay: play("com.jcodelab.speakinggrammar") },
  },
];

export const won = (n: number) => `₩${n.toLocaleString("ko-KR")}`;

export const gameStatusLabel: Record<GameStatus, string> = {
  free: "무료",
  paid: "구매 가능",
  dev: "개발 중",
  soon: "출시 예정",
};

export const platformsText = (g: Game) => g.platforms.map((p) => platformLabel[p]).join(" · ");
export const metaOf = (g: Game) => `${g.genre} · ${platformsText(g)}`;

export type NewsCat = "공지" | "업데이트" | "개발일지" | "이벤트";

/** 메인 "소식" 목록. 최신 글이 위로 오게 적어 주세요. */
export const news: { cat: NewsCat; title: string; date: string; game?: string }[] = [
  { cat: "공지", title: "JCodeLab의 모든 게임, Google Play에서 만나 보세요", date: "2026.11.06" },
  { cat: "공지", title: "체인 팝, Google Play 출시", date: "2026.11.05", game: "체인 팝" },
  { cat: "업데이트", title: "언데드 호드, 픽셀화된 3D 그래픽으로 새 단장", date: "2026.11.04", game: "언데드 호드" },
  { cat: "공지", title: "캔디 점프, Google Play 출시", date: "2026.10.27", game: "캔디 점프" },
  { cat: "개발일지", title: "JCodeLab의 모든 게임은 이제 Unity로 만듭니다", date: "2026.10.25" },
  { cat: "공지", title: "JCodeLab 공식 홈페이지를 새롭게 열었습니다", date: "2026.10.24" },
];
