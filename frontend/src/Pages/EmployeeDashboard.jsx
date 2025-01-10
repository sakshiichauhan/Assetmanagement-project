import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import CardView from '@/components/CardView';
import { Link } from "react-router-dom";
import {fetchEmployeeByUserId} from "../ApiUtil/api"

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const userId = localStorage.getItem('userId'); // Replace with Redux or Context if needed.

  // Fetch employee details on mount
  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const data = await fetchEmployeeByUserId(userId);
        setEmployee(data);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    if (userId) {
      getEmployeeData();
    }
  }, [userId]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="flex-1 bg-gray-50 p-8">
        <h1 className="text-3xl font-semibold mb-4">Welcome, {employee?.name || "Employee"}</h1>
        <h2 className="text-lg text-gray-600 mb-8">Department: {employee?.department || "N/A"}</h2>

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
          {employee?.assets?.length > 0 ? (
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
