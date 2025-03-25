'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, X } from 'lucide-react'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

export default function CartPage() {
  const router = useRouter()

  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: 'JCode 티셔츠 소스코드', price: 29000, quantity: 1 },
    { id: 2, name: '결제 모듈 템플릿', price: 15000, quantity: 2 },
  ])

  const [showModal, setShowModal] = useState(false)

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleDanalPay = () => {
    // 여기에 다날 결제 연동 코드 삽입 예정
    alert('✅ 다날 결제 진행 중...\n(이 부분에 결제 연동 코드 삽입)')
    console.log('결제 항목:', cart)
    console.log('총금액:', totalPrice)
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-gray-700 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">🛒 장바구니</h1>
          <p className="text-sm text-gray-400 mt-2">소스코드 상품을 확인하고 결제할 수 있어요</p>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-400 py-10">장바구니가 비어 있습니다.</p>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3 text-white"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.quantity}개 × {item.price.toLocaleString()}원
                  </p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-600 space-y-4">
              <div className="text-right text-gray-300 font-semibold">
                총 합계: {totalPrice.toLocaleString()}원
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-3 font-semibold rounded-lg bg-gradient-to-r from-green-600 to-lime-500 text-white hover:brightness-110 transition-all"
              >
                💳 결제하기
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-400 hover:underline"
          >
            메인페이지로 돌아가기
          </button>
        </div>
      </div>

      {/* ✅ 결제 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-xl p-8 w-full max-w-md relative shadow-2xl border border-gray-700">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4">결제 확인</h2>
            <div className="space-y-2 text-sm text-gray-300">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              ))}
              <hr className="border-gray-700 my-2" />
              <div className="flex justify-between font-semibold text-white">
                <span>총 결제 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
            </div>

            <button
              onClick={handleDanalPay}
              className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:brightness-110 transition font-semibold"
            >
              다날로 결제하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
