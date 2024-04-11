import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./style.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, resetError } from "../../redux/features/authSlice";
import TopNav from "../../components/header/TopNav";
import SecondHeader from "../../components/header/SecondHeader";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const distpatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.auth);
  useEffect(() => {
    error && toast.error(error);
    distpatch(resetError());
  }, [error, distpatch]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || cpassword === "") {
      toast.error("Please fill all fields.");
    } else if (password !== cpassword) {
      toast.error("password and confirm password don't match.");
    } else {
      distpatch(
        register({ state: { name, email, password }, navigate, toast })
      );
    }
  };

  return (
  <>
  <TopNav/>
  <SecondHeader/>

    <div className="from_section">
      <div className="container">
        <h4>
          <FaUserAlt /> <br />
          Register
        </h4>
        <form onSubmit={handleRegister}>
          <div className="form_lable">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Full Name"
            />
          </div>
          <div className="form_lable">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>
          <div className="form_lable">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>
          <div className="form_lable">
            <input
              type="password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              placeholder="Enter Conform Password"
            />
          </div>
          <div className="button">
            <button>Register</button>
          </div>
        </form>
        <div className="form_footer">
          <p>
            Have an Account ? <Link to="/login">Login.</Link>
          </p>
        </div>
      </div>
    </div></>
  );
};

export default Register;
