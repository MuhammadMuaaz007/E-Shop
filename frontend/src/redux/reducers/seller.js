import { createSlice } from "@reduxjs/toolkit";

// import { isSeller } from "../../../../backend/middleware/auth";

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    isLoading: true,
    isSeller: false,
  },
  reducers: {
    LoadSellerRequest: (state) => {
      state.isLoading = true;
    },
    LoadSellerSuccess: (state, action) => {
      state.isLoading = false;
      state.isSeller = true;
      state.seller = action.payload;
    },
    LoadSellerFail: (state, action) => {
      state.isLoading = false;
      state.isSeller = false;
      state.error = action.payload;
    },
    ClearErrors: (state) => {
      state.error = null;
    },
    logoutSeller: (state) => {
      state.seller = null;
      state.isSeller = false;
    },
  },
});

export const {
  LoadSellerRequest,
  LoadSellerSuccess,
  LoadSellerFail,
  ClearErrors,
  logoutSeller,
} = sellerSlice.actions;

export default sellerSlice.reducer;
