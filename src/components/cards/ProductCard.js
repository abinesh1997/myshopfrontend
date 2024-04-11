import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/productSlice";
import { useState } from "react";
import { Tooltip } from 'antd';

const ProductCard = ({p}) => {
  const [toolTip, setToolTip] = useState("Click to add.");
  const dispatch = useDispatch();
  const handleAddToCart =  () =>{
    dispatch(addToCart(p))
    setToolTip("Product added.")
  };
    return ( 
        <div className="product_card" key={p._id}>
        <div className="product_image">
          <img
            src={`${process.env.REACT_APP_API_IMAGE_URL}/${p.image}`}
            alt="product _image"
          />
        </div>
        <div className="product_content">
          <h5>{p.title}</h5>
          <p className="price">Price: ${p.price}</p>
          <div className="buttons">
              <Link to ={`/product/${p.slug}/${p._id}`}>
              <button>View Details</button>
              </Link>
              <Tooltip placement="top" title={toolTip}>
              <button onClick={handleAddToCart}>Add to Cart</button>
          </Tooltip>
            
            
          </div>
        </div>
      </div>
     );
}
 
export default ProductCard;