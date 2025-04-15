'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

type Props = {
    onSearch?: (value: string) => void
}

const Header: React.FC<Props> = ({ onSearch }) => {
    const pathname = usePathname()
    const showSearch = pathname === '/gamelist'
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="flex flex-wrap items-center w-full p-4 sm:px-6 z-999 overflow-y-hidden">
            {/* 왼쪽: 로고 */}
            <div className="flex-1 flex justify-start items-center">
                <Link href="/">
                    <span className="text-black shine-text text-2xl font-bold">JCodeLab</span>
                </Link>
            </div>

            {/* 가운데: 검색창 (모바일 숨김, md 이상에서만 보임) */}
            {showSearch && (
                <div className="hidden md:flex flex-1 justify-center relative max-w-md w-full mt-2 md:mt-0">
                    <input
                        type="text"
                        onChange={(e) => onSearch?.(e.target.value)}
                        className="w-full border-gray-300 border rounded-3xl px-4 pr-10 py-2 text-white bg-black"
                        placeholder="제품을 검색해 보세요!"
                    />
                    <button>
                        <Image
                            src="/common/search.svg"
                            alt="Search"
                            width={20}
                            height={20}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:w-[1.2rem]"
                        />
                    </button>
                </div>
            )}

            {/* 오른쪽: 메뉴 (모바일에선 가로스크롤 허용) */}
            <div className="hidden flex-1 md:flex justify-end items-center gap-8 text-sm font-semibold overflow-x-auto whitespace-nowrap">
                <Link href="/gamelist" className="hover:text-blue-500 text-white">
                    제품목록
                </Link>
                <Link href="/contact" className="hover:text-blue-500 text-white">
                    문의하기
                </Link>
                <Link href="/companyintro" className="hover:text-blue-500 text-white">
                    회사소개
                </Link>
                <Link href="/login" className="hover:text-blue-500 text-white">
                    로그인
                </Link>
                <Link href="/signup" className="hover:text-blue-500 text-white">
                    회원가입
                </Link>
                <Link href="/cart">
                    <Image
                        src="/common/shopping_cart.svg"
                        alt="user shoppingCart"
                        width={25}
                        height={20}
                        className="cursor-pointer hover:animate-bounce"
                    />
                </Link>
            </div>
            
            {/* 모바일 메뉴 토글 버튼 */}
            <button
                className="md:hidden text-white"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="toggle menu"
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {/* 모바일 메뉴 드롭다운 */}
            {menuOpen && (
                <div className="w-full flex flex-col gap-4 text-sm font-semibold text-white md:hidden bg-gray-900 p-4 rounded-xl shadow-lg mt-4 sm:opacity-90">
                    <Link href="/gamelist" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">제품목록</Link>
                    <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">문의하기</Link>
                    <Link href="/companyintro" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">회사소개</Link>
                    <Link href="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">로그인</Link>
                    <Link href="/signup" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">회원가입</Link>
                    <Link href="/cart" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 flex items-center gap-2">장바구니</Link>
                </div>
            )}
        </div>
    )
}

export default Header
