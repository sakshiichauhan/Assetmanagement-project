import React, { useState } from 'react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';

const ReplacementForm = () => {
    const [input, setInput] = useState({
        asset: "",
        employee: "",
        reasonForReplacement: "",
        replacementDetails: {
            requestedAssetDescription: "",
            requiredSpecifications: "",
            priorityLevel: "",
        },
    });

    const { loading } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;

        if (name.includes("replacementDetails")) {
            const fieldName = name.split(".")[1];
            setInput(prevState => ({
                ...prevState,
                replacementDetails: {
                    ...prevState.replacementDetails,
                    [fieldName]: value,
                }
            }));
        } else {
            setInput({ ...input, [name]: value });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.asset || !input.employee || !input.reasonForReplacement) {
            return toast.error("Please fill in all the required fields.");
        }

        try {
            dispatch(setLoading(true));


            setTimeout(() => {
                const requestData = {
                    asset: input.asset,
                    employee: input.employee,
                    reasonForReplacement: input.reasonForReplacement,
                    replacementDetails: input.replacementDetails,
                };

                console.log("Maintenance request data:", requestData);

                toast.success("Request successfully submitted!");
                navigate("/maintenance-request-success");
            }, 1000);

        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="font-mono min-h-screen bg-gradient-to-r from-indigo-500 via-purple-400 to-purple-600 flex items-center justify-center">
            <form onSubmit={submitHandler} className="w-full sm:w-96 bg-white p-6 rounded-md shadow-lg space-y-4">
                <h1 className="font-bold text-xl text-center text-gray-800 mb-5">Replace Request</h1>


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
                <div className="my-2">
                    <Label>Employee</Label>
                    <Input
                        type="text"
                        value={input.employee}
                        name="employee"
                        onChange={changeEventHandler}
                        placeholder="Enter employee name or ID"
                    />
                </div>

                <div className="my-2">
                    <Label>Reason for Replacement</Label>
                    <Input
                        type="text"
                        value={input.reasonForReplacement}
                        name="reasonForReplacement"
                        onChange={changeEventHandler}
                        placeholder="Enter reason for replacement"
                    />
                </div>

                {/* Replacement Details */}
                <div className="my-2">
                    <Label>Requested Asset Description</Label>
                    <Input
                        type="text"
                        value={input.replacementDetails.requestedAssetDescription}
                        name="replacementDetails.requestedAssetDescription"
                        onChange={changeEventHandler}
                        placeholder="Enter requested asset description"
                    />
                </div>
                <div className="my-2">
                    <Label>Required Specifications</Label>
                    <Input
                        type="text"
                        value={input.replacementDetails.requiredSpecifications}
                        name="replacementDetails.requiredSpecifications"
                        onChange={changeEventHandler}
                        placeholder="Enter required specifications"
                    />
                </div>
                <div className="my-2">
                    <Label>Priority Level</Label>
                    <Input
                        type="text"
                        value={input.replacementDetails.priorityLevel}
                        name="replacementDetails.priorityLevel"
                        onChange={changeEventHandler}
                        placeholder="Enter priority level (High, Medium, Low)"
                    />
                </div>


                {loading ? (
                    <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="w-full my-4">
                        Submit Request
                    </Button>
                )}

                <span className="text-sm">
                    Want to view maintenance requests?{" "}
                    <Link to="/view-maintenance-requests" className="text-blue-600">
                        View Requests
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default ReplacementForm;