import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-white px-4 sm:px-8 py-6 rounded-t-2xl opacity-90 z-20 flex justify-center items-center text-center">
      <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 md:gap-24 text-sm text-black justify-center bg-center">
        <div>
          <h3 className="font-bold mb-3">카테고리별</h3>
          <ul className="space-y-1 cursor-no-drop">
            <li className="hover:text-blue-500">IOS</li>
            <li className="hover:text-blue-500">Android</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">라이선스</h3>
          <ul className="space-y-1 cursor-no-drop">
            <li className="hover:text-blue-500">라이선스</li>
            <li className="hover:text-blue-500">관리</li>
            <li className="hover:text-blue-500">지원</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">서비스 약관</h3>
          <ul className="space-y-1 cursor-no-drop">
            <li className="hover:text-blue-500">서비스 약관</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">JCodeLab 소개</h3>
          <ul className="space-y-1 cursor-pointer">
            <li className="hover:text-blue-500"><Link href="/companyintro">회사소개</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
