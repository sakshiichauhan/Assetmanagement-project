import React from "react";

import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <DashboardCard
          title="Manage Employees"
          count={12}
          icon="👨‍💼"
          onClick={() => navigate("/admin/employees")}
        />
        <DashboardCard
          title="Manage Assets"
          count={34}
          icon="📦"
          onClick={() => navigate("/admin/assets")}
        />
        <DashboardCard
          title="Asset Requests"
          count={5}
          icon="📜"
          onClick={() => navigate("/admin/requests")}
        />
        <DashboardCard
          title="Maintenance Logs"
          count={8}
          icon="🛠️"
          onClick={() => navigate("/admin/maintenance")}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
