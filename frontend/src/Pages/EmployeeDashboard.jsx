import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import CardView from "@/components/CardView";

const EmployeeDashboard = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState(null); // Employee state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen font-mono">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="flex-1 bg-gray-50 p-8">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome, {user?.fullname || "Employee"}
        </h1>
        <h2 className="text-lg text-gray-600 mb-8">
          Department: {user?.personalInfo?.department || "N/A"}
        </h2>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/request-asset">
            <CardView
              title="Request a New Asset"
              description="Submit a request to acquire a new asset."
              buttonText="Request Now"
            />
          </Link>
          <Link to="/replace-asset">
            <CardView
              title="Asset Replacement"
              description="Request replacement for an existing asset."
              buttonText="Replace"
            />
          </Link>
          <Link to="/maintain-asset">
            <CardView
              title="Maintenance Request"
              description="Request maintenance for assigned assets."
              buttonText="Maintain"
            />
          </Link>
        </div>

        {/* Assigned Assets Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Assigned Assets</h2>
          {loading ? (
            <p>Loading...</p>
          ) : employee?.assets?.length > 0 ? (
            <ul className="space-y-4">
              {employee.assets.map((asset) => (
                <li key={asset._id} className="p-4 bg-white rounded shadow">
                  <p className="font-semibold">Name: {asset.name}</p>
                  <p>ID: {asset.assetId}</p>
                  <p>Status: {asset.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No assets assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
