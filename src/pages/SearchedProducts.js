import SecondHeader from "../components/header/SecondHeader";
import TopNav from "../components/header/TopNav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSearchedProducts } from "../redux/features/productSlice";
import ProductCard from "../components/cards/ProductCard";

const SearchedProducts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const text = queryParams.get("text");

  const { searchedProducts } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearchedProducts({ query: text }));
  }, [dispatch, text]);

  console.log(searchedProducts);
  return (
    <>
      <TopNav />
      <SecondHeader />
      <div className="products">
        <h2>Products</h2>
        <div className="product_container">
          {searchedProducts && searchedProducts.length > 0 ? (
            <>
              {searchedProducts &&
                searchedProducts.map((p) => <ProductCard key={p._id} p={p} />)}
            </>
          ) : (
            <h5>No Products Found.</h5>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchedProducts;
