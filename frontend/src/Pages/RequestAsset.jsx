// import React, { useState } from 'react';
// import { Label } from '../components/ui/label';
// import { Input } from '../components/ui/input';
// import { RadioGroup } from '../components/ui/radio-group';
// import { Button } from '../components/ui/button';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading } from '../redux/authSlice';
// import { Loader2 } from 'lucide-react';
// import axios from "axios";

// const AssetRequestForm = () => {
//     const [input, setInput] = useState({
//         employee: "",
//         assetCategory: "",
//         assetDescription: "",
//         specifications: "",
//         reason: "",
//         priorityLevel: "",
//         requiredByDate: "",
//         status: "",
//         requestDate: "",
//         assetName: "",
//         assetType: "",
//     });

//     const { loading } = useSelector((store) => store.auth); // Fetch loading state from Redux
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Handle input change
//     const changeEventHandler = (e) => {
//         const { name, value } = e.target;
//         setInput((prevInput) => ({
//             ...prevInput,
//             [name]: value,
//         }));
//     };

//     // Submit form handler
//     const submitHandler = async (e) => {
//         e.preventDefault();

//         if (!input.assetType || !input.priorityLevel || !input.employee || !input.assetCategory) {
//             return toast.error("Please fill in all the required fields.");
//         }

//         if (new Date(input.requiredByDate) < new Date()) {
//             return toast.error("The required by date must be in the future.");
//         }

//         try {
//             dispatch(setLoading(true));

//             const requestData = { ...input };

//             const response = await axios.post(
//                 "http://localhost:3030/api/createreq", // Replace with actual backend URL
//                 requestData
//             );

//             toast.success("Request successfully submitted!");
//             navigate("/request-success");
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             toast.error(error.response?.data?.error || "An unexpected error occurred. Please try again.");
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-400 to-purple-600 flex items-center justify-center">
//             <form onSubmit={submitHandler} className="w-full sm:w-96 bg-white p-8 rounded-xl shadow-xl space-y-6">
//                 <h1 className="font-extrabold text-2xl text-center text-gray-800 mb-6">Design Asset Request</h1>

//           <div className='flex '>
//                   {/* Employee Field */}
//                   <div className="my-4">
//                     <Label className="text-lg">Employee</Label>
//                     <Input
//                         type="text"
//                         value={input.employee}
//                         name="employee"
//                         onChange={changeEventHandler}
//                         placeholder="Enter employee name"
//                         className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>

//                 {/* Asset Category Field */}
//                 <div className="my-4">
//                     <Label className="text-lg">Asset Category</Label>
//                     <Input
//                         type="text"
//                         value={input.assetCategory}
//                         name="assetCategory"
//                         onChange={changeEventHandler}
//                         placeholder="Enter asset category"
//                         className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>
//           </div>

//                 <div className='flex'>
//                     {/* Asset Description Field */}
//                 <div className="my-4">
//                     <Label className="text-lg">Asset Description</Label>
//                     <Input
//                         type="text"
//                         value={input.assetDescription}
//                         name="assetDescription"
//                         onChange={changeEventHandler}
//                         placeholder="Describe the asset"
//                         className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>

//                 {/* Specifications Field */}
//                 <div className="my-4">
//                     <Label className="text-lg">Specifications</Label>
//                     <Input
//                         type="text"
//                         value={input.specifications}
//                         name="specifications"
//                         onChange={changeEventHandler}
//                         placeholder="Enter specifications"
//                         className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>
//                 </div>

//                 {/* Reason Field */}
//                 <div className="my-4">
//                     <Label className="text-lg">Reason</Label>
//                     <Input
//                         type="text"
//                         value={input.reason}
//                         name="reason"
//                         onChange={changeEventHandler}
//                         placeholder="Enter reason for the request"
//                         className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>

//                 {/* Priority Level Field */}
//                 <div className="my-4">
//                     <Label className="text-lg">Priority Level</Label>
//                     <RadioGroup className="flex items-center gap-4 my-5">
//                         <div className="flex items-center space-x-2">
//                             <Input
//                                 type="radio"
//                                 name="priorityLevel"
//                                 value="low"
//                                 checked={input.priorityLevel === 'low'}
//                                 onChange={changeEventHandler}
//                                 className="cursor-pointer"
//                             />
//                             <Label htmlFor="low" className="text-lg">Low</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <Input
//                                 type="radio"
//                                 name="priorityLevel"
//                                 value="medium"
//                                 checked={input.priorityLevel === 'medium'}
//                                 onChange={changeEventHandler}
//                                 className="cursor-pointer"
//                             />
//                             <Label htmlFor="medium" className="text-lg">Medium</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <Input
//                                 type="radio"
//                                 name="priorityLevel"
//                                 value="high"
//                                 checked={input.priorityLevel === 'high'}
//                                 onChange={changeEventHandler}
//                                 className="cursor-pointer"
//                             />
//                             <Label htmlFor="high" className="text-lg">High</Label>
//                         </div>
//                     </RadioGroup>
//                 </div>

//                <div className='flex'>
//                  {/* Required By Date Field */}
//                  <div className="my-4">
//                     <Label className="text-lg">Required By Date</Label>
//                     <Input
//                         type="date"
//                         value={input.requiredByDate}
//                         name="requiredByDate"
//                         onChange={changeEventHandler}
//                         className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>

//                 {/* Asset Name Field */}
//                 <div className="my-4">
//                     <Label className="text-lg">Asset Name</Label>
//                     <Input
//                         type="text"
//                         value={input.assetName}
//                         name="assetName"
//                         onChange={changeEventHandler}
//                         placeholder="Enter asset name"
//                         className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>
//                </div>

//                 {/* Asset Type Field */}
//                 <div className="my-4">
//                     <Label className="text-lg">Asset Type</Label>
//                     <RadioGroup className="flex items-center gap-4 my-5">
//                         <div className="flex items-center space-x-2">
//                             <Input
//                                 type="radio"
//                                 name="assetType"
//                                 value="logo"
//                                 checked={input.assetType === 'logo'}
//                                 onChange={changeEventHandler}
//                                 className="cursor-pointer"
//                             />
//                             <Label htmlFor="logo" className="text-lg">Logo</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <Input
//                                 type="radio"
//                                 name="assetType"
//                                 value="banner"
//                                 checked={input.assetType === 'banner'}
//                                 onChange={changeEventHandler}
//                                 className="cursor-pointer"
//                             />
//                             <Label htmlFor="banner" className="text-lg">Banner</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <Input
//                                 type="radio"
//                                 name="assetType"
//                                 value="template"
//                                 checked={input.assetType === 'template'}
//                                 onChange={changeEventHandler}
//                                 className="cursor-pointer"
//                             />
//                             <Label htmlFor="template" className="text-lg">Template</Label>
//                         </div>
//                     </RadioGroup>
//                 </div>

//                 {/* Submit Button */}
//                 {loading ? (
//                     <Button disabled className="w-full py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex justify-center items-center">
//                         <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
//                     </Button>
//                 ) : (
//                     <Button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
//                         Submit Request
//                     </Button>
//                 )}

//                 <span className='text-sm text-center block mt-4'>Want to view requests? <Link to="/view-requests" className='text-blue-600 hover:underline'>View Requests</Link></span>
//             </form>
//         </div>
//     );
// };

// export default AssetRequestForm;

import React, { useState } from 'react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { RadioGroup } from '../components/ui/radio-group';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';
import axios from "axios";

const AssetRequestForm = () => {
    const [input, setInput] = useState({
        employee: "",
        assetCategory: "",
        assetDescription: "",
        specifications: "",
        reason: "",
        priorityLevel: "",
        requiredByDate: "",
        status: "",
        requestDate: "",
        assetName: "",
        assetType: "",
    });

    const { loading } = useSelector((store) => store.auth); // Fetch loading state from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle input change
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    // Submit form handler
    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.assetType || !input.priorityLevel || !input.employee || !input.assetCategory) {
            return toast.error("Please fill in all the required fields.");
        }

        if (new Date(input.requiredByDate) < new Date()) {
            return toast.error("The required by date must be in the future.");
        }

        try {
            dispatch(setLoading(true));

            const requestData = { ...input };

            const response = await axios.post(
                "http://localhost:3030/api/createreq", // Replace with actual backend URL
                requestData
            );

            toast.success("Request successfully submitted!");
            navigate("/request-success");
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(error.response?.data?.error || "An unexpected error occurred. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-400 to-purple-600 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <form onSubmit={submitHandler} className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl space-y-6">
                <h1 className="font-extrabold text-2xl text-center text-gray-800 mb-6"> Asset Request</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Employee Field */}
                    <div className="my-4">
                        <Label className="text-lg">Employee</Label>
                        <Input
                            type="text"
                            value={input.employee}
                            name="employee"
                            onChange={changeEventHandler}
                            placeholder="Enter employee name"
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Asset Category Field */}
                    <div className="my-4">
                        <Label className="text-lg">Asset Category</Label>
                        <Input
                            type="text"
                            value={input.assetCategory}
                            name="assetCategory"
                            onChange={changeEventHandler}
                            placeholder="Enter asset category"
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Asset Description Field */}
                    <div className="my-4">
                        <Label className="text-lg">Asset Description</Label>
                        <Input
                            type="text"
                            value={input.assetDescription}
                            name="assetDescription"
                            onChange={changeEventHandler}
                            placeholder="Describe the asset"
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Specifications Field */}
                    <div className="my-4">
                        <Label className="text-lg">Specifications</Label>
                        <Input
                            type="text"
                            value={input.specifications}
                            name="specifications"
                            onChange={changeEventHandler}
                            placeholder="Enter specifications"
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                {/* Reason Field */}
                <div className="my-4">
                    <Label className="text-lg">Reason</Label>
                    <Input
                        type="text"
                        value={input.reason}
                        name="reason"
                        onChange={changeEventHandler}
                        placeholder="Enter reason for the request"
                        className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Priority Level Field */}
                <div className="my-4">
                    <Label className="text-lg">Priority Level</Label>
                    <RadioGroup className="flex items-center gap-4 my-5">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="priorityLevel"
                                value="low"
                                checked={input.priorityLevel === 'low'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="low" className="text-lg">Low</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="priorityLevel"
                                value="medium"
                                checked={input.priorityLevel === 'medium'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="medium" className="text-lg">Medium</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="priorityLevel"
                                value="high"
                                checked={input.priorityLevel === 'high'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="high" className="text-lg">High</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Required By Date Field */}
                    <div className="my-4">
                        <Label className="text-lg">Required By Date</Label>
                        <Input
                            type="date"
                            value={input.requiredByDate}
                            name="requiredByDate"
                            onChange={changeEventHandler}
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Asset Name Field */}
                    <div className="my-4">
                        <Label className="text-lg">Asset Name</Label>
                        <Input
                            type="text"
                            value={input.assetName}
                            name="assetName"
                            onChange={changeEventHandler}
                            placeholder="Enter asset name"
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                {/* Asset Type Field */}
                <div className="my-4">
                    <Label className="text-lg">Asset Type</Label>
                    <RadioGroup className="flex items-center gap-4 my-5">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="assetType"
                                value="logo"
                                checked={input.assetType === 'logo'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="logo" className="text-lg">Logo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="assetType"
                                value="banner"
                                checked={input.assetType === 'banner'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="banner" className="text-lg">Banner</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="assetType"
                                value="template"
                                checked={input.assetType === 'template'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="template" className="text-lg">Template</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Submit Button */}
                {loading ? (
                    <Button disabled className="w-full py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex justify-center items-center">
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                        Submit Request
                    </Button>
                )}

                <span className="text-sm text-center block mt-4">
                    Want to view requests?{" "}
                    <Link to="/view-requests" className="text-blue-600 hover:underline">View Requests</Link>
                </span>
            </form>
        </div>
    );
};

export default AssetRequestForm;

