import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import AdminDashboard from "./pages/dashboard/adminDashboard/AdminDashboard";
import UserDashboard from "./pages/dashboard/userDashboard/UserDashboard";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import AllCategories from "./pages/dashboard/adminDashboard/pages/category/AllCategories";
import AddCategory from "./pages/dashboard/adminDashboard/pages/category/AddCategory";
import UpdateCaterygory from "./pages/dashboard/adminDashboard/pages/category/UpdateCategory";
import Allproducts from "./pages/dashboard/adminDashboard/pages/product/AllProduct";
import AddProduct from "./pages/dashboard/adminDashboard/pages/product/AddProduct";
import UpdateProduct from "./pages/dashboard/adminDashboard/pages/product/UpdateProduct";
import UpdateProductImage from "./pages/dashboard/adminDashboard/pages/product/UpdateProductImage";
import Banners from "./pages/dashboard/adminDashboard/pages/banner/Banners";
import AddBanner from "./pages/dashboard/adminDashboard/pages/banner/AddBanner";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import searchedProducts from "./pages/SearchedProducts";
import SearchedProducts from "./pages/SearchedProducts";
import Cart from "./pages/Cart";
import Orders from "./pages/dashboard/adminDashboard/pages/order/Orders";
import OrderCheck from "./pages/dashboard/adminDashboard/pages/order/OrderCheck";

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug/:id" element={<ProductDetails />} />

          <Route path="/product/:categorySlug" element={<Products />} />
          <Route path="/search" element={<SearchedProducts />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* admin */}
          <Route path="/admin/" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="order" element={<Orders />} />
            <Route path="orders/:id" element={<OrderCheck />} />
            <Route path="banner" element={<Banners />} />
            <Route path="add-banner" element={<AddBanner/>} />

            
            <Route path="product" element={<Allproducts />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
            <Route path="update-product-image/:id" element={<UpdateProductImage/>} />


            <Route path="product-category" element={<AllCategories />} />
            <Route path="add-product-category" element={<AddCategory />} />
      
            <Route path="update-product-category/:slug" element={<UpdateCaterygory/>} />
          </Route>
          {/* user */}
          <Route path="/user/" element={<UserRoute />}>
            <Route path="dashboard" element={<UserDashboard />} />
            
            
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
