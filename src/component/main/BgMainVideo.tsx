'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MainVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [showText, setShowText] = useState(true)

  const videoSources = [
    '/videos/bg-main.mp4',
    '/videos/bg-main5.mp4',
    '/videos/bg-main6.mp4',
  ]

  const texts = [
    { message: '세상을 바꿀 아이디어', position: 'left-1/4 text-left' },
    { message: '코드로 실현하다', position: 'left-1/2 -translate-x-1/2 text-center' },
    { message: '당신의 상상을', position: 'right-1/4 text-right' },
    { message: '현실로 연결합니다', position: 'left-1/2 -translate-x-1/2 text-center' },
    { message: 'JCodeLab이 이루겠습니다', position: 'left-1/2 -translate-x-1/2 text-center' },
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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      const nextIndex = (currentIndex + 1) % videoSources.length
      setCurrentIndex(nextIndex)
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [currentIndex])

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <video
        ref={videoRef}
        key={currentIndex}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover object-center"
      >
        <source src={videoSources[currentIndex]} type="video/mp4" />
        브라우저가 video 태그를 지원하지 않습니다.
      </video>

      {/* 애니메이션 텍스트 */}
      <AnimatePresence mode="wait">
        {showText && (
          <motion.div
            key={`text-${textIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2 }}
            className={`absolute top-1/3 w-full z-10 ${texts[textIndex].position} text-white text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg px-4`}
          >
            {texts[textIndex].message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainVideo
