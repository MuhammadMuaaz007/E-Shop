import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../redux/actions/cart";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  /* ================= Quantity ================= */
  const increment = () => {
    if (count < data.stock) {
      setCount((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  /* ================= Cart ================= */
  const addToCartHandler = (id) => {
    const isItemExist = cart.find((i) => i._id === id);

    if (isItemExist) {
      toast.error("Item already in cart!");
      return;
    }

    if (count > data.stock) {
      toast.error(`Only ${data.stock} items in stock`);
      return;
    }

    const cartData = { ...data, qty: count };
    dispatch(addToCartAction(cartData));
    toast.success("Item added successfully");
  };

  /* ================= Wishlist ================= */
  const addToWishlistHandler = () => {
    setClick(true);
    dispatch(addToWishlistAction(data));
  };

  const removeFromWishlistHandler = () => {
    setClick(false);
    dispatch(removeFromWishlistAction(data));
  };

  useEffect(() => {
    if (wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/30 z-50 flex items-center justify-center">
      <div className="w-[90%] md:w-[80%] h-[90vh] md:h-[75vh] bg-white rounded-2xl p-6 shadow-lg relative overflow-y-auto">
        
        {/* Close */}
        <RxCross1
          size={30}
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setOpen(false)}
        />

        <div className="md:flex gap-6">
          
          {/* ================= Left ================= */}
          <div className="md:w-1/2">
            <img
              src={data?.images?.[0]?.url}
              alt="product"
              className="w-full h-[350px] object-contain rounded-2xl"
            />

            <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 rounded-lg">
              <Link to={`/shop/${data.shop._id}`} className="flex items-center gap-3">
                <img
                  src={data?.shop?.avatar?.url}
                  alt="shop"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <h3 className="font-semibold text-lg">{data.shop.name}</h3>
              </Link>

              <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
                ⭐ {data.shop.ratings}
              </span>
            </div>
          </div>

          {/* ================= Right ================= */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <p className="mt-3 text-gray-700">{data.description}</p>

              {/* Quantity + Wishlist */}
              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={decrement}
                    className="w-10 h-10 bg-purple-100 text-purple-700 rounded-lg text-xl"
                  >
                    -
                  </button>

                  <span className="w-12 text-center font-bold text-xl">
                    {count}
                  </span>

                  <button
                    onClick={increment}
                    className="w-10 h-10 bg-purple-100 text-purple-700 rounded-lg text-xl"
                  >
                    +
                  </button>

                  <div className="ml-4 text-2xl cursor-pointer">
                    {click ? (
                      <AiFillHeart
                        color="red"
                        onClick={removeFromWishlistHandler}
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={addToWishlistHandler}
                      />
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <h4 className="text-xl font-semibold text-gray-900">
                    ${data.discountPrice}
                  </h4>

                  {data.originalPrice > data.discountPrice && (
                    <span className="line-through text-gray-400">
                      ${data.originalPrice}
                    </span>
                  )}

                  <p className="text-green-600 text-sm">
                    ({data.sold_out} sold)
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center"
                onClick={() => alert("Messaging feature coming soon")}
              >
                <AiOutlineMessage className="mr-2 text-xl" />
                Send Message
              </button>

              <button
                className="flex-1 bg-green-600 text-white py-3 rounded-lg"
                onClick={() => addToCartHandler(data._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
