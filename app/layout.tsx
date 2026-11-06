import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Display, JetBrains_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Ambient from "@/components/Ambient";
import { site } from "@/lib/data";
import "./globals.css";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "제이코드랩 - 모바일 게임 스튜디오 | JCodeLab",
    template: "%s | JCodeLab",
  },
  description:
    "제이코드랩은 Unity로 모바일 게임을 만드는 1인 게임 스튜디오입니다.",
  keywords: ["제이코드랩", "JCodeLab", "모바일 게임", "인디 게임", "Unity", "유니티", "Android", "Google Play", "무료 게임"],
  authors: [{ name: "JCodeLab" }],
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }] },
  verification: { other: { "naver-site-verification": "25fcf51194e8ed056ce17a5c9db328456bbea668" } },
  openGraph: {
    title: "JCodeLab - 모바일 게임 스튜디오",
    description: "Unity로 만드는 모바일 게임, 제이코드랩.",
    url: site.url,
    siteName: "JCodeLab",
    type: "website",
    locale: "ko_KR",
    images: ["/images/og-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JCodeLab - 모바일 게임 스튜디오",
    description: "Unity로 만드는 모바일 게임, 제이코드랩.",
    images: ["/images/og-cover.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d13",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${display.variable} ${mono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <div id="main">{children}</div>
        <SiteFooter />
        <Ambient />
      </body>
    </html>
  );
}
