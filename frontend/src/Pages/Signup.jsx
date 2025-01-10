import React, { useState, useEffect } from 'react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { RadioGroup } from '../components/ui/radio-group';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';


const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        role: ""
    });

    const { loading } = useSelector((store) => store.auth); // Select loading state from Redux
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
                // Backend responded with an error
                console.error("Error Response:", error.response.data);
                toast.error(error.response.data.message || "An error occurred while registering.");
            } else if (error.request) {
                // No response from backend
                console.error("Error Request:", error.request);
                toast.error("No response from server. Please check your network or try again later.");
            } else {
                // Any other errors
                console.error("Error Message:", error.message);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            dispatch(setLoading(false)); // Stop loading state
        }
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('authToken'); // Example check
        if (isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="johndoe@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="**********"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="employee"
                                    checked={input.role === 'employee'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Employee</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={input.role === 'admin'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Admin</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {loading ? (
                        <Button disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Signup
                        </Button>
                    )}
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;