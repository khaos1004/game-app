import type { Config } from "tailwindcss";

export default {
  darkMode: 'class', // 항상 다크모드로 쓸 수 있도록 설정
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        noto: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;
