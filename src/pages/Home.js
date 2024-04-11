import SecondHeader from "../components/header/SecondHeader";
import TopNav from "../components/header/TopNav";
import Banner from "../components/header/Banner";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useEffect } from "react";
import {  getProducts } from "../redux/features/productSlice";
import { Link } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";
const Home = () => {
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
console.log(products);
  return (
    <>
      <TopNav />
      <SecondHeader />
      <Banner />
      <div className="title">
        <h3>All Latest Products</h3>
      </div>

      <div className="product_container">
        {products &&
          products.slice(0,4).map((p) => 
          <ProductCard key={p._id} p={p}/>)}
      </div>
    </>
  );
};
export default Home;
