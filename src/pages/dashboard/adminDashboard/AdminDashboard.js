import React from "react";
import "./style.css";
import SideNav from "./SideNav";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
  return (
    <>
      <div className="dash_board">
        <div className="left">
          <SideNav />
        </div>
        <div className="right">
          <AdminHeader />
          <div className="admin_container">
            <div className="card">
              <h3>100</h3>
              <p>Categories</p>
            </div>
            <div className="card">
              <h3>2k+</h3>
              <p>Products</p>
            </div>
            <div className="card">
              <h3>1000+</h3>
              <p>Users</p>
            </div>
            <div className="card">
              <h3>200</h3>
              <p>Orders</p>
            </div>
            <div className="card">
              <h3>10</h3>
              <p>Contacts</p>
            </div>
            <div className="card">
              <h3>10</h3>
              <p>Blog</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
