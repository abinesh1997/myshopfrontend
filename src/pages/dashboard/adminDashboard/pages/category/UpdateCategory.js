import React, { useState, useEffect } from "react";
import "./style.css";
import {useDispatch, useSelector} from  'react-redux'
import {useNavigate, useParams} from  'react-router-dom'
import {toast} from "react-toastify"
import { categoryUpdate, createCategory, getCategory } from "../../../../../redux/features/categorySlice";
import { resetError } from "../../../../../redux/features/authSlice";
const UpdateCategory = () => {
  const [title, setTitle] = useState("");

  const {error, loading, category} = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  
  useEffect(()=>{
    if(params.slug){
        dispatch(getCategory (params.slug));
    }

  },[dispatch, params.slug]);
//   console.log(category);

useEffect(()=>{
if(! loading && category){
    setTitle(category.title || "");
}
},[loading, category]);
 
  const handleSubmit = (e)=>{
    e.preventDefault();
    
    dispatch (categoryUpdate({slug:params.slug,title, navigate, toast}));
  };
  useEffect(()=>{
    error && toast.error(error);
    dispatch(resetError());
  }, [error, dispatch]);
  return (
    <div className="category_form">
      <h2>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category"> Category Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="button">
          <button>Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
