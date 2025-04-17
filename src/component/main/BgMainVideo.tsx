'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MainVideo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [fade, setFade] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [showText, setShowText] = useState(true)

  const videoSources = [
    '/videos/bg-main.mp4',
    '/videos/bg-main5.mp4',
    '/videos/bg-main6.mp4',
  ]

  const texts = [
    {
      message: '세상을 바꿀 아이디어',
      position: 'text-center left-1/2 -translate-x-1/2 sm:left-1/4 sm:translate-x-0 sm:text-left',
    },
    {
      message: '코드로 실현하다',
      position: 'text-center left-1/2 -translate-x-1/2',
    },
    {
      message: '당신의 상상을',
      position: 'text-center left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-1/4 sm:text-right',
    },
    {
      message: '현실로 연결합니다',
      position: 'text-center left-1/2 -translate-x-1/2',
    },
    {
      message: 'JCodeLab이 이루겠습니다',
      position: 'text-center left-1/2 -translate-x-1/2',
    },
  ]

  useEffect(() => {
    if (textIndex >= texts.length - 1) return
    const timer = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < texts.length - 1) return prev + 1
        return prev
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [textIndex])

  useEffect(() => {
    if (textIndex === texts.length - 1) {
      const timer = setTimeout(() => {
        setShowText(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [textIndex])

  const handleVideoEnded = () => {
    setFade(true)
    setTimeout(() => {
      const next = (currentIndex + 1) % videoSources.length
      setCurrentIndex(next)
      setNextIndex((next + 1) % videoSources.length)
      setFade(false)
    }, 1000)
  }

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <video
        key={`video-${currentIndex}`}
        src={videoSources[currentIndex]}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className={`w-full h-full object-cover object-center absolute transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}
      />
      <video
        key={`video-next-${nextIndex}`}
        src={videoSources[nextIndex]}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover object-center absolute opacity-0 pointer-events-none"
      />

      {/* 텍스트 중앙 정렬 수정됨 */}
      <AnimatePresence mode="wait">
        {showText && (
          <motion.div
            key={`text-${textIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2 }}
            className={`absolute top-1/2 -translate-y-1/2 w-full z-10 ${texts[textIndex].position} text-white text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg px-4`}
          >
            {texts[textIndex].message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainVideo
