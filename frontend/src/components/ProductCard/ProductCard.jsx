import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../redux/actions/cart";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import Ratings from "../Products/Ratings";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
   const { products } = useSelector((state) => state.product);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);

  const product_slug = `${data._id}`;
  
  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return num;
  };
    const totalReviews =
    products &&
    products.reduce(
      (acc, product) => acc + (product.reviews ? product.reviews.length : 0),
      0,
    );
  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0,
    );

  const avg = totalRatings / totalReviews || 0;

  const averageRating = avg.toFixed(2);

  const addToWishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToWishlistAction(data));
    toast.success("Added to wishlist");
  };

  const removeFromWishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromWishlistAction(data));
    toast.info("Removed from wishlist");
  };

  const addToCartHandler = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const isItemExist = cart?.some((i) => i._id === id);
    if (isItemExist) return toast.error("Item already in cart");
    dispatch(addToCartAction({ ...data, qty: 1 }));
    toast.success("Item added to cart");
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  useEffect(() => {
    setClick(wishlist?.some((i) => i._id === data._id));
  }, [wishlist, data._id]);

  const rating = Math.round(data?.ratings || 0);

  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
        {/* Image */}
        <div className="relative group">
          <Link to={`/product/${product_slug}`}>
            <img
              src={data?.images?.[0]?.url || "/placeholder.png"}
              alt={data.name}
              className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Floating Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
            {click ? (
              <AiFillHeart
                size={24}
                className="p-1 bg-white rounded-full shadow-md cursor-pointer hover:bg-red-100"
                color="red"
                onClick={removeFromWishlistHandler}
              />
            ) : (
              <AiOutlineHeart
                size={24}
                className="p-1 bg-white rounded-full shadow-md cursor-pointer hover:bg-red-100"
                color="#555"
                onClick={addToWishlistHandler}
              />
            )}

            <AiOutlineEye
              size={24}
              className="p-1 bg-white rounded-full shadow-md cursor-pointer hover:bg-blue-100"
              onClick={handleQuickView}
            />

            <AiOutlineShoppingCart
              size={24}
              className="p-1 bg-white rounded-full shadow-md cursor-pointer hover:bg-green-100"
              onClick={(e) => addToCartHandler(e, data._id)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <Link to={`/shop/${data.shop._id}`}>
            <h5 className={`${styles.shop_name} text-sm text-gray-500 mb-1`}>
              {data.shop.name}
            </h5>
          </Link>

          <Link to={`/product/${product_slug}`} className="block mb-2">
            <h4 className="font-medium text-gray-800 text-[16px] line-clamp-2">
              {data.name}
            </h4>
          </Link>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <Ratings rating={rating} />
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-800">
                {formatNumber(data.discountPrice)}$
              </span>
              {data.originalPrice && (
                <span className="text-gray-400 line-through">
                  {formatNumber(data.originalPrice)}$
                </span>
              )}
            </div>
            <span className="text-green-600 text-sm">
              {formatNumber(data.sold_out)} sold
            </span>
          </div>

          {/* Tags */}
          <div className="mt-auto flex flex-wrap gap-1">
            {data.tags &&
              data.tags
                .split(" ")
                .slice(0, 3)
                .map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag.length > 6 ? tag.slice(0, 6) + "..." : tag}
                  </span>
                ))}
            {data.tags && data.tags.split(" ").length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                +{data.tags.split(" ").length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View */}
      {open && <ProductDetailsCard setOpen={setOpen} data={data} averageRating={averageRating}/>}
    </>
  );
};

export default ProductCard;
