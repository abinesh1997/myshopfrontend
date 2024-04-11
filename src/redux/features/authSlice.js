import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const register = createAsyncThunk(
  "auth/register",
  async ({ state, navigate, toast }, { rejectWithValue }) => {
    try {
      // console.log(state);
      const response = await api.signUp(state);
      toast.success("Register Successfully!");
      navigate("/");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ state, navigate, toast }, { rejectWithValue }) => {
    try {
      // console.log(state);
      const response = await api.signIn(state);
      toast.success("Login Successfully");
     
      // console.log(response.data);
      if (response.data?.user.role === "admin") {
        navigate("/admin/dashboard");
      }else{
        navigate("/");
      }
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data || error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "auth/order",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.order(formData);
      toast.success("Orderd Successfully!");
      navigate("/user/dashboard");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || error);
    }
  }
);


export const getOrders = createAsyncThunk(
  "auth/getOrders",
  async ({ orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.orders(orderStatus);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);
export const getOrder = createAsyncThunk(
  "auth/getOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.singleOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data, error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "auth/updateOrder",
  async ({ orderId, orderStatus, toast }, { rejectWithValue }) => {
    try {
      console.log(orderId, orderStatus);
      const response = await api.updateOrderStatus(orderId, orderStatus);
      toast.success("Order status updated Successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data, error);
    }
  }
);

export const getUserOrder = createAsyncThunk(
  "auth/getUserOrder",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.userOrder(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    orders: [],
    userOrder:[],
    order: [],
    error: "",
    loding: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
    resetError:(state, action)=>{
      state.error = "";
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loding = false;
        // console.log(action.payload);
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })
      .addCase(login.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loding = false;
        // console.log(action.payload);
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loding = false;
        // console.log(action.payload.message);
        state.error = action.payload.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loding = false;
        state.orders = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loding = false;
        console.log(action.payload);
        state.error = action.payload.message;
      })
      .addCase(getOrders.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loding = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loding = false;
        state.error = action.payload.message;
      })
      .addCase(getUserOrder.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.loding = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.loding = false;
        state.error = action.payload.message;
      })
      .addCase(getOrder.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loding = false;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loding = false;
        state.error = action.payload.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loding = true;
        state.error = "";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loding = false;
        state.order = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loding = false;
        state.error = action.payload.message;
      });
  },
});

export const { setUser, setLogout, resetError } = authSlice.actions;
export default authSlice.reducer;
