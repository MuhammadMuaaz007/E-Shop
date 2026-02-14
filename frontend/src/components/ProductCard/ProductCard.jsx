import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../redux/actions/wishlist";
import Ratings from "../Products/Ratings";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);

  // 👉 Create SEO-friendly slug
  const product_slug = `${data._id}`;

  // 👉 Format numbers (1000 → 1k)
  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num;
  };

  // 👉 Wishlist handlers
  const addToWishlistHandler = () => {
    dispatch(addToWishlistAction(data));
    toast.success("Added to wishlist");
  };

  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlistAction(data));
    toast.info("Removed from wishlist");
  };

  // 👉 Add to cart handler
  const addToCartHandler = (id) => {
    const isItemExist = cart?.some((i) => i._id === id);

    if (isItemExist) {
      toast.error("Item already in cart");
      return;
    }

    dispatch(addToCartAction({ ...data, qty: 1 }));
    toast.success("Item added to cart");
  };

  useEffect(() => {
    setClick(wishlist?.some((i) => i._id === data._id));
  }, [wishlist, data._id]);

  // 👉 Rating logic
  const rating = Math.round(data?.ratings || 0);

  return (
    <>
      <div
        className="w-full h-[380px] bg-white rounded-2xl relative p-4 shadow-md cursor-pointer 
        hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
      >
        {/* Product Image */}
        <Link to={`/product/${product_slug}`}>
          <img
            src={data?.images?.[0]?.url || "/placeholder.png"}
            alt={data.name}
            className="w-full h-[160px] object-contain rounded-xl drop-shadow-sm 
            transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Shop Name */}
        <Link to={`/shop/${data.shop._id}`}>
          <h5 className={`${styles.shop_name} mt-2`}>{data.shop.name}</h5>
        </Link>

        {/* Product Name */}
        <Link to={`/product/${product_slug}`}>
          <h4 className="pt-1 font-[500] text-[18px] text-gray-800">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          {/* Rating Stars */}
          <div className="flex mt-1">
            <Ratings rating={rating} />
          </div>

          {/* Price & Sold */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex gap-0.5 items-center">
              <span className={styles.productDiscountPrice}>
                {formatNumber(data.discountPrice)}$
              </span>

              {data.originalPrice && (
                <span className={`${styles.price} line-through text-gray-400`}>
                  {formatNumber(data.originalPrice)}$
                </span>
              )}
            </div>

            <span className="font-[400] text-[15px] text-green-600">
              {formatNumber(data.sold_out)} sold
            </span>
          </div>
        </Link>

        {/* Floating Buttons */}
        <div>
          {/* Wishlist */}
          {click ? (
            <AiFillHeart
              size={23}
              className="cursor-pointer absolute right-3 top-4 rounded-full h-[32px] w-[32px] p-1 
              bg-white shadow-md hover:bg-red-100 transition"
              onClick={removeFromWishlistHandler}
              color="red"
            />
          ) : (
            <AiOutlineHeart
              size={23}
              className="cursor-pointer absolute right-3 top-4 rounded-full h-[32px] w-[32px] p-1 
              bg-white shadow-md hover:bg-red-100 transition"
              onClick={addToWishlistHandler}
              color="#555"
            />
          )}

          {/* Quick View */}
          <AiOutlineEye
            size={23}
            className="cursor-pointer absolute right-3 top-14 rounded-full h-[32px] w-[32px] p-1 
            bg-white shadow-md hover:bg-blue-100 transition"
            onClick={() => setOpen(true)}
            color="#333"
          />

          {/* Add to Cart */}
          <AiOutlineShoppingCart
            size={23}
            className="cursor-pointer absolute right-3 top-24 rounded-full h-[32px] w-[32px] p-1 
            bg-white shadow-md hover:bg-green-100 transition"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
          />
        </div>
      </div>

      {/* Product Quick View */}
      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </>
  );
};

export default ProductCard;
