import React, { useState, useContext } from "react";
import { addDocument } from "../../../../services/firebaseService";
import { Modal, Box, CircularProgress } from "@mui/material";
import { ContextAccounts } from "../../../../context/AccountProvider";
import { useNotification } from "../../../../context/NotificationProvider";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { ROLES } from "../../../../utils/Constants";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  width: "400px",
};
const intern = { email: "", username: "", password: "", confirmPassWord: "", imgUrl: "",roleId: ROLES.USER };
function Signing({ signup, setSignup, setOpen }) {
  const [account, setAccount] = useState(intern);
  const [error, setError] = useState(intern);
  const [isLoading, setIsLoading] = useState(false);
  const accounts = useContext(ContextAccounts);
  const showNotification = useNotification();

  const validate = () => {
    const newErrors = {};

    if(!account.username.trim()){
      newErrors.username = "Tên đăng nhập là bắt buộc" ;
    }else 
     if(accounts?.some((acc) => acc.username === account.username)) {
      newErrors.username = "Tên đăng nhập đã tồn tại";
    }
    if(!account.email.trim()){
      newErrors.email = "Email là bắt buộc" ;
    }else 
     if(accounts?.some((acc) => acc.email === account.email)) {
      newErrors.email = "Tên đăng nhập đã tồn tại";
    }
    newErrors.password = account.password ? "" : "Mật khẩu là bắt buộc";
    newErrors.confirmPassWord =
      account.confirmPassWord === account.password
        ? ""
        : "Xác nhận mật khẩu không khớp";
   
    setError(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setIsLoading(true);
      const { confirmPassWord, ...accountData } = account;
      await addDocument("Accounts", accountData);
      showNotification("Tài khoản đã được đăng ký thành công!", "success");
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      showNotification("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setAccount({ ...account, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAccount({ ...account, imgUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setSignup(false);
    setAccount(intern);
    setError(intern);
  };
  console.log(error);
  
  return (
    <Modal open={signup} onClose={handleClose}>
      <Box sx={modalStyle}>
        <h2 className="text-2xl font-bold text-center text-gray-800">Đăng Ký</h2>
        <form className="mt-4">

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={account.email}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email"
            />
            {error.email && <p className="mt-1 text-sm text-red-500">{error.email}</p>}
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={account.username}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập"
            />
            {error.username && <p className="mt-1 text-sm text-red-500">{error.username}</p>}
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={account.password}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
            />
            {error.password && <p className="mt-1 text-sm text-red-500">{error.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassWord"
              value={account.confirmPassWord}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Xác nhận mật khẩu"
            />
            {error.confirmPassWord && <p className="mt-1 text-sm text-red-500">{error.confirmPassWord}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ảnh đại diện (Tùy chọn)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {account.imgUrl && (
              <div className="mt-2 flex justify-center">
                <img
                  src={account.imgUrl}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-full border-2 border-gray-300"
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex justify-center items-center px-4 py-2 bg-[#FF5733] hover:bg-[#E64A2E] text-white rounded-md transition"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Đăng Ký"}
          </button>
        </form>
        <div className="my-4 text-center text-gray-500">Hoặc đăng ký với</div>
        <div className="flex items-center justify-center space-x-4">
          <button className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
            <AiFillGoogleCircle className="w-5 h-5 mr-2" />
            Google
          </button>
          <button className="flex items-center px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900">
            <AiFillGithub className="w-5 h-5 mr-2" />
            GitHub
          </button>
        </div>
        <p className="mt-6 text-sm text-center text-gray-500">
          Đã có tài khoản?{" "}
          <a
            href="#"
            onClick={() => { setOpen(true); setSignup(false); }}
            className="text-blue-500 hover:underline"
          >
            Đăng Nhập
          </a>
        </p>
      </Box>
    </Modal>
  );
}

export default Signing;
