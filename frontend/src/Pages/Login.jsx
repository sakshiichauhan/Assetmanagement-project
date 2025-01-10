import React, { useState } from "react";
import { setUser, setLoading } from "../redux/authSlice";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { RadioGroup } from "../components/ui/radio-group";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "employee", // Set a default role
  });
  const { loading } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      toast.error("All fields are required!");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/userlogin`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        const dashboardPath = input.role === "admin" ? "/admindash" : "/employeedash";
        navigate(dashboardPath); // Redirect based on role
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-purple-600">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mt-10"
      >
        <h1 className="font-bold text-3xl mb-8 text-center text-purple-700">Login</h1>
        
        {/* Email Field */}
        <div className="my-4">
          <Label htmlFor="email" className="text-lg text-gray-700">Email</Label>
          <Input
            id="email"
            type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="example@gmail.com"
            className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password Field */}
        <div className="my-4">
          <Label htmlFor="password" className="text-lg text-gray-700">Password</Label>
          <Input
            id="password"
            type="password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="**********"
            className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Role Selection */}
        <div className="my-6">
          <Label className="text-lg text-gray-700">Role</Label>
          <RadioGroup className="flex items-center gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <Input
                id="employee"
                type="radio"
                name="role"
                value="employee"
                checked={input.role === "employee"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="employee" className="text-sm">Employee</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                id="admin"
                type="radio"
                name="role"
                value="admin"
                checked={input.role === "admin"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="admin" className="text-sm">Admin</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Submit Button */}
        {loading ? (
          <Button disabled className="w-full flex items-center justify-center bg-purple-500 text-white p-3 rounded-md hover:bg-purple-600 transition duration-300">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </Button>
        ) : (
          <Button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition duration-300">
            Login
          </Button>
        )}

        {/* Signup Link */}
        <div className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
