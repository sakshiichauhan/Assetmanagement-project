import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"; // For notifications
import asset from "../assets/animate.svg";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant"; // Assuming this constant contains the base URL for your API

const LoginPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading,user } = useSelector((store) => store.auth); // Access Redux store

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      toast.error("Both email and password are required!");
      return;
    }

    try {
      dispatch(setLoading(true)); // Start loading state
      const res = await axios.post(`${USER_API_END_POINT}/userlogin`,input,{
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // For cross-origin cookies
        }
      );

      
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);

        // Navigate based on role
        const dashboardPath = res.data.user.role === "admin" ? "/admindash" : "/employeedash";
        navigate(dashboardPath);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      const dashboardPath = user.role === "admin" ? "/admindash" : "/employeedash";
      navigate(dashboardPath);
    }
  }, [user, navigate]);

  return (
    <div className="font-mono relative grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700">
      {/* Image Section */}
      <div className="relative hidden md:block">
        <img src={asset} alt="Asset" className="w-full h-full object-cover rounded-2xl" />
        <div className="absolute inset-0 bg-black opacity-10 rounded-2xl"></div>
      </div>

      <div className="flex justify-center items-center py-10">
        {/* Login Form Section */}
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-center items-center md:items-start px-6 md:px-16 py-8 bg-opacity-80 rounded-lg w-full max-w-lg md:max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Login</h1>

          {/* Email Input */}
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-lg font-semibold mb-2 text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 w-full">
            <label htmlFor="password" className="block text-lg font-semibold mb-2 text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>
           {/* Radio buttons for Role selection */}
           <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="employee"
                                name="role"
                                value="employee"
                                checked={input.role === 'employee'}
                                onChange={changeEventHandler}
                                className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="employee" className="text-white">Employee</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="admin"
                                name="role"
                                value="admin"
                                checked={input.role === 'admin'}
                                onChange={changeEventHandler}
                                className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="admin" className="text-white">Admin</label>
                        </div>
                    </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-900 rounded-full text-white text-lg font-semibold shadow-lg hover:text-purple-900 hover:bg-white transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Sign-up Link */}
          <div className="mt-4 text-center">
            <p className="text-white">
              Don't have an account yet?{" "}
              <Link to="/signup">
                <span className="text-purple-300 font-semibold cursor-pointer hover:underline">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
