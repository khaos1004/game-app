import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-white px-4 py-4 rounded-t-2xl opacity-90 z-20 flex justify-center items-center text-center sm:px-2">
      <div className="w-full max-w-screen-xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 md:gap-16 text-xs text-black justify-center">
        <div>
          <h3 className="font-bold mb-2">카테고리별</h3>
          <ul className="space-y-1 cursor-no-drop">
            <li className="hover:text-blue-500">IOS</li>
            <li className="hover:text-blue-500">Android</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">라이선스</h3>
          <ul className="space-y-1 cursor-no-drop">
            <li className="hover:text-blue-500">라이선스</li>
            <li className="hover:text-blue-500">관리</li>
            <li className="hover:text-blue-500">지원</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">서비스 약관</h3>
          <ul className="space-y-1 cursor-no-drop">
            <li className="hover:text-blue-500">서비스 약관</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">JCodeLab 소개</h3>
          <ul className="space-y-1 cursor-pointer">
            <li className="hover:text-blue-500"><Link href="/companyintro">회사소개</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
