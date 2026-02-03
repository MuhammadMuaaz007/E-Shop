import { createSlice } from "@reduxjs/toolkit";

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    error: null,
    createSuccess: false, // used for order creation, maybe not needed here
    orders: [],
    isLoading: false,
  },
  reducers: {
    getAllOrdersUserRequest: (state) => {
      state.isLoading = true;
    },
    getAllOrdersUserSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.success = true; // This is fine, but 'success' should be in initialState
    },
    getAllOrdersUserFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false; // same here
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  clearErrors,
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
  getAllOrdersUserFail,
} = orderReducer.actions;

export default orderReducer.reducer;
