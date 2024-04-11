import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
import { resetError } from "../../../../../redux/features/authSlice";
import { createBanner } from "../../../../../redux/features/bannerSlice";
const AddBanner = () => {
  const [states, setStates] = useState({
    image: [],
  });

  const { error } = useSelector((state) => state.banner);

  const [currentImage, setCurrentImage] = useState("Choose Image");
  const [imagePreview, setImagePreview] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   file handle

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setCurrentImage(e.target.files[0].name);
      setStates({ ...states, [e.target.name]: e.target.files[0] });

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { image } = states;
    const formData = new FormData();

    formData.append("image", image);

    dispatch(createBanner({ formData, navigate, toast }));
  };

  useEffect(() => {
    error && toast.error(error);
    dispatch(resetError());
  }, [error, dispatch]);
  return (
    <div className="product_form">
      <h2>Add Banner</h2>
      <form onSubmit={handleSubmit}>
        <div className="form_label">
          <lable>Image</lable>
          <input type="file" name="image" id="image" onChange={fileHandle} />
          {imagePreview ? (
            <img src={imagePreview} alt="_image" height={100} />
          ) : (
            <img src={currentImage} alt="_image" height={100} />
          )}
        </div>

        <div className="submit_button">
          <button>Create Banner</button>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
