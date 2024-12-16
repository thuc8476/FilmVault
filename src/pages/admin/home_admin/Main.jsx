import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { FaSearch, FaBell } from "react-icons/fa";
import AdminRouters from "../../../routes/AdminRouters";
import Login from "../../../pages/client/Navbar/Login/Login";
import ForgetPassword from "../../../pages/client/Navbar/Login/ForgetPassword";
import Signing from "../../../pages/client/Navbar/Login/Signing";
import UserMenu from "../../../components/UserMenu";
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
    const [open, setOpen] = useState(false);
    const [signup, setSignup] = useState(false);
    const [openForgetPassword, setOpenForgetPassword] = useState(false);
    return (
        <>
            <Login open={open} setSignup={setSignup} setOpen={setOpen} setOpenForgetPassword={setOpenForgetPassword} />
            <ForgetPassword open={openForgetPassword} setOpen={setOpen} setOpenForgetPassword={setOpenForgetPassword} />
            <Signing signup={signup} setSignup={setSignup} setOpen={setOpen} />
            <main className="flex-1 bg-gray-50 py-5 px-8">
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Good Morning!</h1>
                        <p className="text-gray-500">Your performance summary this week</p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <FaSearch className="text-xl" />
                        <IoMdMail className="text-xl" />
                        <FaBell className="text-xl" />
                        <UserMenu />
                    </div>
                </header>
                <AdminRouters />
            </main>
        </>
    );
};

export default Main;