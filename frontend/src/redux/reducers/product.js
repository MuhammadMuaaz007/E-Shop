import { createSlice } from "@reduxjs/toolkit";

export const productReducer = createSlice({
  name: "product",
  initialState: {
    error: null,
    createSuccess: false,
    products: [],
    allProducts: [],
    isLoading: false,
  },
  reducers: {
    productCreateRequest: (state) => {
      state.isLoading = true;
    },
    productCreateSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.createSuccess = true;
    },
    productCreateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.createSuccess = false;
    },
    resetCreateProduct: (state) => {
      state.createSuccess = false;
    },

    // get all products of shop
    getAllProductsShopRequest: (state) => {
      state.isLoading = true;
    },
    getAllProductsShopSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    },
    getAllProductsShopFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    // delete shop product
    deleteProductRequest: (state) => {
      state.isLoading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.isLoading = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.success = true;
    },

    deleteProductFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    getAllProductsRequest: (state) => {
      state.isLoading = true;
    },
    getAllProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    },
    getAllProductsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});
export const {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  clearErrors,
  getAllProductsShopRequest,
  getAllProductsShopSuccess,
  getAllProductsShopFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  resetCreateProduct,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailed,
} = productReducer.actions;

export default productReducer.reducer;
