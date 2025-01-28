import React, { useState } from "react";

import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg my-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-medium text-2xl text-gray-800">{user?.fullname}</h1>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded text-indigo-600 hover:bg-indigo-100"
          >
            Edit Profile
          </button>
        </div>

        {/* Contact Information */}
        <div className="my-6">
          <h2 className="font-bold text-lg text-gray-800 mb-2">Contact Information</h2>
          <div className="flex items-center gap-3 my-2">
            <span className="text-indigo-600">📧</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <span className="text-indigo-600">📞</span>
            <span>{user?.phone || "NA"}</span>
          </div>
        </div>

        {/* Professional Information */}
        <div className="my-6">
          <h2 className="font-bold text-lg text-gray-800 mb-2">Professional Information</h2>
          <div className="flex items-center gap-3 my-2">
            <span className="text-indigo-600">💼</span>
            <span>{user?.jobTitle || "NA"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <span className="text-indigo-600">🏢</span>
            <span>{user?.department || "NA"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <span className="text-indigo-600">🆔</span>
            <span>{user?.employeeId || "NA"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
