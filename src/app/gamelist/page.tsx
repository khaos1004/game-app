'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/component/public/Header'
import Footer from '@/component/public/Footer'
import {
  SiJavascript,
  SiPython,  
  SiKotlin,
} from 'react-icons/si'
import { X } from 'lucide-react'
import { FaJava } from 'react-icons/fa'

type CodeItem = {
  id: number
  title: string
  description: string
  language: 'js' | 'py' | 'java' | 'kt'
  price: number
}

const iconMap = {
  js: <SiJavascript className="text-yellow-300 text-4xl" />,
  py: <SiPython className="text-blue-400 text-4xl" />,
  java: <FaJava className="text-orange-400 text-4xl" />,
  kt: <SiKotlin className="text-pink-400 text-4xl" />,
}

export default function CodeListPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CodeItem[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CodeItem | null>(null)
  const [searchText, setSearchText] = useState('')

  const [items] = useState<CodeItem[]>([
    {
      id: 1,
      title: '자동 크롤링 봇',
      description: 'Python 기반의 웹 자동화 봇입니다. BeautifulSoup, Selenium 기반으로 로그인 자동화, 크롤링 기능이 포함되어 있습니다.',
      language: 'py',
      price: 39000,
    },
    {
      id: 2,
      title: '2D 액션 게임 엔진',
      description: 'JavaScript와 Canvas API를 사용해 만든 게임 엔진. 스프라이트, 충돌처리, 맵 이동 등 지원.',
      language: 'js',
      price: 59000,
    },
    {
      id: 3,
      title: '안드로이드 자동화 앱 템플릿',
      description: 'Kotlin 기반으로 UI 자동화 처리 및 AccessibilityService 샘플 포함.',
      language: 'kt',
      price: 49000,
    },
    {
      id: 4,
      title: 'Java 백엔드 템플릿',
      description: 'Spring Boot 기반 로그인, 결제, MySQL 연동 샘플 제공.',
      language: 'java',
      price: 79000,
    },
  ])

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
  )

  const addToCart = (item: CodeItem) => {
    setCart([...cart, item])
    setShowModal(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Header onSearch={(text) => setSearchText(text)} />

      <main className="flex-grow px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">유료 소스코드</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer relative rounded-xl p-6 bg-white/5 backdrop-blur-md border border-gray-700 shadow-lg flex flex-col items-center text-center space-y-4 hover:scale-105 transition"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black rounded-full p-3 border border-gray-600">
                {iconMap[item.language]}
              </div>

              <h2 className="pt-8 text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
              <div className="text-lg font-bold text-lime-400">
                {item.price.toLocaleString()}원
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  addToCart(item)
                }}
                className="mt-2 px-4 py-2 bg-gradient-to-r from-green-600 to-lime-500 rounded-lg font-semibold text-black hover:brightness-110 transition"
              >
                구매하기
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* ✅ 장바구니 안내 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-sm relative shadow-2xl border border-gray-700 text-center space-y-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">장바구니에 추가되었습니다 🛒</h2>
            <p className="text-sm text-gray-400">장바구니로 이동하시겠습니까?</p>
            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => router.push('/cart')}
                className="px-4 py-2 bg-lime-500 rounded-md text-black font-semibold hover:brightness-110"
              >
                이동하기
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-md text-white hover:brightness-110"
              >
                계속 쇼핑
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ 상세 보기 모달 */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-md relative border border-gray-700 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
            <p className="text-gray-300 whitespace-pre-line">{selectedItem.description}</p>
            <p className="text-lime-400 text-xl font-semibold">{selectedItem.price.toLocaleString()}원</p>
            <button
              onClick={() => {
                setCart([...cart, selectedItem])
                setSelectedItem(null)
                setShowModal(true)
              }}
              className="mt-2 w-full py-2 bg-lime-500 text-black rounded-md font-semibold hover:brightness-110"
            >
              장바구니에 담기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
