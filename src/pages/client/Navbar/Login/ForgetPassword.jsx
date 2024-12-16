import React, { useState, useContext } from "react";
import { Modal, Box, CircularProgress } from "@mui/material";
import { ContextAccounts } from "../../../../context/AccountProvider";
import { useNotification } from "../../../../context/NotificationProvider";

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

function ForgetPassword({ open, setOpen, setOpenForgetPassword }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const showNotification = useNotification();
    const accounts = useContext(ContextAccounts);
    const checkEmailExists = (email) => {
        if (!accounts) return false;
        return accounts.some((account) => account.email === email);
    };
    const validate = () => {
        if (!email) {
            setError("Email là bắt buộc");
            return false;
        }
        const emailExists = accounts?.some((acc) => acc.email === email);
        if (!emailExists) {
            setError("Email không tồn tại trong hệ thống");
            return false;
        }
        setError("");
        return true;
    };
    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            setIsLoading(true); // 🟢 Bắt đầu loading
            // 🔥 Giả lập yêu cầu gửi lại mật khẩu (ở đây bạn có thể thêm API gọi Firebase hoặc logic khác)
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Mô phỏng thời gian chờ 2 giây
            showNotification("Yêu cầu đặt lại mật khẩu đã được gửi thành công!", "success"); // 🟢 Thông báo thành công
            handleClose();
        } catch (error) {
            console.error("Error:", error);
            showNotification("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.", "error"); // 🟢 Thông báo lỗi
        } finally {
            setIsLoading(false); // 🟢 Kết thúc loading
        }
    };
    // Đóng modal và đặt lại dữ liệu
    const handleClose = () => {
        setOpen(false);
        setEmail('');
        setError('');
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Quên Mật Khẩu
                </h2>
                <p className="mt-2 text-sm text-center text-gray-500">
                    Nhập địa chỉ email của bạn để nhận liên kết khôi phục mật khẩu.
                </p>
                <form className="mt-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none 
                            ${error ? 'border-red-500' : 'border-gray-300'} 
                            focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            placeholder="Nhập địa chỉ email của bạn"
                        />
                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full flex justify-center items-center px-4 py-2 bg-[#FF5733] hover:bg-[#E64A2E] text-white rounded-md transition"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Gửi Yêu Cầu'}
                    </button>
                    <p className="mt-6 text-sm text-center text-gray-500">
                        Quay lại {" "}
                        <button
                            onClick={() => {
                                setOpen(true);
                                setOpenForgetPassword(false);
                            }}
                            className="px-4 py-2 bg-[#FF5733] hover:bg-[#E64A2E] text-white rounded-md transition"
                        >
                            Đăng Nhập
                        </button>
                    </p>
                </form>
            </Box>
        </Modal>
    );
}

export default ForgetPassword;
