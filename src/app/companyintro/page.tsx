import Header from "@/component/public/Header"
import Footer from "@/component/public/Footer"
import { Mail, MapPin, Phone } from "lucide-react"
import { Metadata } from 'next'

// ✅ SEO 메타데이터 추가
export const metadata: Metadata = {
  title: 'About - JCodeLab',
  description: 'JCodeLab은 혁신적인 소스코드와 서비스를 제공하는 개발 스튜디오입니다.',
  keywords: ['JCodeLab', '소스코드 판매', '개발 서비스', '게임 개발', '웹 제작'],
  openGraph: {
    title: 'About - JCodeLab',
    description: 'JCodeLab은 혁신적인 소스코드와 서비스를 제공하는 개발 스튜디오입니다.',
    url: 'https://jcodelab.shop/about',
    siteName: 'JCodeLab',
    images: [
      {
        url: 'https://jcodelab.shop/mask-x.svg', // 썸네일 이미지
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Header />

      <main className="flex-grow px-6 py-20 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight">JCodeLab</h1>
          <p className="text-lg text-gray-400">
            상상에 가치를 더하다, JCodeLab
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">Value of JCodeLab</h2>
          <p className="text-gray-300 leading-relaxed">
            JCodeLab은 혁신적이고 사용자 친화적인 코드로 세상을 더 나은 방향으로 이끄는 것을 목표로 합니다.
            사용자의 경험을 최우선으로 생각하며, 끊임없이 상상하며 도전하고 진화합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">JcodeLab Service</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>웹 및 모바일 서비스 개발</li>
            <li>자동화 프로그램 개발</li>
            <li>Unity 게임 개발</li>
            <li>캐쥬얼 게임 개발</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">Contact to JCodeLab</h2>
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-5 h-5" />
            brandonje@jcodelab.shop
          </div>
          {/* <div className="flex items-center gap-3 text-gray-300">
            <MapPin className="w-5 h-5" />
            인천 계양구 장제로 995번길 44 3동 6층 JCodeLab
          </div> */}
          <div className="flex items-center gap-3 text-gray-300">
            <Phone className="w-5 h-5" />
            010-7794-6488 (AM 06 ~ PM 23)
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
