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
        <link href="https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/static/pretendard.css" rel="stylesheet" />
        <link rel="icon" href="/common/code.svg" />
        <meta name="naver-site-verification" content="25fcf51194e8ed056ce17a5c9db328456bbea668" />
        <meta name="description" content="게임, 자동화, 웹/앱 서비스 등 다양한 소스코드를 한눈에 확인하세요." />
        <meta name="keywords" content="소스코드 판매, 게임 소스, 자동화, 코드 마켓" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="JCodeLab" />
        <meta property="og:title" content="JCodeLab - 소스코드 마켓" />
        <meta property="og:description" content="게임, 자동화, 웹툴 등 다양한 고퀄 소스코드를 만날 수 있는 곳" />
        <meta property="og:url" content="https://jcodelab.shop" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/common/jcodelabMain.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
