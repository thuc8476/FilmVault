import React from 'react';
import { IoMdMail } from "react-icons/io";
import { FaSearch, FaBell } from "react-icons/fa";
import AdminRouters from '../../../routes/AdminRouters';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function Main(props) {
    return (
        <main className="flex-1 bg-gray-50 py-5 px-8">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Good Morning, <span className="text-blue-500">John Doe</span></h1>
                    <p className="text-gray-500">Your performance summary this week</p>
                </div>
                <div className="flex items-center space-x-6">
                    <FaSearch className="text-xl" />
                    <IoMdMail className="text-xl" />
                    <FaBell className="text-xl" />
                    <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1729432535858-d47688481a79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D" />
                </div>
            </header>
            <AdminRouters/>
        </main>
    );
}

export default Main;