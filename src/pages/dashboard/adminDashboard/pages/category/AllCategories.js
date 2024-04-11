import React, { useState } from "react";
import "../../style.css";
import SideNav from "../../SideNav";
import AdminHeader from "../../AdminHeader";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { categoryDelete, getCategories } from "../../../../../redux/features/categorySlice";
import LocalSearch from "../../../../../components/form/LocalSearch";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"

const AllCategories = () => {
  const [keyword, setKeyword] = useState("");

  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  // console.log(categories);

  const search =(keyword)=> (c)=>c.title.toLowerCase().includes(keyword);

  // delete
  const handleDelete=(slug)=>{
    const confirm = window.confirm("Are you really want to delete this category?");
    if(confirm){
      dispatch(categoryDelete({slug, toast}));
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
                <Link to= "/admin/add-product-category">
                <button>Add</button>
                </Link>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                categories.length > 0 &&
                  categories.filter(search(keyword)).map((c, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{c.title}</td>
                      <td>
                        <Link to={`/admin/update-product-category/${c.slug}`}>
                        <FaPencilAlt color="white" className="action_icon" /></Link>
                        &nbsp; &nbsp; &nbsp;
                        <span onClick={()=> handleDelete(c.slug)}><MdDeleteOutline color="red" className="action_icon" /></span>
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

export default AllCategories;
