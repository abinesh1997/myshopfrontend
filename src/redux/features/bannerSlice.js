import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
    
      const response = await api.banner(formData);
      toast.success("Banner Added Successfully");
      navigate("/admin/banner");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);


export const getBanners = createAsyncThunk(
  "banner/getBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.banners();
      // console.log (response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.bannerDelete(id);
      toast.success("Banner deleted Successfully");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);



const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
  
    error: "",
    loding: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createBanner.pending, (state) => {
      state.loding = true;
      state.error = "";
    })
    .addCase(createBanner.fulfilled, (state, action) => {
      state.loding = false;

      state.banners = action.payload;
    })
    .addCase(createBanner.rejected, (state, action) => {
      state.loding = false;
      // console.log(action.payload.message);
      state.error = action.payload.message;
    })
      .addCase(getBanners.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loding = false;

        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })

      .addCase(deleteBanner.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loding = false;
        const {
          arg: { id },
        } = action.meta;

        if(id){
          state.banners= state.banners.filter((c)=> c._id !== id);
        }

      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })
      
      
  },
});

export default bannerSlice.reducer;
