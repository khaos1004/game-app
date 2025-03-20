import React from "react"
import { deflate } from "zlib";
import Image from "next/image";


const Header: React.FC = () => {
    return (
        <>
            <div className="flex m-[1rem]">
                <div className="relative text-2xl font-extrabold text-black tracking-wide uppercase">
                    <span className="absolute left-0 top-0 text-black">JCodeLab</span>
                </div>
            </div>
        </>
    );
}

export default Header;

