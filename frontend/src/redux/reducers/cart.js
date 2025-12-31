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
      const isItemExist = state.cart.find((i) => i._id === item._id); // Kya product pehle se cart mein hai?

      if (isItemExist) {
        // Agar pehle se mojood hai → update
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        // Agar nahi hai → add
        state.cart.push(item);
      }
      // ✅ localStorage update
      // localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    // ❌ REMOVE FROM CART
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);

    },

    // 🧹 CLEAR CART (optional but useful)
    clearCart: (state) => {
      state.cart = [];
      // localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartReducer.actions;
export default cartReducer.reducer;
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,

//   reducers: {
//     // ➕ ADD TO CART
//     addToCart: (state, action) => {
//       const item = action.payload;

//       const isItemExist = state.cart.find(
//         (i) => i._id === item._id
//       ); // Kya product pehle se cart mein hai?

//       if (isItemExist) {
//         // Agar pehle se mojood hai → update
//         state.cart = state.cart.map((i) =>
//           i._id === isItemExist._id ? item : i
//         );
//       } else {
//         // Agar nahi hai → add
//         state.cart.push(item);
//       }

//       // ✅ localStorage update
//       localStorage.setItem(
//         "cartItems",
//         JSON.stringify(state.cart)
//       );
//     },

//     // ❌ REMOVE FROM CART
//     removeFromCart: (state, action) => {
//       state.cart = state.cart.filter(
//         (i) => i._id !== action.payload
//       );

//       // ✅ localStorage update
//       localStorage.setItem(
//         "cartItems",
//         JSON.stringify(state.cart)
//       );
//     },

//     // 🧹 CLEAR CART (optional but useful)
//     clearCart: (state) => {
//       state.cart = [];
//       localStorage.removeItem("cartItems");
//     },
//   },
// });
