import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
    
      const response = await api.product(formData);
      toast.success("product Added Successfully");
      navigate("/admin/product");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);



export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.products();
    //    console.log (response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, {rejectWithValue }) => {
    try {
      const response = await api.singleProduct(id);
    //    console.log (response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const productUpdate = createAsyncThunk(
  "product/productUpdate",
  async ({id, formData, navigate,toast},{ rejectWithValue }) => {
   
    try {
      console.log(id, formData);
      const response = await api.updateProduct(id, formData);
      // console.log (response);
      toast.success("Product Update Successfully");
      navigate("/admin/product");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const productUpdateImage = createAsyncThunk(
  "product/productUpdateImage",
  async ({id, formData, navigate,toast},{ rejectWithValue }) => {
   
    try {
      console.log(id, formData);
      const response = await api.updateProductImg(id, formData);
      // console.log (response);
      toast.success("Product image Update Successfully");
      navigate("/admin/product");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const productDelete = createAsyncThunk(
  "cproduct/productDelete",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteProduct(id);
      toast.success("Product deleted Successfully");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const getproductDetails = createAsyncThunk(
  "product/getprductDetails",
  async ({slug,id}, {rejectWithValue }) => {
    try {
      // console.log(slug, id);
      const response = await api.productDetails(slug,id);
        console.log (response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const getRelatedProducts = createAsyncThunk(
  "product/getRelatedProduct",
  async ({productId}, {rejectWithValue }) => {
    try {
      // console.log(slug, id);
      const response = await api.relatedProducts(productId);
        console.log (response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "product/getProductsByCategory",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await api.getProductsByCategory(slug);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const getSearchedProducts = createAsyncThunk(
  "product/getSearchedProducts",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await api.searchProduct(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

const ProductsSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    relatedProducts: [],
    categoryProducts: [],
    searchedProducts: [],
    items: [],
    product: {},
    details:{},
    error: "",
    loding: false,
  },
  reducers: {
    addToCart: (state, action)=>{
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (!existingItem) {
        state.items.push(newItem);
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // Save cart items to local storage
      }
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item._id !== itemIdToRemove);
      console.log(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // Update local storage after removing item
    },
    clearCartItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending, (state) => {
      state.loding = true;
      state.error = "";
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.loding = false;

      state.products = action.payload;
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.loding = false;
      // console.log(action.payload.message);
      state.error = action.payload.message;
    })
      .addCase(getProducts.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loding = false;

        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })
      .addCase(getProduct.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loding = false;

        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })
      .addCase(productUpdate.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(productUpdate.fulfilled, (state, action) => {
        state.loding = false;

        state.product = action.payload;
      })
      .addCase(productUpdate.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })
      .addCase(productUpdateImage.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(productUpdateImage.fulfilled, (state, action) => {
        state.loding = false;

        state.product = action.payload;
      })
      .addCase(productUpdateImage.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })

      .addCase(productDelete.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(productDelete.fulfilled, (state, action) => {
        state.loding = false;
        const {
          arg: { id },
        } = action.meta;

        if(id){
          state.products= state.products.filter((c)=> c._id !== id);
        }

      })
      .addCase(productDelete.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })

      .addCase(getproductDetails.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(getproductDetails.fulfilled, (state, action) => {
        state.loding = false;

        state.details = action.payload;
      })
      .addCase(getproductDetails.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })

      .addCase(getRelatedProducts.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.loding = false;

        state.relatedProducts = action.payload;
      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loding = false;

        state.categoryProducts = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })
      .addCase(getSearchedProducts.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(getSearchedProducts.fulfilled, (state, action) => {
        state.loding = false;

        state.searchedProducts = action.payload;
      })
      .addCase(getSearchedProducts.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })
  },  
});

export const {addToCart, removeFromCart, clearCartItems} = ProductsSlice.actions;
export default ProductsSlice.reducer;
