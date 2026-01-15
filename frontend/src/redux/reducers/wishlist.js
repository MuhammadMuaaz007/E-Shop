import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // ➕ ADD TO CART
    addToWishlist: (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);

      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.wishlist.push(item);
      }
    },

    // ❌ REMOVE FROM CART
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
    },

    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistReducer.actions;
export default wishlistReducer.reducer;