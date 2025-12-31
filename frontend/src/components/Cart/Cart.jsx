import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
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

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const dispatch = useDispatch();
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
        {/* Close Button */}
        <div className="p-4 flex justify-end">
          <AiOutlineClose
            className="cursor-pointer text-2xl"
            onClick={() => setOpenCart(false)}
            color="red"
            size={30}
          />
        </div>

        {/* Cart Header */}
        <div className="flex items-center p-4 space-x-2 border-b">
          <IoBagHandleOutline size={25} />
          <h5 className="text-lg sm:text-xl font-semibold">
            {totalItems} {totalItems > 1 ? "Items" : "Item"}
          </h5>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {cart.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty
            </p>
          )}
          {cart.map((item) => (
            <SingleCart
              key={item._id}
              data={item}
              removeFromCartHandler={removeFromCartHandler}
              quantityChangeHandler={quantityChangeHandler}
            />
          ))}
        </div>

        {/* Checkout Section */}
        <div className="p-4 border-t bg-white shadow-inner">
          <div className="flex justify-between mb-3">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="w-full inline-block text-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold shadow transition"
          >
            Checkout Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// ---------------- SingleCart ----------------
const SingleCart = ({ data, removeFromCartHandler, quantityChangeHandler }) => {
  const [value, setValue] = useState(data.qty ? data.qty : 1);

  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (value >= data.stock) {
      toast.error(`Only ${data.stock} items in stock`);
      return;
    } else {
      setValue(value + 1);
      const updatedData = { ...data, qty: value + 1 };
      quantityChangeHandler(updatedData);
    }
  };
  const decrement = (data) => {
    if (value === 1) return;
    setValue(value - 1);
    const updatedData = { ...data, qty: value - 1 };
    quantityChangeHandler(updatedData);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start border-b border-gray-300 py-3 relative">
      {/* Remove Button */}
      <button
        onClick={() => removeFromCartHandler(data)}
        className="absolute top-2 right-1 w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 border text-gray-600 hover:bg-red-500 hover:text-white transition"
      >
        <AiOutlineClose size={16} title="Remove Item" />
      </button>

      {/* Quantity Buttons */}
      <div className="flex items-center flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-1">
        <button
          onClick={() => increment(data)}
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 w-8 h-8 flex items-center justify-center rounded-full text-white shadow-sm transition"
        >
          <HiPlus size={15} />
        </button>
        <span className="font-bold text-lg w-8 text-center">
          {value ? value : 1}
        </span>
        <button
          onClick={() => decrement(data)}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 w-8 h-8 flex items-center justify-center rounded-full text-white shadow-sm transition"
        >
          <HiMinus size={15} />
        </button>
      </div>

      {/* Product Image */}
      <img
        src={data.images?.[0]?.url}
        alt={data.name}
        className="w-20 h-20 object-cover rounded mt-2 sm:mt-0 sm:ml-4"
      />

      {/* Product Info */}
      <div className="flex-1 pl-0 sm:pl-4 mt-2 sm:mt-0">
        <h1 className="font-semibold text-base sm:text-[16px]">{data.name}</h1>
        <h5 className="w-fit bg-purple-500 text-white px-2 py-1 rounded font-bold mt-1 text-xs sm:text-sm">
          ${data.discountPrice} each
        </h5>
        <p className="text-sm mt-1">
          Price for <b>{value}</b> items
        </p>
        <h4 className="font-bold text-green-600 text-lg">${totalPrice}</h4>
      </div>
    </div>
  );
};
