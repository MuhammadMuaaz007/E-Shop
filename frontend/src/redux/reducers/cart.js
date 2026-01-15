import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ ADD TO CART
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);

      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cart.push(item);
      }
    },

    // ❌ REMOVE FROM CART
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartReducer.actions;
export default cartReducer.reducer;
