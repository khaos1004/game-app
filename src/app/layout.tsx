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
  title: "JCodeLab",
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

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable } antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
