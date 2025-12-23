import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiMinus } from "react-icons/hi";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: "iPhone 14 Pro",
      description: "Apple iPhone 14 Pro with A16 Bionic chip and 128GB storage",
      price: 1199,
    },
    {
      name: "Samsung Galaxy S23",
      description:
        "Samsung Galaxy S23 smartphone with Snapdragon 8 Gen 2 processor",
      price: 999,
    },
  ];

  return (
    <div className="fixed top-0 right-0 w-full h-screen z-10 bg-[#0000004b]">
      <div className="fixed top-0 right-0 min-h-full bg-white w-[30%] shadow-2xl flex flex-col ">
        <div className="p-4 flex justify-end">
          <AiOutlineClose
            className="cursor-pointer text-2xl"
            onClick={() => setOpenCart(false)}
            color="red"
            size={35}
          />
        </div>
        <div className={`${styles.normalFlex} p-4`}>
          <IoBagHandleOutline size={25} />
          <h5 className="pl-2 text-[20px] font-500">3 Items</h5>
        </div>
        <br />
        {/* Cart Items */}
        <div className="w-full border-t overflow-y-auto max-h-[63vh] pr-2">
          {cartData &&
            cartData.map((i, index) => <SingleCart key={index} data={i} />)}
        </div>

        {/* Bottom Checkout Section */}
        <div className="p-4 bg-white shadow-inner flex flex-col mt-auto">
          <Link
            to="/checkout"
            className="w-full inline-block text-center bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white py-3 rounded-full font-semibold shadow transition "
          >
            Checkout Now (USD$1058)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
const SingleCart = ({ data }) => {
  const [value, setValue] = useState(1);
  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = data.price * value;

  return (
    <div className="border-b border-gray-300 p-4 relative">
      {/* ❌ REMOVE BUTTON */}
      <button className="absolute top-3 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 border border-gray-400 text-gray-600 hover:bg-red-500 hover:text-white transition-shadow shadow-md hover:shadow-lg">
        <AiOutlineClose size={16} title="Remove Item" />
      </button>
      <div className="w-full flex items-center">
        {/* + and - buttons */}
        <div className="flex items-center flex-col">
          <button
            onClick={increment}
            className="bg-green-500 hover:bg-green-600 active:bg-green-700 font-bold 
            w-8 h-8 flex items-center justify-center rounded-full shadow-sm transition"
          >
            <HiPlus size={15} color="white" />
          </button>

          <span className="font-bold text-xl w-10 text-center my-1">
            {value}
          </span>

          <button
            onClick={decrement}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 font-bold 
            w-8 h-8 flex items-center justify-center rounded-full shadow-sm transition"
          >
            <HiMinus size={15} color="white" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src="https://res.cloudinary.com/junaidshaukat/image/upload/v1751570174/products/product-1751570170239-549601354-0.png"
          alt={data.name}
          className="w-20 h-20 object-cover ml-4 rounded"
        />

        {/* Product Info */}
        <div className="pl-5 w-full">
          <h1 className="font-semibold text-[17px]">{data.name}</h1>
          <p className="text-gray-600 text-sm">{data.description}</p>

          <h5 className="w-fit bg-purple-500 text-white px-2 py-1 rounded font-bold mt-1 text-sm">
            ${data.price} each
          </h5>

          <p className="text-sm mt-1">
            Price for <b>{value}</b> items
          </p>

          <h4 className="font-bold text-lg text-green-600">${totalPrice}</h4>
        </div>
      </div>
    </div>
  );
};
