import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDashboard } from "react-icons/ai"; // Dashboard Icon
import { FaLaptop } from "react-icons/fa"; // My Assets Icon
import { RiFileList2Line } from "react-icons/ri"; // Asset Requests Icon
import { MdBuild } from "react-icons/md"; // Maintenance Requests Icon
import { TbReplaceFilled } from "react-icons/tb"; // Replace Asset Icon
import { MdRoomPreferences } from "react-icons/md"; // Room Asset Icon

const Sidebar = () => {
  const location = useLocation(); // For highlighting active links
  const { user } = useSelector((store) => store.auth); // Access user from Redux store
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect users based on their role when visiting the root path
    if (user && window.location.pathname === "/") {
      if (user?.role === "admin") {
        navigate("/admindash");
      } else if (user?.role === "employee") {
        navigate("/employeedash");
      }
    }
  }, [user, navigate]);

  // Role-based menu items
  const menuItems = user?.role === "admin"
    ? [
        {
          path: "/admindash",
          label: "Admin Dashboard",
          icon: <AiOutlineDashboard />,
        },
        {
          path: "/manage-employees",
          label: "Manage Employees",
          icon: <FaLaptop />,
        },
        {
          path: "/manage-assets",
          label: "Manage Assets",
          icon: <RiFileList2Line />,
        },
        {
          path: "/review-requests",
          label: "Review Requests",
          icon: <MdBuild />,
        },
        {
          path: "/room-allocation",
          label: "Manage Rooms",
          icon: <MdRoomPreferences />,
        },
      ]
    : [
        {
          path: "/employeedash",
          label: "Dashboard",
          icon: <AiOutlineDashboard />,
        },
        {
          path: "/employee/assets",
          label: "My Assets",
          icon: <FaLaptop />,
        },
        {
          path: "/request-asset",
          label: "Asset Requests",
          icon: <RiFileList2Line />,
        },
        {
          path: "/maintain-asset",
          label: "Maintenance Requests",
          icon: <MdBuild />,
        },
        {
          path: "/replace-asset",
          label: "Replace Asset",
          icon: <TbReplaceFilled />,
        },
        {
          path: "/room",
          label: "Room Asset",
          icon: <MdRoomPreferences />,
        },
      ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-6 shadow-lg">
      <ul className="space-y-6">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 ${
                location.pathname === item.path ? "bg-purple-600" : ""
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
