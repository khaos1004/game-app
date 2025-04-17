import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "제이코드랩(JCodeLab) - 고퀄리티 소스코드 마켓",
  description: "Source Code Exchange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        {/* <!-- 폰트 & 파비콘 --> */}
        <link href="https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/static/pretendard.css" rel="stylesheet" />
        <link rel="icon" href="/common/code.svg" />

        {/* <!-- 네이버 검색 등록 --> */}
        <meta name="naver-site-verification" content="25fcf51194e8ed056ce17a5c9db328456bbea668" />

        {/* <!-- SEO 기본 메타 --> */}        
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="제이코드랩은 게임, 자동화, 웹/앱 서비스, AI 등 다양한 소스코드를 한눈에 확인하고 구매할 수 있는 전문 플랫폼입니다." />
        <meta name="keywords" content="소스코드 판매, 게임 소스, 자동화, 코드 마켓, 제이코드랩, JCodeLab" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="JCodeLab" />

        {/* <!-- Open Graph (SNS 공유 최적화) --> */}
        <meta property="og:title" content="JCodeLab - 소스코드 마켓" />
        <meta property="og:description" content="게임, 자동화, 웹툴 등 다양한 고퀄 소스코드를 만날 수 있는 곳, 제이코드랩에서 개발을 시작하세요!" />
        <meta property="og:url" content="https://jcodelab.shop" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://jcodelab.shop/common/jcodelabMain.jpg" />

        {/* <!-- Twitter 카드도 추가하면 좋아요 --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JCodeLab - 소스코드 마켓" />
        <meta name="twitter:description" content="게임, 자동화, 웹툴 다양한 소스를 판매하는 제이코드랩." />
        <meta name="twitter:image" content="https://jcodelab.shop/common/jcodelabMain.jpg" />
        <title>제이코드랩 - 게임/자동화 소스코드 마켓 | JCodeLab</title>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
