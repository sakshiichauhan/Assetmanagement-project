import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { RadioGroup } from "../components/ui/radio-group";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react";
import axios from "axios";

const AssetRequestForm = () => {
  const [input, setInput] = useState({
    requestDate: "", // New field
    assetCategory: "",
    assetDescription: "",
    specifications: "",
    reason: "",
    priorityLevel: "",
    requiredByDate: "",
    status: "", // Could default to "Pending" on the server
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (
      !input.assetCategory ||
      !input.assetDescription ||
      !input.priorityLevel ||
      !input.requiredByDate
    ) {
      return toast.error("Please fill in all required fields.");
    }

    // Check that 'requiredByDate' is not in the past
    if (new Date(input.requiredByDate) < new Date()) {
      return toast.error("The required-by date must be in the future.");
    }

    try {
      dispatch(setLoading(true));

      // Prepare data to match your backend schema
      const requestData = {
        // If you want the server to set default requestDate, you can omit it. Otherwise:
        requestDate: input.requestDate || undefined,
        assetCategory: input.assetCategory,
        assetDescription: input.assetDescription,
        specifications: input.specifications,
        reason: input.reason,
        priorityLevel: input.priorityLevel,
        requiredByDate: input.requiredByDate,
        status: input.status, // or omit if the server defaults to "Pending"
      };

      // Send POST request
      await axios.post(
        "http://localhost:3030/api/AssetRequest/createreq",
        requestData
      );

      toast.success("Request successfully submitted!");
      navigate("/request-success");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.error ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-400 to-purple-600 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl space-y-6"
      >
        <h1 className="font-extrabold text-2xl text-center text-gray-800 mb-6">
          Asset Request
        </h1>

        {/* Row 1: requestDate & requiredByDate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="my-4">
            <Label className="text-lg">Request Date</Label>
            <Input
              type="date"
              value={input.requestDate}
              name="requestDate"
              onChange={changeEventHandler}
              placeholder="(Optional) - If empty, server can set default"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="my-4">
            <Label className="text-lg">Required By Date *</Label>
            <Input
              type="date"
              value={input.requiredByDate}
              name="requiredByDate"
              onChange={changeEventHandler}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Row 2: assetCategory & assetDescription */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="my-4">
            <Label className="text-lg">Asset Category *</Label>
            <Input
              type="text"
              value={input.assetCategory}
              name="assetCategory"
              onChange={changeEventHandler}
              placeholder="Enter asset category"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="my-4">
            <Label className="text-lg">Asset Description *</Label>
            <Input
              type="text"
              value={input.assetDescription}
              name="assetDescription"
              onChange={changeEventHandler}
              placeholder="Describe the asset"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Row 3: specifications & reason */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="my-4">
            <Label className="text-lg">Specifications</Label>
            <Input
              type="text"
              value={input.specifications}
              name="specifications"
              onChange={changeEventHandler}
              placeholder="Enter any specs (optional)"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="my-4">
            <Label className="text-lg">Reason</Label>
            <Input
              type="text"
              value={input.reason}
              name="reason"
              onChange={changeEventHandler}
              placeholder="Reason for request (optional)"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Priority Level (Radio) */}
        <div className="my-4">
          <Label className="text-lg">Priority Level *</Label>
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="priorityLevel"
                value="Low"
                checked={input.priorityLevel === "Low"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="Low" className="text-lg">
                Low
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="priorityLevel"
                value="Medium"
                checked={input.priorityLevel === "Medium"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="Medium" className="text-lg">
                Medium
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="priorityLevel"
                value="High"
                checked={input.priorityLevel === "High"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="High" className="text-lg">
                High
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Status (Optional) */}
        <div className="my-4">
          <Label className="text-lg">Status</Label>
          <Input
            type="text"
            value={input.status}
            name="status"
            onChange={changeEventHandler}
            placeholder="(Optional) - default can be set on server"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        {loading ? (
          <Button
            disabled
            className="w-full py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex justify-center items-center"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Submit Request
          </Button>
        )}

        <span className="text-sm text-center block mt-4">
          Want to view requests?{" "}
          <Link to="/view-requests" className="text-blue-600 hover:underline">
            View Requests
          </Link>
        </span>
      </form>
    </div>
  );
};

export default AssetRequestForm;
