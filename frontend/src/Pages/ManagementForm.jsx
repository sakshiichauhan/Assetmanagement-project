import React, { useState } from 'react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';
 
const MaintenanceRequestForm = () => {
    const [input, setInput] = useState({
        asset: "",
        details: "",
        maintenanceType: "",
        scheduledDate: new Date(),
        status: "Pending",
    });
 
    const { loading } = useSelector((store) => store.auth); // Select loading state from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
 
    const submitHandler = async (e) => {
        e.preventDefault();
 
        // Check if required fields are provided
        if (!input.asset || !input.maintenanceType || !input.details) {
            return toast.error("Please fill in all the required fields.");
        }
 
        try {
            dispatch(setLoading(true)); // Start loading state
 
            // Simulate successful form submission (without actual backend call)
            setTimeout(() => {
                const requestData = {
                    asset: input.asset,
                    details: input.details,
                    maintenanceType: input.maintenanceType,
                    scheduledDate: input.scheduledDate,
                    status: input.status,
                };
 
                console.log("Maintenance request data:", requestData); // Log the request data to the console
 
                toast.success("Request successfully submitted!"); // Show success notification
                navigate("/maintenance-request-success"); // Redirect after successful submission
            }, 1000); // Simulate a 1-second delay
 
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            dispatch(setLoading(false)); // Stop loading state
        }
    };
 
    return (
        <div className="font-mono min-h-screen bg-gradient-to-r from-indigo-500 via-purple-400 to-purple-600 flex items-center justify-center">
            <form onSubmit={submitHandler} className="w-full sm:w-96 bg-white p-6 rounded-md shadow-lg space-y-4">
                <h1 className="font-bold text-xl text-center text-gray-800 mb-5">Maintenance Request</h1>
 
                {/* Asset Field */}
                <div className="my-2">
                    <Label>Asset</Label>
                    <Input
                        type="text"
                        value={input.asset}
                        name="asset"
                        onChange={changeEventHandler}
                        placeholder="Enter asset name"
                    />
                </div>
 
                {/* Details Field */}
                <div className="my-2">
                    <Label>Details</Label>
                    <Input
                        type="text"
                        value={input.details}
                        name="details"
                        onChange={changeEventHandler}
                        placeholder="Provide details about the maintenance"
                    />
                </div>
 
                {/* Maintenance Type Field (changed to text input) */}
                <div className="my-2">
                    <Label>Maintenance Type</Label>
                    <Input
                        type="text"
                        value={input.maintenanceType}
                        name="maintenanceType"
                        onChange={changeEventHandler}
                        placeholder="Enter maintenance type (e.g., Repair, Upgrade)"
                    />
                </div>
 
                {/* Scheduled Date Field */}
                <div className="my-2">
                    <Label>Scheduled Date</Label>
                    <Input
                        type="date"
                        value={input.scheduledDate}
                        name="scheduledDate"
                        onChange={changeEventHandler}
                    />
                </div>
 
                {/* Status Field */}
                <div className="my-2">
                    <Label>Status</Label>
                    <Input
                        type="text"
                        value={input.status}
                        name="status"
                        onChange={changeEventHandler}
                        placeholder="Current status (e.g. Pending)"
                    />
                </div>
 
                {/* Submit Button */}
                {loading ? (
                    <Button disabled>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="w-full my-4">
                        Submit Request
                    </Button>
                )}
                <span className='text-sm'>Want to view maintenance requests? <Link to="/view-maintenance-requests" className='text-blue-600'>View Requests</Link></span>
            </form>
        </div>
    );
};
 
export default MaintenanceRequestForm;