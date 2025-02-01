import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

import { USER_API_END_POINT } from "@/utils/constant";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // Initialize local form data from the user object
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.personalInfo?.phone || "",
    address: user?.personalInfo?.address || "",
    department: user?.personalInfo?.department || "",
    jobTitle: user?.personalInfo?.jobTitle || "",
    employeeId: user?.personalInfo?.employeeId || "",
  });

  // Update local state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the form data to your backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send your 'input' state as the payload
      const res = await axios.post(`${USER_API_END_POINT}/userupdate`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        // Update Redux user state
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error updating profile.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // If dialog is closed, return nothing
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={(e) => {
        // Close dialog if user clicks outside the content box
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={input.phone}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={input.address}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={input.department}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Job Title */}
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={input.jobTitle}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Employee ID */}
          <div>
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-gray-700"
            >
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={input.employeeId}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Footer: Buttons */}
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-md px-4 py-2 text-sm hover:bg-indigo-700 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
