'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, MessageSquare, FileText } from 'lucide-react'
import Header from '@/component/public/Header'
import Footer from '@/component/public/Footer'

export default function ContactPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setSuccess(false)
    if (!/^\d{6,}$/.test(password)) {
      setError('비밀번호는 숫자 6자리 이상이어야 합니다.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, title, content, password }),
      })

      if (!res.ok) throw new Error('문의 등록 실패')
      setSuccess(true)
      setName('')
      setEmail('')
      setTitle('')
      setContent('')
      setPassword('')
    } catch (e: any) {
      setError(e.message || '오류가 발생했습니다.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-gray-700 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">문의하기</h1>
            <p className="text-sm text-gray-400 mt-2">문의 내용을 남겨주시면 빠르게 답변 드리겠습니다.</p>
          </div>

          <div className="space-y-4">
            <InputField icon={<User />} value={name} setValue={setName} placeholder="이름" />
            <InputField icon={<Mail />} value={email} setValue={setEmail} placeholder="이메일" />
            <InputField icon={<FileText />} value={title} setValue={setTitle} placeholder="제목" />
            <div className="flex gap-2 bg-gray-800 rounded-lg px-4 py-3">
              <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
              <textarea
                placeholder="문의 내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="bg-transparent flex-1 outline-none text-white placeholder-gray-500 resize-none"
              />
            </div>
            <InputField
              icon={<Lock />}
              value={password}
              setValue={setPassword}
              placeholder="비밀번호 (숫자 6자리 이상)"
              type="password"
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-400 text-sm text-center">문의가 정상적으로 접수되었습니다.</p>}

            <button
              onClick={handleSubmit}
              className="w-full py-3 font-semibold rounded-lg bg-gradient-to-r from-teal-600 to-blue-500 text-white hover:brightness-110 transition-all"
            >
              문의 등록
            </button>

            <div className="text-center mt-4">
              <button
                onClick={() => router.push('/')}
                className="text-sm text-gray-400 hover:underline"
              >
                메인페이지로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function InputField({
  icon,
  value,
  setValue,
  placeholder,
  type = 'text',
}: {
  icon: React.ReactNode
  value: string
  setValue: (val: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-3 focus-within:ring-2 ring-gray-500">
      <div className="w-5 h-5 text-gray-400">{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-transparent flex-1 outline-none text-white placeholder-gray-500"
      />
    </div>
  )
}
