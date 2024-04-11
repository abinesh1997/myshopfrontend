import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
import { resetError } from "../../../../../redux/features/authSlice";
import { productUpdateImage } from "../../../../../redux/features/productSlice";


const UpdateProductImage = () => {
  const [states, setStates] = useState({
  
    image: [],
  });

  const { error } = useSelector((state) => state.product);
  const [currentImage, setCurrentImage] = useState("Choose Image");
  const [imagePreview, setImagePreview] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { image} = states;
    const formData = new FormData();
      
      formData.append("image", image);
    

     dispatch (productUpdateImage({id: params.id, formData, navigate, toast}));
  };


  useEffect(() => {
    error && toast.error(error);
    dispatch(resetError());
  }, [error, dispatch]);
  return (
    <div className="product_form">
      <h2>update Product Image</h2>
      <form onSubmit={handleSubmit}>
        
        
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
       
        <div className="submit_button">
        <button>Update Image</button>
      </div>
      </form>
     
    </div>
  );
};

export default UpdateProductImage;
