import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";

export const addToWishlistAction = (data) => async (dispatch, getState) => {
  dispatch(addToWishlist(data));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

export const removeFromWishlistAction =
  (data) => async (dispatch, getState) => {
    dispatch(removeFromWishlist(data._id));
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(getState().wishlist.wishlist)
    );
    return data;
  };
