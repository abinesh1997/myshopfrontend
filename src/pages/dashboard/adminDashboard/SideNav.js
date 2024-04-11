import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const SideNav = () => {
  return (
    <div className="dash_link">
      <div className="logo">
        <h3>
          My <span>Shop</span>
        </h3>
        <hr/>
      </div>
      <li>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/admin/banner">Banner</NavLink>
      </li>
      <li>
        <NavLink to="/admin/product-category">Category</NavLink>
      </li>
      <li>
        <NavLink to="/admin/product-brand">Brand</NavLink>
      </li>
      <li>
        
        <NavLink to="/admin/product">Product</NavLink>
      </li>
      <li>
        <NavLink to="/admin/order">Order</NavLink>
      </li>
      <li>
        <NavLink to="/admin/contact">Contact</NavLink>
      </li>
    </div>
  );
};

export default SideNav;
