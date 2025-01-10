import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // to highlight active link

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-6 shadow-lg">
      <ul className="space-y-6">
        <li>
          <Link
            to="/employeedash"
            className={`block px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
              location.pathname === "/employeedash" ? "bg-blue-600" : ""
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/employee/assets"
            className={`block px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
              location.pathname === "/employee/assets" ? "bg-blue-600" : ""
            }`}
          >
            My Assets
          </Link>
        </li>
        <li>
          <Link
            to="/employee/requests"
            className={`block px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
              location.pathname === "/employee/requests" ? "bg-blue-600" : ""
            }`}
          >
            Asset Requests
          </Link>
        </li>
        <li>
          <Link
            to="/employee/maintenance"
            className={`block px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
              location.pathname === "/employee/maintenance" ? "bg-blue-600" : ""
            }`}
          >
            Maintenance Requests
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
