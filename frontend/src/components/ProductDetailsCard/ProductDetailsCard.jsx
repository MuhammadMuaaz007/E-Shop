import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../redux/actions/cart";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));
  const dispatch = useDispatch();
  const handleMessageSubmit = () => alert("Messaging feature coming soon!");
  
  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (count > data.stock) {
        toast.error(`Only ${data.stock} items in stock`);
        return;
      }
      const cartData = { ...data, qty: count };
      dispatch(addToCartAction(cartData));
      toast.success("Item added successfully");
    }
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 flex items-center justify-center z-50 bg-black/30">
      <div className="w-[90%] md:w-[80%] h-[90vh] md:h-[75vh] bg-white rounded-2xl shadow-lg p-6 relative overflow-y-auto">
        {/* Close Button */}
        <RxCross1
          size={30}
          className="absolute top-4 right-4 cursor-pointer z-20"
          onClick={() => setOpen(false)}
        />

        <div className="md:flex md:space-x-6">
          {/* Left Column */}

          <div className="md:w-1/2 flex flex-col items-center mb-6 md:mb-0">
            <img
              src={data?.images?.[0]?.url}
              alt="product"
              className="w-full h-[350px] object-contain rounded-2xl mb-4"
            />
            <div className="w-full flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
              <Link
                to={`/shop/${data.shop._id}`}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={data?.shop?.avatar?.url}
                    alt="shop avatar"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <h3 className="text-lg font-semibold">{data.shop.name}</h3>
                </div>
              </Link>
              <div className="flex items-center bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                ⭐ {data.shop.ratings}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p className="mt-4 text-gray-700">{data.description}</p>

            {/* Price & Quantity */}
            <div className="mt-4 flex justify-between items-center">
              {/* Quantity Selector + Wishlist */}
              <div className="flex items-center gap-0">
                <button
                  onClick={decrement}
                  className="bg-purple-100 text-purple-700 font-bold w-10 h-10 flex items-center justify-center rounded-lg shadow-sm hover:bg-purple-200 transition text-[25px]"
                >
                  -
                </button>
                <span className="font-bold text-2xl w-12 text-center">
                  {count}
                </span>
                <button
                  onClick={increment}
                  className="bg-purple-100 text-purple-700 font-bold w-10 h-10 flex items-center justify-center rounded-lg shadow-sm hover:bg-purple-200 transition text-[25px]"
                >
                  +
                </button>

                <div
                  onClick={() => setWishlist(!wishlist)}
                  className="cursor-pointer text-2xl ml-4"
                >
                  {wishlist ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                </div>
              </div>

              {/* Price Info */}
              <div className="flex flex-col text-right">
                <span className="text-xl font-semibold text-gray-900">
                  ${data.discountPrice}
                </span>

                {data.originalPrice > data.discountPrice && (
                  <span className="line-through text-gray-400">
                    ${data.originalPrice}
                  </span>
                )}

                <span className="text-green-600 font-medium">
                  ({data.sold_out} sold)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button
                onClick={handleMessageSubmit}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center"
              >
                <AiOutlineMessage className="inline mr-2 text-xl" />
                Send Message
              </button>
              <button
                onClick={() => addToCartHandler(data._id)}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
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
