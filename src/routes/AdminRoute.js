import React from "react";
import { Outlet,Navigate } from "react-router-dom";
const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem("profile"));

    return  user && user?.user.role === "admin" ?<Outlet/> : <Navigate to="/login"/>;
    };

 
export default AdminRoute;