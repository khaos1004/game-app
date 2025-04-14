'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || '로그인 실패')

      alert('로그인 성공!')
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-gray-700 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">🔐 JCodeLab 로그인</h1>
          <p className="text-sm text-gray-400 mt-2">계정 정보를 입력해 주세요</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-3 focus-within:ring-2 ring-gray-500">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent flex-1 outline-none text-white placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-3 focus-within:ring-2 ring-gray-500">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent flex-1 outline-none text-white placeholder-gray-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 font-semibold rounded-lg bg-gradient-to-r from-gray-600 to-gray-400 text-white hover:brightness-110 hover:text-black transition-all"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </div>

        {/* 🔽 소셜 로그인 버튼 추가 🔽 */}
        <div className="mt-6 space-y-3">
          <p className="text-center text-sm text-gray-400">또는 소셜 계정으로 로그인</p>

          {/* 구글 */}
          <a
            href="/oauth2/authorization/google"
            className="w-full flex justify-center items-center py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all"
          >
            <div className="flex items-center gap-2">
              <Image src="/icons/google.svg" alt="Google" className="w-5 h-5" width={20} height={20} />
              <span className="text-sm font-medium">Goole 로그인</span>
            </div>
          </a>

          {/* 네이버 */}
          <a
            href="/oauth2/authorization/naver"
            className="w-full flex justify-center items-center py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            <div className="flex items-center gap-2">
              <Image src="/icons/naver.svg" alt="Naver" className="w-5 h-5" width={20} height={20} />
              <span className="text-sm font-medium">Naver 로그인</span>
            </div>
          </a>

          {/* 카카오 */}
          <a
            href="/oauth2/authorization/kakao"
            className="w-full flex justify-center items-center py-3 bg-yellow-300 text-black rounded-lg hover:bg-yellow-400 transition-all"
          >
            <div className="flex items-center gap-2">
              <Image src="/icons/kakao.svg" alt="Kakao" className="w-5 h-5" width={20} height={20} />
              <span className="text-sm font-medium">Kakao 로그인</span>
            </div>
          </a>
        </div>


        {/* 하단 링크 */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-400">
            계정이 없으신가요?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              회원가입
            </button>
          </p>
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-400 hover:underline cursor-pointer"
          >
            메인페이지로 돌아가기
          </button>
        </div>
      </div>
    </div>
  )
}
