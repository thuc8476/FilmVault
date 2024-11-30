import React, { useState } from 'react';
import { HiOutlineMenu, HiX } from 'react-icons/hi';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="bg-black text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                <button
                    className="md:hidden border-white focus:outline-none mr-4"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (<HiX className="h-8 w-8" />) : (<HiOutlineMenu className="h-8 w-8"/>)}
                </button>

                <div className="flex items-center">
                    <span className="ml-2 text-lg font-bold">Galaxy Play</span>
                </div>
                <nav className="hidden md:flex space-x-6">
                    <ul className="flex space-x-6">
                        <li className="text-gray-500 hover:text-white transition-colors duration-300">Trang chủ</li>
                        <li className="text-gray-500 hover:text-white transition-colors duration-300">Kho Phim</li>
                        <li className="text-gray-500 hover:text-white transition-colors duration-300">Phim Điện Ảnh</li>
                        <li className="text-gray-500 hover:text-white transition-colors duration-300">Phim Bộ</li>
                        <li className="text-gray-500 hover:text-white transition-colors duration-300">Phim Thuê</li>
                        <li className="text-gray-500 hover:text-white transition-colors duration-300">Khuyến Mãi</li>
                        <li className="text-gray-500 hover:text-white transition-colors duration-300">Blog</li>
                        <li className="text-gray-500 hover:text-white transition-colors duration-300">Hỗ Trợ</li>
                    </ul>
                </nav>
                <button className="px-4 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black hover:border-black">
                    Đăng Nhập
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-black text-white text-center">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Trang chủ</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Kho Phim</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Phim Điện Ảnh</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Phim Bộ</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Phim Thuê</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Khuyến Mãi</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Blog</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Hỗ Trợ</a>
                </div>
            )}
        </header>
    );
};
export default Header;
