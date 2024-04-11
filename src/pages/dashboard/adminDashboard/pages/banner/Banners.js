import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deleteBanner, getBanners } from "../../../../../redux/features/bannerSlice";
import AdminHeader from "../../AdminHeader";
import SideNav from "../../SideNav";
import { toast } from "react-toastify";
import "../../style.css";


const Banners = () => {
  const [keyword, setKeyword] = useState("");

  const { banners} = useSelector((state) => state.banner);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);
  // console.log(categories);

  // delete
  const handleDelete=(id)=>{
    const confirm = window.confirm("Are you really want to delete this category?");
    if(confirm){
      dispatch(deleteBanner({id, toast}));
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
              <div className="add">
                <Link to= "/admin/add-banner">
                <button>Add</button>
                </Link>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {banners &&
                banners.length > 0 &&
                banners.map((b, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={`${process.env.REACT_APP_API_IMAGE_URL}/${b.image}`}
                        height={80}
                        alt=""/>
                      </td>
                      <td>
                    
                       
                        <span onClick={()=> handleDelete(b._id)}>
                            <MdDeleteOutline 
                            color="red" 
                            className="action_icon" />
                            </span>
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

export default Banners;
