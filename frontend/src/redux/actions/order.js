import axios from "axios";
import { server } from "../../server";
import {
  getAllOrdersSellerFail,
  getAllOrdersSellerRequest,
  getAllOrdersSellerSuccess,
  getAllOrdersUserFail,
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
} from "../reducers/order";

//get all orders of user
export const getAllOrdersUser = (userId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersUserRequest());
    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`,
      { withCredentials: true }, // This is fine if your backend uses cookies for auth
    );
    dispatch(getAllOrdersUserSuccess(data.orders));
  } catch (error) {
    console.error("Error fetching orders:", error);
    dispatch(
      getAllOrdersUserFail(error.response?.data?.message || error.message),
    );
  }
};

// get all orders of seller

export const getAllOrdersSeller = (shopId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersSellerRequest());
    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`,
      { withCredentials: true },
    );
    dispatch(getAllOrdersSellerSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersSellerFail(error.response?.data?.message));
  }
};
