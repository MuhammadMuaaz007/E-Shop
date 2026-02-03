import axios from "axios";
import { server } from "../../server";
import {
  getAllOrdersUserFail,
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
} from "../reducers/order";

//get all orders of user
export const getAllOrdersUser = (userId) => async (dispatch) => {
  console.log("Fetching orders for user:", userId);
  try {
    dispatch(getAllOrdersUserRequest());
    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`,
      { withCredentials: true }, // This is fine if your backend uses cookies for auth
    );
    console.log("API response for orders:", data);
    if (!data.orders || data.orders.length === 0) {
      console.warn("No orders found for user:", userId);
    }
    dispatch(getAllOrdersUserSuccess(data.orders));
  } catch (error) {
    console.error("Error fetching orders:", error);
    dispatch(
      getAllOrdersUserFail(error.response?.data?.message || error.message),
    );
  }
};
