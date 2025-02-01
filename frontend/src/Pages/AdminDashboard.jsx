import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import CardView from "@/components/CardView";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(null);

  return (
    <div className="flex min-h-screen font-mono">
      <Sidebar />
      <div className="flex-1 bg-gray-50 p-8">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome, {user?.fullname || "Admin"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/manage-employees">
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
      </div>
    </div>
  );
};

export default AdminDashboard;
