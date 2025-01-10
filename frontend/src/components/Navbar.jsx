import React, { useEffect } from 'react';
import assets from '../assets/Alphericlogo.png';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { User2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/authSlice';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { Button } from './ui/button';
import logo_white from "../assets/logo-white.png"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth); // Access user from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if user exists and they're on the root path
    if (user && window.location.pathname === '/') {
      if (user.role === 'admin') {
        navigate('/admindash');
      } else if (user.role === 'employee') {
        navigate('/employeedash');
      }
    }
  }, [user, navigate]);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/userlogout`, {}, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null)); // Remove user data from Redux
        navigate("/"); // Redirect to the home page or login
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <nav className="font-mono bg-gradient-to-r from-indigo-500 via-purple-400 to-purple-600 text-white p-3 gap-x-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo_white} alt="Logo" className="w-10 h-auto mr-4" />
          <h1 className="text-2xl font-bold">assetflow</h1>
        </div>

        {/* Conditional Links Based on Role */}
        {user && user.role === 'admin' && (
          <div className="flex items-center gap-4">
            <Link to="/admindash" className="hover:text-yellow-400">Admin Dashboard</Link>
            <Link to="/admin/users" className="hover:text-yellow-400">Users</Link>
            <Link to="/admin/assets" className="hover:text-yellow-400">Assets</Link>
          </div>
        )}

        {user && user.role === 'employee' && (
          <div className="flex items-center gap-4">
            <Link to="/employeedash" className="hover:text-yellow-400">Employee Dashboard</Link>
            <Link to="/" className="hover:text-yellow-400">Home</Link>
            <Link to="/request-asset" className="hover:text-yellow-400">Assets</Link>
          </div>
        )}

        {/* Navbar Links */}
        <div className="flex space-x-6">
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-gray-800 bg-white">{user?.fullname}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white text-gray-800">
                <div className="flex gap-2 space-y-2">
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user.role === 'employee' && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Link to="/profile">
                        <Button variant="link">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="font-mono py-3 px-6 bg-purple-900 rounded-full text-white text-lg font-semibold shadow-lg hover:text-purple-900 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                variant="outline" 
                className="font-mono py-3 px-6 bg-white rounded-full text-purple-900 text-lg font-semibold shadow-lg hover:text-white hover:bg-purple-900">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



