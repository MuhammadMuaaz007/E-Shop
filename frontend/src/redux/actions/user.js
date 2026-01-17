import axios from "axios";
import { server } from "../../server";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  UpdateUserInfoRequest,
  UpdateUserInfoSuccess,
  UpdateUserInfoFailed,
  UpdateUserAddressRequest,
  UpdateUserAddressSuccess,
  UpdateUserAddressFailed,
} from "../reducers/user";
import {
  LoadSellerFail,
  LoadSellerRequest,
  LoadSellerSuccess,
} from "../reducers/seller";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(LoadUserFail(error.response.data?.message));
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
    dispatch(LoadSellerFail(error.response.data?.message));
  }
};

// user update information
export const updateUserInformation =
  ({ name, email, phoneNumber, password }) =>
  async (dispatch) => {
    try {
      dispatch(UpdateUserInfoRequest());
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          name,
          email,
          phoneNumber,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(UpdateUserInfoSuccess(data?.user));
    } catch (error) {
      dispatch(UpdateUserInfoFailed(error.response.data?.message));
    }
  };

export const updateUserAddresses =
  ({ country, city, address1, address2, zipCode, addressType }) =>
  async (dispatch) => {
    try {
      dispatch(UpdateUserAddressRequest());
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          addresses: {
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType,
          },
        },
        { withCredentials: true }
      );
      dispatch(UpdateUserAddressSuccess(data?.user));
    } catch (error) {
      dispatch(UpdateUserAddressFailed(error.response.data?.message));
    }
  };
