import SecondHeader from "../components/header/SecondHeader";
import TopNav from "../components/header/TopNav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsByCategory } from "../redux/features/productSlice";
import ProductCard from "../components/cards/ProductCard";

const Products = () => {
  const { categoryProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    if (params.categorySlug) {
      dispatch(getProductsByCategory({ slug: params.categorySlug }));
    }
  }, [dispatch, params.categorySlug]);
  // console.log(categoryProducts);
  return (
    <>
      <TopNav />
      <SecondHeader />
      <div className="products">
        <h2>Products</h2>
        <div className="product_container">
          {categoryProducts && categoryProducts.length > 0 ? (
            <>
              {categoryProducts &&
                categoryProducts.map((p) => <ProductCard key={p._id} p={p} />)}
            </>
          ) : (
            <h5>No Products Found.</h5>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
