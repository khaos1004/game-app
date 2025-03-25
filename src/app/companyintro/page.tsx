'use client'
import Header from "@/component/public/Header"
import Footer from "@/component/public/Footer"
import { Mail, MapPin } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Header />

      <main className="flex-grow px-6 py-20 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight">JCodeLab</h1>
          <p className="text-lg text-gray-400">
            우리는 상상을 현실로 바꾸는 개발자 그룹입니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">🎯 우리의 미션</h2>
          <p className="text-gray-300 leading-relaxed">
            JCodeLab은 혁신적이고 사용자 친화적인 코드로 세상을 더 나은 방향으로 이끄는 것을 목표로 합니다.
            사용자의 경험을 최우선으로 생각하며, 끊임없이 도전하고 진화합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">🛠 우리가 하는 일</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>웹 및 모바일 서비스 개발</li>
            <li>Unity 게임 개발</li>
            <li>캐쥬얼 게임 개발</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">📬 Contact</h2>
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-5 h-5" />
            khaos1004@naver.com
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <MapPin className="w-5 h-5" />
            인천 계양구 장제로 995번길 44 3동 6층 JCodeLab
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
