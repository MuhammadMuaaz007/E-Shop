import axios from "axios";
import { server } from "../../server";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
} from "../reducers/user"; 
import { LoadSellerFail, LoadSellerRequest, LoadSellerSuccess } from "../reducers/seller";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(LoadUserFail(error.response.data.message));
  }
};
//load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch(LoadSellerRequest());
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch(LoadSellerSuccess(data.seller));
  } catch (error) {
    dispatch(LoadSellerFail(error.response.data.message));
  }
};
