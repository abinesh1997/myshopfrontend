import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../redux/features/categorySlice";
const SecondHeader = () => {
  const {categories} = useSelector((state) => state.category)
  const dispatch = useDispatch();
  useEffect( () =>{
    dispatch(getCategories());

  },[dispatch]);
  return (
    <div className="header_second">
      <div className="container">
        <ul>
          <li>
            <Link to={`/product/all`} className="link">
              All
            </Link>
          </li>
          {categories &&
            categories.slice(0, 10).map((c) => (
              <li key={c._id}>
                <Link to={`/product/${c.slug}`} className="link">
                  {c.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>

  );
};
 
export default SecondHeader;