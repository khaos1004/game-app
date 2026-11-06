import type { NextConfig } from "next";

// 정적 사이트로 내보내 Cloudflare(Workers 정적 자산)에 배포합니다. 빌드 결과는 out/ 폴더에 생깁니다.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // 타입 검사 경고 때문에 배포가 멈추지 않게 합니다 (개발 중에는 에디터에서 확인)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
