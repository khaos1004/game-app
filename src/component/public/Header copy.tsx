import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <>
            <div className="flex h-[5rem] items-center w-full px-6 z-20">
                {/* 왼쪽: 로고 */}
                <div className="flex-1 flex justify-start items-center">
                    <Link href="/">
                        <span className="text-black shine-text text-2xl font-bold">
                            JCodeLab
                        </span>
                    </Link>
                </div>

                {/* 가운데: 검색창 */}
                <div className="flex-1 flex justify-center relative max-w-md w-full">
                    <input
                        type="text"
                        className="w-full border-gray-300 border rounded-3xl px-4 pr-10 py-2 text-white"
                        placeholder="게임을 검색해 보세요!"
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

                {/* 오른쪽: 메뉴 */}
                <div className="flex-1 flex justify-end items-center space-x-8 text-sm font-semibold">
                    <Link href="/gamelist" className="whitespace-nowrap hover:text-blue-500 cursor-pointer text-white">
                        게임목록
                    </Link>
                    <Link href="/contact" className="whitespace-nowrap hover:text-blue-500 cursor-pointer text-white">
                        문의하기
                    </Link>
                    <Link href="/companyintro" className="whitespace-nowrap hover:text-blue-500 cursor-pointer text-white">
                        회사소개
                    </Link>
                    <Link href="/login" className="whitespace-nowrap hover:text-blue-500 cursor-pointer text-white">
                        로그인
                    </Link>
                    <Link href="signup" className="whitespace-nowrap hover:text-blue-500 cursor-pointer text-white">
                        회원가입
                    </Link>
                    <Link href="/cart" className="whitespace-nowrap hover:text-blue-500 hover:animate-bounce">
                        <Image
                            src="/common/shopping_cart.svg"
                            alt="user shoppingCart"
                            width={25}
                            height={20}
                            className="cursor-pointer "
                        />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Header;
