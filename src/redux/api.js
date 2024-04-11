import axios from "axios";

const API = axios.create({ baseURL: "https://myshopbackend-psjo.onrender.com/api" });

API.interceptors.request.use((req)=>{
  if(localStorage.getItem("profile")){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
  }
  return req;
});

export const signIn = (fromData) => API.post("/user/login", fromData);
export const signUp = (fromData) => API.post("/user/register", fromData);

// categories

export const category = (title) => API.post("/category", { title: title });
export const categories = () => API.get("/categories");
export const singleCategory = (slug) => API.get(`/category/${slug}`);
export const UpdateCategory = (slug, title) =>
  API.put(`/category/${slug}`, { title: title });
export const deleteCategory = (slug) => API.delete(`/category/${slug}`);

// products
export const product = (formData) => API.post("/product", formData);
export const products = () => API.get("/products");
export const singleProduct = (id) => API.get(`/product/${id}`);

export const updateProduct = (id,formData) => API.put(`/product/${id}`,formData);
export const updateProductImg = (id,formData) => API.put(`/product-image/${id}`,formData);

export const deleteProduct = (id) => API.delete(`/product/${id}`);
export const productDetails = (slug,id) => API.get(`/product/${slug}/${id}`);
export const relatedProducts = (productId) => API.get(`/related/product/${productId}`);

export const getProductsByCategory = (slug) => API.get(`/products/${slug}`);
export const searchProduct = (query) => API.post("/search", {query: query});
// banners
export const banner = (formData) => API.post("/banner",formData);
export const banners = () => API.get("/banners");
export const bannerDelete = (id) => API.delete(`/banner/${id}`);

// order

export const order = (formData) => API.post("user/order", formData );

export const orders = (orderStatus) => API.post("/orders", {orderStatus: orderStatus} );

export const singleOrder = (id) => API.get(`/single-order/${id}`);
export const userOrder = (userId) => API.get(`/user-order/${userId}`);
export const updateOrderStatus = (orderId, orderStatus) =>
  API.put("/order-status", { orderId, orderStatus });
