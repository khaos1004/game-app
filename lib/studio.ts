// 회사소개 페이지 데이터

export const values = [
  { k: "손에 맞는 게임", d: "모바일이 중심입니다. 한 손 조작, 짧은 플레이, 끊겨도 이어지는 흐름까지 플레이어의 하루에 맞춰 설계합니다." },
  { k: "끝까지 만든다", d: "작게 시작해도 출시까지 갑니다. 프로토타입에서 멈추지 않는 것이 1인 스튜디오의 원칙입니다." },
  { k: "플레이어와 함께", d: "개발 과정과 로드맵을 공개하고, 플레이어의 피드백으로 게임을 다듬습니다." },
];

export const serviceList = [
  "모바일 게임 개발 (Android)",
  "Unity 기반 게임 기획·개발",
  "레벨 디자인과 인게임 연출",
  "출시 후 라이브 업데이트",
];

export const credits = [
  { role: "Directed by", name: "JCodeLab" },
  { role: "Game Design", name: "JCodeLab" },
  { role: "Level Design", name: "JCodeLab" },
  { role: "C# Programming", name: "JCodeLab" },
  { role: "Cinematics (Timeline)", name: "JCodeLab" },
  { role: "Lighting", name: "JCodeLab" },
  { role: "VFX", name: "JCodeLab" },
  { role: "UI / UX", name: "JCodeLab" },
  { role: "Sound Design", name: "JCodeLab" },
  { role: "QA", name: "JCodeLab" },
  { role: "Special Thanks", name: "플레이해 줄 당신" },
];

export const tech = [
  { sys: "UNITY", t: "Unity 엔진", d: "모든 게임을 Unity로 만들어 Google Play에 출시합니다." },
  { sys: "URP", t: "모바일 렌더링", d: "Universal Render Pipeline으로 발열과 배터리를 아끼면서 프레임을 지킵니다." },
  { sys: "C#", t: "게임 로직", d: "조작감과 밸런스를 C# 코드로 직접 다듬습니다." },
  { sys: "TIMELINE", t: "인게임 연출", d: "Timeline과 Cinemachine으로 컷신과 카메라 연출을 만듭니다." },
  { sys: "ADDRESSABLES", t: "가벼운 업데이트", d: "리소스를 나눠 받아 앱 용량은 줄이고 업데이트는 빠르게 합니다." },
];

export type Stage = { n: string; t: string; d: string };

/** 개발 로드맵. 진행 상태 없이 단계만 보여 줍니다. */
export const roadmap: Stage[] = [
  { n: "01", t: "Prototype", d: "핵심 조작과 재미를 모바일에서 검증합니다." },
  { n: "02", t: "Vertical Slice", d: "한 구역을 출시 품질로 완성합니다." },
  { n: "03", t: "테스트", d: "Google Play 비공개 테스트로 실제 기기에서 다듬습니다." },
  { n: "04", t: "정식 출시", d: "Google Play에 무료로 출시합니다." },
  { n: "05", t: "라이브 업데이트", d: "출시 후에도 이벤트와 새 콘텐츠로 게임을 키워 갑니다." },
];
