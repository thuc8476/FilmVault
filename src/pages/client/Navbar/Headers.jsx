import React, { useState } from 'react';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import Login from '../Navbar/Login';
import ForgetPassword from '../Navbar/ForgetPassword';
import Signing from '../Navbar/Signing'
import { useAuth } from "../../../context/AuthsProvider";
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai';
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
                    <button
                        className="md:hidden text-white focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <HiX className="h-8 w-8" /> : <HiOutlineMenu className="h-8 w-8" />}
                    </button>
                    <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none">
                        <img src="/images/logo.png" alt="FilmVault" className="h-10" />
                    </div>
                    <nav className="hidden md:flex space-x-8 justify-center">
                        <Link to={"/"} className="text-gray-300 hover:text-white transition duration-300">
                            Trang chủ
                        </Link>
                        <Link className="text-gray-300 hover:text-white transition duration-300 list-none">Kho Phim</Link>
                        <Link className="text-gray-300 hover:text-white transition duration-300 list-none">Phim Bộ</Link>
                        <Link className="text-gray-300 hover:text-white transition duration-300 list-none">Phim Thuê</Link>
                        <Link className="text-gray-300 hover:text-white transition duration-300 list-none">Blog</Link>
                        <Link to={"/Support"} className="text-gray-300 hover:text-white transition duration-300">
                            Hỗ Trợ
                        </Link>
                    </nav>
                    <div className='flex gap-3'>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search"
                            InputProps={{
                                className: "bg-black text-white rounded-md",
                                style: { color: "#fff" },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AiOutlineSearch style={{ color: "#ccc" }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            style={{ color: "#ccc" }}
                                        >
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            className="w-48 md:w-64"
                        />
                        <div className="relative">
                            {user ? (
                                <div className="flex items-center space-x-4">

                                    <div className="relative group">
                                        <img
                                            src={user.avatar || "/images/avatar.jpg"}
                                            alt={user.username}
                                            className="h-10 w-10 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                                        />
                                        <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                            <div className="p-2 border-b border-gray-200">
                                                <MenuItem className="font-semibold">{user.username}</MenuItem>
                                                <MenuItem>Profile</MenuItem>
                                                <MenuItem>My account</MenuItem>
                                                <MenuItem onClick={logout}>Logout</MenuItem>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setOpen(true)}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                                >
                                    Đăng Nhập
                                </button>
                            )}
                        </div>
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
