import React, { useState, useContext } from "react";
import { Modal, Box } from "@mui/material";
import { ContextAccounts } from "../../../../context/AccountProvider";
import { useAuth } from "../../../../context/AuthsProvider";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../../../../config/firebase";
import { ROLES } from '../../../../utils/Constants';
import { addDocument } from "../../../../services/firebaseService";
import { useNotification } from "../../../../context/NotificationProvider";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",borderRadius: "8px",boxShadow: 24,p: 4,width: "400px",
};
const intern = { usernameOrEmail: "", password: "" };
function Login({ open, setOpen,setSignup,setOpenForgetPassword, }) {
  const [account, setAccount] = useState(intern);
  const accounts = useContext(ContextAccounts);
  const showNotification = useNotification();
  const { login } = useAuth();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const existingCustomer = accounts.find(ac => ac.email === user.email);
      let loggedInCustomer;
      if (!existingCustomer) {
        const newCustomer = {
          username: user.displayName,
          imgUrl: user.photoURL,
          roleId: ROLES.USER,
          email: user.email
        };
        const newAccount = await addDocument('Accounts', newCustomer);
        loggedInCustomer = newAccount;
      } else {
        loggedInCustomer = existingCustomer;
      }
      login(loggedInCustomer);
      setOpen(false);
    } catch (error) {
      showNotification('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };
  const handleLogin = () => {
    const isLogin = accounts.find(
      (acc) =>
        (acc.email === account.usernameOrEmail ||
          acc.username === account.usernameOrEmail) &&
        acc.password === account.password
    );
    if (isLogin) {
      login(isLogin);
      setOpen(false);
    } else {
      alert("Thông tin đăng nhập không đúng!");
    }
  };
  const handleInput = (event) => {
    const { name, value } = event.target;
    setAccount({ ...account, [name]: value });
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={modalStyle}>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Đăng Nhập
        </h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên đăng nhập hoặc Email
            </label>
            <input
              type="text"
              name="usernameOrEmail"
              value={account.usernameOrEmail}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập hoặc email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={account.password}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="px-4 py-2 bg-[#FF5733] hover:bg-[#E64A2E] text-white rounded-md transition"
          >
            Đăng Nhập
          </button>
          <div className="flex items-center justify-between mt-4">
            <a onClick={() => {
              setOpen(false); // Đóng Login modal
              setOpenForgetPassword(true); // Mở ForgetPassword modal
            }} href="#" className="text-sm text-blue-500 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
        </form>
        <div className="my-4 text-center text-gray-500">Hoặc đăng nhập với</div>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={signInWithGoogle} className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
            <AiFillGoogleCircle className="w-5 h-5 mr-2" />
            Google
          </button>
          <button className="flex items-center px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900">
            <AiFillGithub className="w-5 h-5 mr-2" />
            GitHub
          </button>
        </div>
        <p className="mt-6 text-sm text-center text-gray-500">
          Chưa có tài khoản?{" "}
          <a onClick={() => {
            setOpen(false); // Đóng Login modal
            setSignup(true); // Mở Signup modal
          }} href="#" className="text-blue-500 hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </Box>
    </Modal>
  );
}
export default Login;
