import React, { useState } from 'react';
import { menu } from '../../../utils/Constants';
import { IoMdMenu, } from "react-icons/io";
import { FaCaretRight, FaCaretDown, FaUsers, FaUser } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import { CgMenuGridR } from "react-icons/cg";
import { Link } from 'react-router-dom';

function Menu(props) {
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [isShrunk, setIsShrunk] = useState(false);

    const toggleMenu = (id) => {
        if (isShrunk) {
            setIsShrunk(false);
        }
        setExpandedMenu(prevId => (prevId === id ? null : id));
    };
    const toggleSidebar = () => {
        setIsShrunk(prev => {
            if (!prev) {
                setExpandedMenu(null);
            }
            return !prev
        });
    }
    return (
        <aside className={`bg-gray-100 transition-width duration-300 h-full`}>
            <div className={`flex ${isShrunk ? 'justify-center' : ''} items-center space-x-2 py-5 px-4 cursor-pointer`}>
                <button><IoMdMenu  className="text-xl text-green-500 " onClick={toggleSidebar} /></button>
                {!isShrunk && <h1 className="text-lg font-bold">FilmVault<span className="text-green-500">Admin</span></h1>}
            </div>
            <nav className={`md:block ${isShrunk ? "hidden" : ""}`}>
                <ul className='px-4'>
                    <Link to={"/"} className="flex items-center p-2 bg-green-500 rounded-lg shadow-sm hover:bg-green-600 mb-2 text-white" style={{ cursor: 'pointer' }}>
                        <LuMenuSquare />
                        {!isShrunk && <p className="ml-4 font-medium">Dashboard</p>}
                    </Link>
                    {!isShrunk && <li className="text-sm font-semibold text-gray-500 mt-4 uppercase tracking-wider">UI Elements</li>}
                    <Link to={"/categories/Categories"} className="flex items-center p-2 bg-green-500 rounded-lg shadow-sm hover:bg-green-600 mb-2 text-white" style={{ cursor: 'pointer' }}>
                        <CgMenuGridR />
                        {!isShrunk && <p className="ml-4">Categories</p>}
                    </Link>
                    {!isShrunk && <li className="text-sm font-semibold text-gray-500 mt-4 uppercase tracking-wider">Forms and Datas</li>}
                    {menu.map((item) => (
                        <li key={item.id} className="mb-2">
                            <div
                                className="flex items-center p-2 bg-green-500 rounded-lg shadow-sm hover:bg-green-600 cursor-pointer text-white"
                                onClick={() => toggleMenu(item.id)}
                            >
                                {item.icon}
                                {!isShrunk && <p className="ml-4">{item.title}</p>}
                                {!isShrunk && (expandedMenu === item.id ? (
                                    <FaCaretDown className="ml-auto" />
                                ) : (
                                    <FaCaretRight className="ml-auto" />
                                ))}
                            </div>
                            {expandedMenu === item.id && (
                                <ul className="ml-8 mt-2">
                                    {item.items.map((subItem) => (
                                        <Link to={subItem.path}
                                            key={subItem.id}
                                            className="flex items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                                        >  {subItem.icon}
                                            {!isShrunk && <p className="ml-4 text-gray-600">{subItem.title}</p>}
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    {!isShrunk && <li className="text-sm font-semibold text-gray-500 mt-4 uppercase tracking-wider">Pages</li>}
                    <Link to={"/uses_pages/UserPages"} className="flex items-center p-2 bg-green-500 rounded-lg shadow-sm hover:bg-green-600 mb-2 text-white" style={{ cursor: 'pointer' }}>
                        <FaUsers />
                        {!isShrunk && <p className="ml-4">User Pages</p>}
                    </Link>
                    {!isShrunk && <li className='text-sm font-semibold text-gray-500 mt-4 uppercase tracking-wider'>HELP</li>}
                    <Link to={"/profile/Profile"} className="flex items-center p-2 bg-green-500 rounded-lg shadow-sm hover:bg-green-600 text-white" style={{ cursor: 'pointer' }}>
                        <FaUser />
                        {!isShrunk && <p className="ml-4">Profile</p>}
                    </Link>
                </ul>
            </nav>
        </aside>

    );
}

export default Menu;