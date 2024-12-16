import './App.css';
import AdminDashboard from './pages/admin/home_admin/AdminDashboard';
import Home from './pages/client/Home/Home';
import React from 'react';
import { useAuth } from "./context/AuthsProvider";
const App = () => {
  const { user } = useAuth();

  return user?.roleId === "admin" ? <AdminDashboard /> : <Home />;
};

export default App;
