'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || '회원가입 실패')

      alert('회원가입 완료!')
      router.push('/login')
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
          <h1 className="text-3xl font-bold text-white">📝 회원가입</h1>
          <p className="text-sm text-gray-400 mt-2">JCodeLab에 오신 걸 환영합니다</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-3 focus-within:ring-2 ring-gray-500">
            <User className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent flex-1 outline-none text-white placeholder-gray-500"
            />
          </div>

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
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-3 font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 text-white hover:brightness-110 transition-all"
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </div>

        {/* 하단 링크 */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-400">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-blue-400 hover:underline"
            >
              로그인
            </button>
          </p>
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-400 hover:underline"
          >
            메인페이지로 돌아가기
          </button>
        </div>
      </div>
    </div>
  )
}
