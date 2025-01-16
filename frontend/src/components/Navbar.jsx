import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { User2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import axios from "axios";
import { Button } from "./ui/button";
import logo_white from "../assets/logo-white.png";
import {USER_API_END_POINT} from "../utils/constant";

 // Ensure you have the correct endpoint

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on user role
    if (user && window.location.pathname === "/") {
      if (user.role === "admin") {
        navigate("/admindash");
      } else if (user.role === "employee") {
        navigate("/employeedash");
      }
    }
  }, [user, navigate]);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/userlogout`, {}, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null)); // Clear user data from Redux
        navigate("/login"); // Redirect to login
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while logging out");
    }
  };

  return (
    <nav className="font-mono bg-gradient-to-r from-indigo-500 via-purple-400 to-purple-600 text-white p-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo_white} alt="Logo" className="w-10 h-auto mr-4" />
          <h1 className="text-2xl font-bold">AssetFlow</h1>
        </div>

        {/* Links Section */}
        <div className="flex items-center space-x-6">
          {user && user.role === "admin" && (
            <div className="flex items-center gap-4">
              <Link to="/admindash" className="hover:text-yellow-400">
                Admin Dashboard
              </Link>
              <Link to="/admin/users" className="hover:text-yellow-400">
                Users
              </Link>
              <Link to="/admin/assets" className="hover:text-yellow-400">
                Assets
              </Link>
            </div>
          )}

          {user && user.role === "employee" && (
            <div className="flex items-center gap-4">
              <Link to="/" className="hover:text-yellow-400">
                Home
              </Link>
              <Link to="/employeedash" className="hover:text-yellow-400">
                Employee Dashboard
              </Link>
              <Link to="/request-asset" className="hover:text-yellow-400">
                Assets
              </Link>
            </div>
          )}

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="py-2 px-4 text-white border-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="py-2 px-4 bg-white text-indigo-600 border-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-gray-800 bg-white">
                  {user?.fullname}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white text-gray-800">
                <div className="flex flex-col gap-2">
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio || "No bio available"}
                    </p>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user.role === "employee" && (
                      <div className="flex items-center gap-2">
                        <User2 />
                        <Link to="/profile">
                          <Button variant="link">View Profile</Button>
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
