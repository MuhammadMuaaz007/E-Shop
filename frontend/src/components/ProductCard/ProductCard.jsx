import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";

import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  return (
    <>
      <div
        className="w-full h-[380px] bg-white rounded-2xl relative p-4 shadow-md cursor-pointer 
        hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
      >
        {/* Product Image */}
        <Link to={`/product/${product_name}`}>
          <img
            src={data?.images?.[0]?.url}
            alt=""
            className="w-full h-[160px] object-contain rounded-xl drop-shadow-sm 
            transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Shop Name */}
        <Link to="/">
          <h5 className={`${styles.shop_name} mt-2 `}>{data.shop.name}</h5>
        </Link>
        {/* Product Name */}
        <Link to={`/product/${product_name}`}>
          <h4 className="pt-1 font-[500] text-[18px] text-gray-800">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          {/* Stars */}
          <div className="flex mt-1">
            {[1, 2, 3, 4].map((_) => (
              <AiFillStar key={_} color="#F6BA00" size={20} className="mr-1" />
            ))}
            <AiOutlineStar color="#F6BA00" size={20} />
          </div>

          {/* Price & Sold */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <h5 className={`${styles.productDiscountPrice}`}>
                <h5 className={styles.productDiscountPrice}>
                  {data.discountPrice}$
                </h5>

                {data.originalPrice && (
                  <h4 className={`${styles.price} line-through text-gray-400`}>
                    {data.originalPrice}$
                  </h4>
                )}
              </h5>

              {data.price && (
                <h4 className={`${styles.price} line-through text-gray-400`}>
                  {data.price}$
                </h4>
              )}
            </div>

            <span className="font-[400] text-[15px] text-green-600">
              {data.sold_out} sold
            </span>
          </div>
        </Link>

        {/* Buttons Floating */}
        <div>
          {/* Wishlist Button */}
          {click ? (
            <AiFillHeart
              size={23}
              className="cursor-pointer absolute right-3 top-4 rounded-full h-[32px] w-[32px] p-1 
              bg-white shadow-md hover:bg-red-100 transition duration-300"
              onClick={() => setClick(!click)}
              color="red"
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={23}
              className="cursor-pointer absolute right-3 top-4 rounded-full h-[32px] w-[32px] p-1 
              bg-white shadow-md hover:bg-red-100 transition duration-300"
              onClick={() => setClick(!click)}
              color="#555"
              title="Add to wishlist"
            />
          )}

          {/* Quick View */}
          <AiOutlineEye
            size={23}
            className="cursor-pointer absolute right-3 top-14 rounded-full h-[32px] w-[32px] p-1 
            bg-white shadow-md hover:bg-blue-100 transition duration-300"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />

          {/* Add to Cart */}
          <AiOutlineShoppingCart
            size={23}
            className="cursor-pointer absolute right-3 top-24 rounded-full h-[32px] w-[32px] p-1 
            bg-white shadow-md hover:bg-green-100 transition duration-300"
            onClick={() => console.log("Add to cart")}
            color="#444"
            title="Add to cart"
          />
        </div>
      </div>

      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </>
  );
};

export default ProductCard;
