import React, { useState } from 'react';
import { menu } from '../../../utils/Constants';
import { IoMdMenu, IoMdMail } from "react-icons/io";
import { FaSearch, FaBell, FaCaretRight, FaCaretDown, FaUsers, FaUser } from "react-icons/fa";
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
        <aside className={`bg-gray-100 transition-width duration-300  h-full`}>
            <div className={`flex ${isShrunk ? 'justify-center' : ''} items-center space-x-2 py-5 px-4 cursor-pointer`}>
                <button><IoMdMenu className="text-xl " onClick={toggleSidebar} /></button>
                {!isShrunk && <h1 className="text-lg font-bold">FilmVault<span className="text-green-500">Admin</span></h1>}
            </div>
            <nav className={`md:block ${isShrunk ? "hidden" : ""}`}>
                <ul className='px-4'>
                    <Link to={"/"} className="flex items-center p-2 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 mb-2" style={{ cursor: 'pointer' }}>
                        <LuMenuSquare className="" />
                        {!isShrunk && <p className="ml-4 font-medium text-green-500">Dashboard </p>}
                    </Link>
                    {!isShrunk && <li className="text-sm font-semibold text-gray-500 mt-4 uppercase tracking-wider">UI Elements</li>}
                    <li className="flex items-center p-2 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 mb-2" style={{ cursor: 'pointer' }}>
                        <CgMenuGridR className="text-gray-500" />
                        {!isShrunk && <p className="ml-4 text-gray-700">Categories</p>}
                        {!isShrunk && <FaCaretRight className=" ml-auto text-gray-500" />}
                    </li>
                    {!isShrunk && <li className="text-sm font-semibold text-gray-500 mt-4 uppercase tracking-wider">Forms and Datas</li>}
                    {menu.map((item) => (
                        <li key={item.id} className="mb-2">
                            <div
                                className="flex items-center p-2 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 cursor-pointer"
                                onClick={() => toggleMenu(item.id)}
                            >
                                {item.icon}
                                {!isShrunk && <p className="ml-4 text-gray-700">{item.title}</p>}
                                {!isShrunk && (expandedMenu === item.id ? (
                                    <FaCaretDown className="ml-auto text-gray-500" />
                                ) : (
                                    <FaCaretRight className="ml-auto text-gray-500" />
                                ))}

                            </div>
                            {expandedMenu === item.id && (
                                <ul className="ml-8 mt-2">
                                    {item.items.map((subItem) => (
                                        <Link to={subItem.path}
                                            key={subItem.id}
                                            className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                                        >
                                            {!isShrunk && <p className="ml-4 text-gray-600">{subItem.title}</p>}
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    {!isShrunk && <li className="text-sm font-semibold text-gray-500 mt-4 uppercase tracking-wider">Pages</li>}
                    <li className="flex items-center p-2 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 mb-2" style={{ cursor: 'pointer' }}>
                        <FaUsers className="text-gray-500" />
                        {!isShrunk && <p className="ml-4 text-gray-700" > User Pages </p>}
                        {!isShrunk && <FaCaretRight className=" ml-auto text-gray-500" />}
                    </li>
                    {!isShrunk && <li className='text-sm font-semibold text-gray-500 mt-4 uppercase tracking-wider"'>HELP</li>}
                    <li className="flex items-center p-2 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100" style={{ cursor: 'pointer' }}>
                        <FaUser className="text-gray-500" />
                        {!isShrunk && <p className="ml-4 text-gray-700"> Profile</p>}
                        {!isShrunk && <FaCaretRight className=" ml-auto text-gray-500" />}
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Menu;