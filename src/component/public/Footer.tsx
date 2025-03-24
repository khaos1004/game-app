import React from 'react';
import Image from 'next/image';
import MaskedVideo from '../main/MaskedVideo';

const Footer: React.FC = () => {
    return (
        <>
            <footer className="bg-gray-200 text-white px-8 py-4 rounded-t-2xl opacity-90">
                <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12 text-sm text-black">
                    <div>
                        <h3 className="font-bold mb-3 ">카테고리별</h3>
                        <ul className="space-y-1 cursor-pointer ">
                            <li className='hover:text-blue-500'>IOS</li>
                            <li className='hover:text-blue-500'>Android</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">라이선스</h3>
                        <ul className="space-y-1 cursor-pointer">
                            <li className='hover:text-blue-500'>라이선스</li>
                            <li className='hover:text-blue-500'>관리</li>
                            <li className='hover:text-blue-500'>지원</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">서비스 약관</h3>
                        <ul className="space-y-1 cursor-pointer ">
                            <li className='hover:text-blue-500'>서비스 약관</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">JcodeLab 소개</h3>
                        <ul className="space-y-1 cursor-pointer ">
                            <li className='hover:text-blue-500'>회사소개</li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center justify-center group relative mt-8 ">                    
                    <div className="font-bold text-2xl text-black">
                        JCodeLab
                    </div>                  
                </div>

            </footer>

        </>
    );
};


export default Footer;
