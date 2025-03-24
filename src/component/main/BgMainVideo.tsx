'use client'
import { useRef, useEffect, useState } from 'react'

const MainVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const videoSources = [
    '/videos/bg-main.mp4',
    '/videos/bg-main2.mp4', // 두 번째 영상
  ]

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
    <div className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        key={currentIndex} // key 바뀌면 video 태그 리렌더됨
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src={videoSources[currentIndex]} type="video/mp4" />
        브라우저가 video 태그를 지원하지 않습니다.
      </video>

      <div className="relative z-10 text-white text-center pt-32">
        <h1 className="text-4xl font-bold">JCodeLab에 오신 걸 환영합니다</h1>
      </div>
    </div>
  )
}

export default MainVideo
