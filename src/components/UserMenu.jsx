import React from "react";
import { useAuth } from "../context/AuthsProvider";
import { Link } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import { MdAccountCircle, MdLibraryAdd, MdManageAccounts } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';

const UserMenu = () => {
    const { user, logout } = useAuth();

    return (
        <div className="relative group">
            <img
                src={user?.imgUrl || "/images/avatar.jpg"}
                alt={user?.username || 'User'}
                className="h-10 w-10 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
            />
            <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2 border-b border-gray-200">
                    <MenuItem className="font-semibold" > <MdAccountCircle className='mr-3' />{user.email}</MenuItem>
                    <MenuItem> <MdLibraryAdd className='mr-3' />Library</MenuItem>
                    <Link to={"/Accounts"}><MenuItem> <MdManageAccounts className='mr-3' />My account</MenuItem></Link>
                    <MenuItem onClick={logout}><IoLogOut className='mr-3' />Logout</MenuItem>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
