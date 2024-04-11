import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import { MdLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { login, resetError } from "../../redux/features/authSlice";
import { toast } from 'react-toastify';
import TopNav from "../../components/header/TopNav";
import SecondHeader from "../../components/header/SecondHeader";
const Login = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const  {error} = useSelector((state) => state.auth);
  useEffect(()=>{
    error && toast.error(error);
    dispatch(resetError());
  }, [error, dispatch]);
 

  const handleSubmit =(e)=>{
    e.preventDefault();

    if(email === "" &&password === ""){
      toast.error("Email & Password is Required");
    } else{
      dispatch(login({ state:{email, password}, navigate, toast}));
    }
    
    // console.log(email);
    // console.log(password);
  };
 
  return (
    
    <>
    <TopNav/>
    <SecondHeader/>
    <div className="from_section">
      <div className="container">
        <h4>
          
        <MdLogin /> <br />
          Login
        </h4>
        <form onSubmit={handleSubmit}>
         
          <div className="form_lable">
            <input type="email" 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder="Enter Email" />
          </div>
          <div className="form_lable">
            <input type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
             placeholder="Enter Password" />
          </div>

          <div className="button">
          <button>Login</button>
          </div>
        </form>
        <div className="form_footer">
          <p>
            Don't Have an Account ? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;