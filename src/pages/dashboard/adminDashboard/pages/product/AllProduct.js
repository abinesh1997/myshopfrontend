import React, { useState } from "react";
import "../../style.css";
import SideNav from "../../SideNav";
import AdminHeader from "../../AdminHeader";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import LocalSearch from "../../../../../components/form/LocalSearch";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
import { getProducts, productDelete } from "../../../../../redux/features/productSlice";
import { FcGallery } from "react-icons/fc";

const Allproducts = () => {
  const [keyword, setKeyword] = useState("");

  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
   console.log(products);

  const search =(keyword)=> (p)=>p.title.toLowerCase().includes(keyword);

  // delete
  const handleDelete=(id)=>{
    const confirm = window.confirm("Are you really want to delete this product?");
    if(confirm){
      dispatch(productDelete({id, toast}));
    }
  }
  return (
    <>
      <div className="dash_board">
        <div className="left">
          <SideNav />
        </div>
        <div className="right">
          <AdminHeader />
          <div className="admin_container">
            <div className="filter_section">
              <div className="filter">
                <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
              </div>
              <div className="add">
                <Link to= "/admin/add-product">
                <button>Add</button>
                </Link>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                products.length > 0 &&
                  products.filter(search(keyword)).map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.title}</td>
                      <td>{p.category?.title}</td>
                      <td>
                        <img src={`${process.env.REACT_APP_API_IMAGE_URL}/${p.image}`}
                        height={80}
                        alt=""/>
                      </td>
                      <td>
                      <Link to={`/admin/update-product-image/${p._id}`}>
                        <FcGallery size={22}/></Link>
                        &nbsp; &nbsp; &nbsp;
                        <Link to={`/admin/update-product/${p._id}`}>
                        <FaPencilAlt color="white" className="action_icon" /></Link>
                        &nbsp; &nbsp; &nbsp;
                        <span onClick={()=> handleDelete(p._id)}><MdDeleteOutline color="red" className="action_icon" /></span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allproducts;
