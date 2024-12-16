import React, { useState } from 'react';
import Login from '../.../../Navbar/Login/Login';
import ForgetPassword from '../.../../Navbar/Login/ForgetPassword';
import Signing from '../.../../Navbar/Login/Signing';
import MenuItem from '@mui/material/MenuItem';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { useAuth } from "../../../context/AuthsProvider";
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdAccountCircle } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import UserMenu from "../../../components/UserMenu";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [signup, setSignup] = useState(false);
    const [openForgetPassword, setOpenForgetPassword] = useState(false);

    return (
        <>
            <Login open={open} setSignup={setSignup} setOpen={setOpen} setOpenForgetPassword={setOpenForgetPassword} />
            <ForgetPassword open={openForgetPassword} setOpen={setOpen} setOpenForgetPassword={setOpenForgetPassword} />
            <Signing signup={signup} setSignup={setSignup} setOpen={setOpen} />
            <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-md">
                <div className="container mx-auto flex items-center justify-between py-4 px-6 relative">
                    <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <HiX className="h-8 w-8" /> : <HiOutlineMenu className="h-8 w-8" />}
                    </button>
                    <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none flex items-center">
                        <img src="/images/logo.png" alt="FilmVault" className="h-10" />
                        <nav className="hidden md:flex space-x-8 justify-center ml-3">
                            <Link to={"/"} className="text-gray-300 hover:text-white transition duration-300">Trang chủ</Link>
                            <Link to={"/LatestMovies"} className="text-gray-300 hover:text-white transition duration-300">Kho Phim</Link>
                            <Link to={"/LatestTVShows"} className="text-gray-300 hover:text-white transition duration-300">Phim Bộ</Link>
                            <Link to={"/MovieRental"} className="text-gray-300 hover:text-white transition duration-300">Phim Thuê</Link>
                            <Link to={"/Blog"} className="text-gray-300 hover:text-white transition duration-300">Blog</Link>
                            <Link to={"/Support"} className="text-gray-300 hover:text-white transition duration-300">Hỗ Trợ</Link>
                        </nav>
                    </div>

                    <div className="flex gap-3 items-center">
                        {/* Search Icon */}
                        <IconButton>
                            <AiOutlineSearch style={{ color: "#fff" }} className="h-6 w-6" />
                        </IconButton>
                        {/* Subscription Button */}
                        <button
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                        >
                            Chọn Gói Đăng Ký
                        </button>
                        {user ? (
                            <UserMenu />
                        ) : (
                            <button
                                onClick={() => setOpen(true)}
                                className="px-4 py-2 bg-[#FF5733] hover:bg-[#E64A2E] text-white rounded-md transition"
                            >
                                Đăng Nhập
                            </button>
                        )}
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden bg-black text-white py-4 space-y-2 text-center">
                        <li href="#" className="block px-4 py-2 hover:bg-gray-700">Trang chủ</li>
                        <li href="#" className="block px-4 py-2 hover:bg-gray-700">Kho Phim</li>
                        <li href="#" className="block px-4 py-2 hover:bg-gray-700">Phim Bộ</li>
                        <li href="#" className="block px-4 py-2 hover:bg-gray-700">Phim Thuê</li>
                        <li href="#" className="block px-4 py-2 hover:bg-gray-700">Blog</li>
                        <li href="#" className="block px-4 py-2 hover:bg-gray-700">Hỗ Trợ</li>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
