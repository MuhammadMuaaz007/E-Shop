import axios from "axios";
import { server } from "../../server";
import {
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  getAllProductsFailed,
  getAllProductsRequest,
  getAllProductsShopFail,
  getAllProductsShopRequest,
  getAllProductsShopSuccess,
  getAllProductsSuccess,
  productCreateFail,
  productCreateRequest,
  productCreateSuccess,
} from "../reducers/product";

export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch(productCreateRequest());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );
    dispatch(productCreateSuccess(data));
  } catch (error) {
    dispatch(productCreateFail(error.response.data.message));
  }
};

// get All products of shop

export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllProductsShopRequest());
    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch(getAllProductsShopSuccess(data.products));
  } catch (error) {
    dispatch(getAllProductsShopFail(error.response.data.message));
  }
};

// delete product of shop

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    await axios.delete(`${server}/product/delete-shop-product/${id}`);

    // Pass deleted product ID
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch(getAllProductsSuccess(data.allProducts));
  } catch (error) {
    dispatch(getAllProductsFailed(error.response.data.message));
  }
};
