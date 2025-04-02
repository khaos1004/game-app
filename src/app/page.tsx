'use client'
import { useState, useEffect } from 'react'
import Header from '@/component/public/Header'
import Footer from '@/component/public/Footer'
import BgMainVideo from '@/component/main/BgMainVideo'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  const [showEnter, setShowEnter] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnter(true)
    }, 17000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <BgMainVideo />

      <div className="w-full z-20 relative">
        <Header />
      </div>

      <main className="flex-grow relative z-10 flex items-center justify-center px-4 py-8">
        {showEnter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <Link href="/gamelist">
              <button className="px-6 py-3 text-base sm:text-lg md:text-xl rounded-full font-semibold text-white bg-gradient-to-r from-gray-400 to-gray-300 shadow-lg hover:brightness-200 hover:text-black transition">
                JCodeLab 입장
              </button>
            </Link>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
