import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiPlus, HiMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0,
  );

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCartAction(data));
    toast.success("Item removed from cart");
  };

  const quantityChangeHandler = (data) => {
    dispatch(addToCartAction(data));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="bg-white w-full sm:w-[400px] md:w-[450px] lg:w-[30%] h-full flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h5 className="text-lg sm:text-xl font-semibold">
            Cart ({totalItems} {totalItems > 1 ? "Items" : "Item"})
          </h5>
          <AiOutlineClose
            className="cursor-pointer text-2xl text-red-500"
            onClick={() => setOpenCart(false)}
          />
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <SingleCart
                key={item._id}
                data={item}
                removeFromCartHandler={removeFromCartHandler}
                quantityChangeHandler={quantityChangeHandler}
              />
            ))
          )}
        </div>

        {/* Checkout Section */}
        {cart.length > 0 && (
          <div className="p-4 border-t bg-white shadow-inner">
            <div className="flex justify-between mb-3">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              className="w-full inline-block text-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold shadow transition"
            >
              Checkout Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

// ---------------- SingleCart ----------------
const SingleCart = ({ data, removeFromCartHandler, quantityChangeHandler }) => {
  const [value, setValue] = useState(data.qty || 1);

  // Helper function to format big numbers
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"; // 1500 -> 1.5k, 1000 -> 1k
    }
    return num;
  };

  const totalPrice = formatNumber(data.discountPrice * value);
  const priceEach = formatNumber(data.discountPrice);

  const increment = () => {
    if (value >= data.stock) {
      toast.error(`Only ${data.stock} items in stock`);
      return;
    }
    const newQty = value + 1;
    setValue(newQty);
    quantityChangeHandler({ ...data, qty: newQty });
  };

  const decrement = () => {
    if (value === 1) return;
    const newQty = value - 1;
    setValue(newQty);
    quantityChangeHandler({ ...data, qty: newQty });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center border-b border-gray-300 py-3 relative">
      {/* Product Image */}
      <img
        src={data.images?.[0]?.url || "/placeholder.png"}
        alt={data.name}
        className="w-20 h-20 object-cover rounded flex-shrink-0"
      />

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between ml-4">
        <div className="overflow-hidden">
          <h1 className="font-semibold text-[16px] line-clamp-2">
            {data.name}
          </h1>
          {data.description && (
            <p className="text-gray-500 text-sm line-clamp-3 mt-1">
              {data.description}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="bg-purple-500 text-white px-2 py-1 rounded font-semibold text-sm">
            ${priceEach} each
          </span>
          {/* Live total for this item */}
          <h4 className="font-bold text-green-600 text-lg">${totalPrice}</h4>
        </div>
      </div>

      {/* Quantity & Remove Buttons */}
      <div className="flex flex-col items-center justify-between ml-4">
        <button
          onClick={() => removeFromCartHandler(data)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 border border-gray-400 text-gray-600 hover:bg-red-500 hover:text-white transition"
        >
          <AiOutlineClose size={16} />
        </button>

        <div className="flex flex-col items-center mt-2 space-y-1">
          <button
            onClick={increment}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          >
            <HiPlus size={15} />
          </button>
          <span className="font-bold text-lg">{value}</span>
          <button
            onClick={decrement}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            <HiMinus size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
