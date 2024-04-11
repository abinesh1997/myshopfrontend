import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from"./features/authSlice";
import CategoryReducer from "./features/categorySlice"
import ProductReducer from "./features/productSlice"
import BannerReducer from "./features/bannerSlice"
export const store = configureStore({
  reducer: {
    auth:AuthReducer,
    category: CategoryReducer,
    product: ProductReducer,
    banner: BannerReducer,
  },
});