// Import các thư viện cần thiết
import React,{ useContext,useEffect,useState} from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Button, Avatar } from '@mui/material';
import { useAuth } from "../../../context/AuthsProvider";
import { Link, Outlet, useLocation } from 'react-router-dom';
import { menuItems } from '../../../utils/Constants'
import { ProfileProvider } from '../../../context/ProfileProvider';
import { IconButton } from '@mui/material';
import { IoMdPhotos } from 'react-icons/io';

const Accounts = (users, setUsers) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [account, setAccount] = useState({
        id: "",
        imgUrl:"",
        fullName: "",
        username: "",
        email: "",
        gender: "",
        phone: "",
        password: ""
    });

    useEffect(() => {
      if (user) {
          setAccount(user);
      }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAccount({ ...account, imgUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
 console.log(location.pathname);
 
  return (
    <ProfileProvider value={{account,setAccount}}>
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="bg-blue-500 w-20 h-20">
            <img
              src={account.imgUrl || "/images/avatar.jpg"}
              alt={account.username}
              className="h-120 w-120 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
            />
          </Avatar>
          <label htmlFor="upload-photo">
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <IconButton color="primary" component="span">
                            <IoMdPhotos />
                        </IconButton>
                    </label>
          <p className="mt-2 text-sm">{account?.email}</p>
        </div>

        <nav className="flex flex-col space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-2 text-gray-600 ${location.pathname === `/Accounts/${item.path}` ? 'text-red-500' : 'text-black'}`}
              onClick={item.text === 'Logout' ? logout : null}
            >
              {item.icon}
              <span>{item.text}</span>
            </Link>
          ))}
        </nav>
      </div>
      <Outlet account={account} setAccount={setAccount} />
    </div>
    </ProfileProvider>
  );
};

export default Accounts;