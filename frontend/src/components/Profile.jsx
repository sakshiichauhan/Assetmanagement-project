import React, { useState } from "react";
import { useSelector } from "react-redux";
import AllRequestsTable from "./Appliesreq";

// 1) Import your external UpdateProfileDialog
import UpdateProfile from "./Updateprofile";

import {
  EnvelopeIcon,
  PhoneIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  IdentificationIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const defaultAvatar = "https://www.gravatar.com/avatar?d=mp&s=200";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-600 to-indigo-200">
      {/* Header */}
      <header className="py-8 flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="mt-2 text-sm">
          A brief overview of your personal and professional information
        </p>
      </header>

      {/* Profile Card */}
      <section className="max-w-4xl w-full mx-auto -mt-16 p-4">
        <div className="bg-white rounded-lg shadow-lg px-6 py-8 relative">
          {/* Avatar and Name */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={defaultAvatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.fullname || "Your Name"}
              </h2>
              <p className="mt-1 text-gray-500">
                {user?.personalInfo?.jobTitle || "Job Title"}
                {user?.personalInfo?.department && (
                  <span className="ml-2">| {user?.personalInfo?.department}</span>
                )}
              </p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <PencilSquareIcon className="w-5 h-5" />
              Edit Profile
            </button>
          </div>

          {/* Divider */}
          <hr className="my-8" />

          {/* Contact & Professional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <EnvelopeIcon className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">
                  {user?.email || "Email not provided"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <PhoneIcon className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">
                  {user?.personalInfo?.phone || "Phone not provided"}
                </span>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Professional Information
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <BriefcaseIcon className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">
                  {user?.personalInfo?.jobTitle || "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <BuildingOffice2Icon className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">
                  {user?.personalInfo?.department || "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <IdentificationIcon className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">
                  {user?.personalInfo?.employeeId || "No ID provided"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Section: Applied (or All) Requests */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl mt-8 p-6 shadow-lg">
          <h1 className="font-bold text-lg mb-5">Applied Requests</h1>
          <AllRequestsTable />
        </div>
      </section>

      {/* Use UpdateProfileDialog from the separate file */}
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
