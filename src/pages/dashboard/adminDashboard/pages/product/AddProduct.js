import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { resetError } from "../../../../../redux/features/authSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getCategories } from "../../../../../redux/features/categorySlice";
import { createProduct } from "../../../../../redux/features/productSlice";
const AddProduct = () => {
  const [states, setStates] = useState({
    title: "",
    price: "",
    size: "",
    category: "",
    quantity: "",
    shipping: "",
    image: [],
  });
  const [description, setDescription] = useState("");
  const { error } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const [currentImage, setCurrentImage] = useState("Choose Image");
  const [imagePreview, setImagePreview] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

//   file handle

const fileHandle = (e)=>{
    if(e.target.files.length !==0){
        setCurrentImage(e.target.files[0].name);
        setStates({...states, [e.target.name]: e.target.files[0]});

        const reader = new FileReader();
        reader.onload =()=>{
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(e.target.files[0])
    }
}
  const handleInputChange = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };
console.log ( states.title);
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,price,size,category,quantity,shipping,image} = states;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("size", size);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      formData.append("image", image);
      formData.append("description", description);
      
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }

     dispatch (createProduct({formData, navigate, toast}));
  };

  useEffect(() => {
    dispatch(getCategories ());
  }, [dispatch]);
  useEffect(() => {
    error && toast.error(error);
    dispatch(resetError());
  }, [error, dispatch]);
  return (
    <div className="product_form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form_label">
          <lable>Product Title</lable>
          <input
            type="text"
            name="title"
            id="title"
            value={states.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form_label">
          <lable>Price</lable>
          <input
            type="number"
            name="price"
            id="price"
            value={states.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form_label">
          <lable>Size</lable>
          <input
            type="text"
            name="size"
          id="size"
            value={states.size}
            onChange={handleInputChange}
          />
        </div>
        <div className="form_label">
          <lable>Category</lable>
          <select name="category"
          
          
          onChange={handleInputChange}>
            <option>Select Option</option>
            {categories &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
          </select>
        </div>
        <div className="form_label">
          <lable>Quantity</lable>
          <input type="number" name="quantity"
          id="quantity" onChange={handleInputChange} />
        </div>
        <div className="form_label">
          <lable>Shipping</lable>
          <select
            name="shipping"
            id = "shipping"
            onChange={handleInputChange}
            
          >
             <option>select option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form_label">
          <lable>Image</lable>
          <input type="file" name="image"
          id="image"
          
          onChange={fileHandle} />
          {
            imagePreview ?(
            <img src={imagePreview} alt="_image" height={100}/>
            ) :(
                <img src={currentImage} alt="_image" height={100}/>
            )
          }
        </div>
        <div className="form_label">
          <lable>Description</lable>
          <ReactQuill
            theme="snow"
            style={{
              backgroundColor: "#fff",
            }}
            value={description}
            onChange={setDescription}
          />
        </div>
        <div className="submit_button">
        <button>Create Product</button>
      </div>
      </form>
     
    </div>
  );
};

export default AddProduct;
