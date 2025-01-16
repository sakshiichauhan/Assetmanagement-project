import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import CardView from "@/components/CardView";
import { Link } from "react-router-dom";
import { fetchAdminData } from "../ApiUtil/api";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const userId = localStorage.getItem("userId"); // Replace with Redux or Context if needed.

  // Fetch admin details on mount
  useEffect(() => {
    const getAdminData = async () => {
      try {
        const data = await fetchAdminData(userId);
        console.log('Admin Data:', data);
        setAdminData(data.user);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    if (userId) {
      getAdminData();
    }
  }, [userId]);

  return (
    <div className="flex min-h-screen font-mono">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="flex-1 bg-gray-50 p-8">
        <h1 className="text-3xl font-semibold mb-4">Welcome, {adminData?.name}</h1>
        {/* <h2 className="text-lg text-gray-600 mb-8">Role: {adminData?.role || "Administrator"}</h2> */}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/view manage-employees">
            <CardView
              title="Manage Employees"
              description="View and manage all employees in the system."
              buttonText="Manage"
            />
          </Link>

          <Link to="/review-requests">
            <CardView
              title="Review Requests"
              description="Review and approve or reject asset and maintenance requests."
              buttonText="Review"
            />
          </Link>
          <Link to="/room-allocation">
            <CardView
              title="Manage Rooms"
              description="Assign and manage rooms for employees and assets."
              buttonText="Allocate"
            />
          </Link>
        </div>

        {/* Recent Requests Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Requests</h2>
          {adminData?.requests?.length > 0 ? (
            <ul className="space-y-4">
              {adminData.requests.map((request) => (
                <li key={request._id} className="p-4 bg-white rounded shadow">
                  <p className="font-semibold">Type: {request.type}</p>
                  <p>Requested By: {request.requestedBy}</p>
                  <p>Status: {request.status}</p>
                  <p>Description: {request.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent requests available.</p>
          )}
        </div>

        {/* All Assets Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All Assets</h2>
          {adminData?.assets?.length > 0 ? (
            <ul className="space-y-4">
              {adminData.assets.map((asset) => (
                <li key={asset._id} className="p-4 bg-white rounded shadow">
                  <p className="font-semibold">Name: {asset.name}</p>
                  <p>ID: {asset.assetId}</p>
                  <p>Status: {asset.status}</p>
                  <p>Assigned To: {asset.assignedTo || "Unassigned"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No assets available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
