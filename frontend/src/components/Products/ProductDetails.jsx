import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import styles from "../../styles/styles";
// import { Link } from "react-router-dom";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const navigate = useNavigate();

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));
  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=5728nsdfiewvureyanfajkt");
  };

  return (
    <div className="bg-gradient-to-br w-full h-full from-purple-50 to-white">
      {data ? (
        <div className="w-full px-4 sm:px-3 lg:px-5 mx-auto">
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
              {/* -------------------- Product Image -------------------- */}
              <div className="py-2 flex items-center flex-col justify-center">
                {/* Fixed-height main image wrapper */}
                <div className="rounded-xl bg-white p-6 shadow-md flex items-center justify-center w-full h-[380px] max-w-[450px] overflow-hidden">
                  <img
                    src={data.images[select].url}
                    alt={data.name}
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Thumbnail images */}
                <div className="flex gap-4 w-full items-center justify-start mt-6 flex-wrap">
                  {data.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelect(idx)}
                      className={`${
                        select === idx ? "border-2 border-purple-600" : ""
                      } w-[90px] h-[90px] rounded-xl shadow-md p-1 cursor-pointer transition`}
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="w-full h-full object-contain hover:scale-105 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* -------------------- Product Details -------------------- */}
              <div>
                <div className="flex flex-col m-0 bg-white p-5 rounded-xl shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    {data.name}
                  </h2>

                  <p className="text-gray-600 mb-2">{data.description}</p>

                  {/* Price Info */}
                  {/* Price Info */}
                  <div className="flex justify-between text-right mt-2">
                    <div className="flex gap-2">
                      <span className="text-4xl font-semibold text-purple-600">
                        ${data.discountPrice} {/* use camelCase */}
                      </span>
                      {data.originalPrice &&
                        data.originalPrice > data.discountPrice && (
                          <span className="line-through text-gray-400">
                            ${data.originalPrice}
                          </span>
                        )}
                    </div>
                    <span className="text-purple-600 font-medium">
                      ({data.sold_out} sold)
                    </span>
                  </div>

                  {/* Quantity + Wishlist */}
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <button
                        onClick={decrement}
                        className="bg-purple-100 text-purple-700 font-bold w-10 h-10 flex items-center justify-center rounded-lg shadow-sm hover:bg-purple-200 transition text-[25px]"
                      >
                        -
                      </button>
                      <span className="font-bold text-2xl w-12 text-center text-purple-600">
                        {count}
                      </span>
                      <button
                        onClick={increment}
                        className="bg-purple-100 text-purple-700 font-bold w-10 h-10 flex items-center justify-center rounded-lg shadow-sm hover:bg-purple-200 transition text-[25px]"
                      >
                        +
                      </button>
                    </div>

                    <div
                      onClick={() => setWishlist(!wishlist)}
                      className="cursor-pointer text-4xl ml-4 p-1 rounded-full bg-white shadow-md hover:bg-red-500 hover:text-white transition duration-300"
                    >
                      {wishlist ? (
                        <AiFillHeart color="red" />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </div>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={() => alert(`Added ${count} items to cart`)}
                    className="bg-gradient-to-r from-purple-800 to-blue-500 text-white py-3 rounded-lg hover:scale-102 hover:shadow-xl transition  duration-300 text-xl mt-4"
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Shop Info */}
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-3 rounded-lg shadow-sm mt-7 mb-2 gap-4">
                  {/* LEFT SIDE */}
                  <Link to={`/shop/${data.shop._id}`}>
                    <div className="flex items-center space-x-2">
                      <img
                        src={data.shop.avatar.url}
                        alt="shop avatar"
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold cursor-pointer hover:text-purple-600 transition">
                          {data.shop.name}
                        </h3>
                        <div className="flex items-center bg-green-100 text-sm font-medium px-3 py-1 rounded">
                          ⭐⭐⭐⭐⭐ {data.shop.ratings}
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* RIGHT SIDE (BUTTON) */}
                  <button
                    onClick={handleMessageSubmit}
                    className="max-w-[300px] w-full flex bg-gradient-to-r from-purple-800 to-blue-500 text-white py-3 px-4 rounded-lg hover:scale-105 hover:shadow-xl transition items-center duration-300 justify-center mt-2 md:mt-0 mx-auto md:mx-0"
                  >
                    <AiOutlineMessage className="mr-2 text-xl" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;

import { useSelector, useDispatch } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { Link } from "react-router-dom";

const ProductDetailInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();

  // Get all products from Redux
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (data?.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
  }, [dispatch, data?.shop?._id]);

  // Count total products for this shop
  const totalProducts = products?.length || 0;

  // Format shop creation date
  const shopCreatedDate = data.shop?.createdAt
    ? new Date(data.shop.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const tabs = [
    { id: 1, label: "Product Details" },
    { id: 2, label: "Product Reviews" },
    { id: 3, label: "Seller Information" },
  ];

  return (
    <div className="bg-white px-4 md:px-6 lg:px-8 py-6 rounded-xl shadow-lg my-6 border border-gray-200 mx-4 md:mx-0">
      {/* ---------- TABS ---------- */}
      <div className="flex justify-between border-b pb-2">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative">
            <h5
              onClick={() => setActive(tab.id)}
              className={`text-[17px] md:text-[19px] font-semibold cursor-pointer px-2 transition-all duration-200 ${
                active === tab.id ? "text-purple-600" : "text-gray-700"
              }`}
            >
              {tab.label}
            </h5>

            {active === tab.id && (
              <div className="absolute bottom-[-6px] left-0 w-full h-[3px] bg-purple-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* ---------- PRODUCT DETAILS TAB ---------- */}
      {active === 1 && (
        <div className="mt-5 space-y-4">
          <p className="text-[17px] leading-8 text-gray-700 whitespace-pre-line p-2">
            {data.description}
          </p>
          <p className="text-[17px] leading-8 text-gray-700 whitespace-pre-line p-2">
            {data.description}
          </p>
          <p className="text-[17px] leading-8 text-gray-700 whitespace-pre-line p-2">
            {data.description}
          </p>
        </div>
      )}

      {/* ---------- REVIEWS TAB ---------- */}
      {active === 2 && (
        <div className="w-full flex justify-center items-center min-h-[40vh]">
          <p className="text-[18px] font-semibold text-gray-600">
            No reviews yet.
          </p>
        </div>
      )}

      {/* ---------- SELLER INFORMATION TAB ---------- */}
      {active === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <Link to={`/shop/${data.shop._id}`}>
              <div className="flex items-center gap-4">
                <img
                  src={data.shop.avatar.url}
                  alt="shop avatar"
                  className="h-16 w-16 rounded-full border shadow-sm "
                />

                <div>
                  <h3 className="text-xl font-semibold cursor-pointer hover:text-purple-600 transition">
                    {data.shop.name}
                  </h3>

                  <div className="flex items-center gap-2 bg-green-100 px-3 py-[4px] rounded-lg w-fit text-sm">
                    ⭐⭐⭐⭐⭐
                    <span className="text-green-800">{data.shop.ratings}</span>
                  </div>
                </div>
              </div>
            </Link>

            <p className="text-gray-700 leading-7 text-[16px] mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              reprehenderit explicabo doloremque perspiciatis molestiae, ratione
              maiores corporis amet!
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div className="text-left md:text-right space-y-3">
            <h5 className="font-semibold">
              Joined on:{" "}
              <span className="font-medium text-gray-700">
                {shopCreatedDate}
              </span>
            </h5>

            <h5 className="font-semibold">
              Total Products:{" "}
              <span className="font-medium text-gray-700">{totalProducts}</span>
            </h5>

            <h5 className="font-semibold">
              Total Reviews:{" "}
              <span className="font-medium text-gray-700">
                {data.shop.totalReviews}
              </span>
            </h5>

            <Link to={`/shop/${data.shop._id}`}>
              <button className="mt-5 bg-gradient-to-r from-purple-800 to-blue-500 text-white px-5 py-2 rounded-lg  hover:scale-105 hover:shadow-xl transition shadow duration-300">
                Visit Shop
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
