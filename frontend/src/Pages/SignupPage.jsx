import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';
import asset from "../assets/animate.svg"

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        role: ""
    });

    const { loading,user } = useSelector((store) => store.auth); // Select loading state from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.role) {
            return toast.error("Please select a role.");
        }

        try {
            dispatch(setLoading(true)); // Start loading state
            const res = await axios.post(`${USER_API_END_POINT}/userregister/`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // Ensures cookies are sent for cross-origin requests
            });

            if (res.data.success) {
                console.log("Form Data Submitted:", input);
                toast.success(res.data.message); // Show success notification
                navigate("/login");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                console.error("Error Response:", error.response.data);
                toast.error(error.response.data.message || "An error occurred while registering.");
            } else if (error.request) {
                console.error("Error Request:", error.request);
                toast.error("No response from server. Please check your network or try again later.");
            } else {
                console.error("Error Message:", error.message);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            dispatch(setLoading(false)); // Stop loading state
        }
    };
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    
    return (
        <div className="font-mono relative grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700">
            {/* Image Section */}
            <div className="relative hidden md:block">
                <img src={asset} alt="Asset" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-black opacity-10 rounded-2xl"></div>
            </div>

            <div className="flex justify-center items-center py-10">
                <form onSubmit={submitHandler} className="flex flex-col justify-center items-center md:items-start px-6 md:px-16 py-8 bg-opacity-80 rounded-lg w-full max-w-lg md:max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Sign Up</h1>
                    <div className="mb-4 w-full">
                        <label htmlFor="fullname" className="block text-lg font-semibold mb-2 text-white">Full Name</label>
                        <input
                            type="text"
                            id="fullname"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="email" className="block text-lg font-semibold mb-2 text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6 w-full">
                        <label htmlFor="password" className="block text-lg font-semibold mb-2 text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={input.password}
                            name="password"
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
                    {loading ? (
                        <button
                            type="button"
                            className="w-full py-3 bg-purple-900 rounded-full text-white text-lg font-semibold shadow-lg"
                            disabled
                        >
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full py-3 bg-purple-900 rounded-full text-white text-lg font-semibold shadow-lg hover:text-purple-900 hover:bg-white transition duration-300"
                        >
                            Signup
                        </button>
                    )}

                    <div className="mt-4 text-center">
                        <p className="text-white">
                            Already have an account?{" "}
                            <Link to="/login" className="text-purple-300 font-semibold cursor-pointer hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
