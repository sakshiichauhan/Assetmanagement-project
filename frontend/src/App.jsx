import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
import AssetRequestForm from "./Pages/RequestAsset";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import ReplacementForm from "./Pages/ReplacementForm";
import MaintenanceRequestForm from "./Pages/ManagementForm";
import Profile from "./components/Profile";
import Landing from "./Pages/Landing";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignupPage";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/signup", "/login", "/404"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/admindash" element={<AdminDashboard />} />
        <Route path="/employeedash" element={<EmployeeDashboard />} />
        <Route path="/request-asset" element={<AssetRequestForm />} />
        <Route path="/maintain-asset" element={<MaintenanceRequestForm />} />
        <Route path="/replace-asset" element={<ReplacementForm />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/404" element= {<PageNotFound/>} />
        <Route path="*" element = {<Navigate to="/404"/>} />
      </Routes>
    </>
  );
}

export default App;
