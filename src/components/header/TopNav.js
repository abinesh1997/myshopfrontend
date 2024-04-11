import "./style.css";
import { IoIosSearch } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/features/authSlice";
import { useState } from "react";
const TopNav = () => {

  const [text,setText] = useState("");
  const { user } = useSelector((state) => state.auth);
const distpatch = useDispatch();
const navigate = useNavigate();
  // console.log(user);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


  const handleLogout =()=> {
    distpatch(setLogout());
    navigate("/")
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    navigate(`/search?text=${text}`);
  };
  return (
    <div className="top_nav_bar">
      <div className="container">
        <div className="logo">
          <Link to ="/" className ="link">
          <h2>MY SHOP</h2>
          </Link>
          
        </div>
        <div className="search_bar">
          <form>
            <input type="text"
            name="text"
            placeholder="search..."
            value={text}
            onChange={(e)=> setText(e.target.value)}
            
            />

            <IoIosSearch onClick={handleSubmit} className="search_icon" />
          </form>
        </div>
        <div className="create_account_cart">
          {!user ? (
            <div className="sign_in">
              <Link to="/register" className="link">
                <FaUserAlt className="icon" /> Sign IN/ Creat Account
              </Link>
            </div>
          ) : (
            <div className="user_dropdown">
              <li className="user_nav">
                <FaUserAlt />
                {user?.user.name}
                <ul className="dropdown">
                  <li>Seeting</li>
                  <Link to= "/user/dashboard" className="link">
                  <li>Dashboard</li>
                  </Link>
                 
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </li>
            </div>
          )}

          <div className="cart">
           <Link to="/cart" className="link">
           <IoMdCart className="icon" />
            <sup>{cartItems ? cartItems.length : 0 }</sup> Shopping Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
