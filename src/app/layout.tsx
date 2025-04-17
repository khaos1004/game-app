import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 폰트 세팅
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO 및 SNS 공유 최적화 메타데이터
export const metadata: Metadata = {
  title: '제이코드랩 - 게임/자동화 소스코드 마켓 | JCodeLab',
  description: '제이코드랩은 게임, 자동화, 웹/앱 서비스 등 다양한 소스코드를 구매할 수 있는 플랫폼입니다.',
  keywords: ['제이코드랩', 'JCodeLab', '소스코드 마켓', '자동화', '게임 소스', '코드 마켓'],
  authors: [{ name: 'JCodeLab' }],
  robots: 'index, follow',
  openGraph: {
    title: 'JCodeLab - 소스코드 마켓',
    description: '게임, 자동화, 웹툴 등 다양한 고퀄 소스코드를 만날 수 있는 곳, 제이코드랩에서 개발을 시작하세요!',
    url: 'https://jcodelab.shop',
    siteName: 'JCodeLab',
    type: 'website',
    locale: 'ko_KR',
    images: ['https://jcodelab.shop/common/jcodelabMain.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JCodeLab - 소스코드 마켓',
    description: '게임, 자동화, 웹툴 다양한 소스를 판매하는 제이코드랩.',
    images: ['https://jcodelab.shop/common/jcodelabMain.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        {/* ✅ 폰트 & 파비콘 */}
        <link href="https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/static/pretendard.css" rel="stylesheet" />
        <link rel="icon" href="/common/code.svg" />

        {/* ✅ 네이버 웹마스터 등록 */}
        <meta name="naver-site-verification" content="25fcf51194e8ed056ce17a5c9db328456bbea668" />

        {/* ✅ 뷰포트 설정 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
