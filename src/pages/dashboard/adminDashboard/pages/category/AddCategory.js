import React, { useState, useEffect } from "react";
import "./style.css";
import {useDispatch, useSelector} from  'react-redux'
import {useNavigate} from  'react-router-dom'
import {toast} from "react-toastify"
import { createCategory } from "../../../../../redux/features/categorySlice";
import { resetError } from "../../../../../redux/features/authSlice";
const AddCategory = () => {
  const [title, setTitle] = useState("");

  const {error} = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleSubmit = (e)=>{
    e.preventDefault();
    
    dispatch (createCategory({title, navigate, toast}));
  };
  useEffect(()=>{
    error && toast.error(error);
    dispatch(resetError());
  }, [error, dispatch]);
  return (
    <div className="category_form">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category"> Category Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="button">
          <button>Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
