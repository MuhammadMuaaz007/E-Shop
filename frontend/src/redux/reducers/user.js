import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    UpdateUserInfoRequest: (state) => {
      state.loading = true;
    },
    UpdateUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    UpdateUserInfoFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateUserAddressRequest: (state) => {
      state.AddressLoading = true;
    },
    UpdateUserAddressSuccess: (state, action) => {
      state.AddressLoading = false;
      state.user = action.payload;
      state.updateAddressSuccessMessage = "Address added successfully!";
    },

    UpdateUserAddressFailed: (state, action) => {
      state.AddressLoading = false;
      state.error = action.payload;
    },
    ClearErrors: (state) => {
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  ClearErrors,
  logoutUser,
  UpdateUserInfoRequest,
  UpdateUserInfoSuccess,
  UpdateUserInfoFailed,
  UpdateUserAddressRequest,
  UpdateUserAddressSuccess,
  UpdateUserAddressFailed,
} = userSlice.actions;

export default userSlice.reducer;
