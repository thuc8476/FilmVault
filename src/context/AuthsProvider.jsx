import React, { createContext, useState, useContext, useEffect } from 'react';
import { ContextAccounts } from "../context/AccountProvider";
// Tạo Context để quản lý thông tin người dùng
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
// Component cung cấp thông tin người dùng
export const AuthsProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Trạng thái người dùng
    const accounts = useContext(ContextAccounts);
    const login = (userData) => {
        setUser(userData); // Lưu thông tin người dùng sau khi đăng nhập thành công
        localStorage.setItem('user', JSON.stringify(userData)); // Lưu vào localStorage
    };

    const logout = () => {
        setUser(null); // Đăng xuất
        localStorage.removeItem('user');
    };
    useEffect( () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const isLogin = accounts?.find((value) => value.id === parsedUser?.id);
                if (isLogin) {
                    login(isLogin);
                }
            } catch (error) {
                console.error('Lỗi khi phân tích dữ liệu user từ localStorage:', error);
            }
        }
    }, [accounts]);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};