import { useState } from "react";
import styles from "../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import CountDown from "./CountDown";

const EventCard = () => {
  const [open, setOpen] = useState(false);
  const shoes = {
    id: 5,
    category: "Shoes",
    name: "New Trend shoes for gents with all sizes",
    description:
      "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
    image_Url: [
      {
        public_id: "test",
        url: "https://pics.clipartpng.com/Orange_Sneakers_PNG_Clipart-391.png",
      },
      {
        public_id: "test",
        url: "https://mirzacdns3.s3.ap-south-1.amazonaws.com/cache/catalog/RLV0015/2-800x800.jpg",
      },
    ],
    shop: {
      name: "Alisha Shoes Mart",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    price: 120,
    discount_price: 89,
    rating: 5,
    total_sell: 49,
    stock: 10,
    // category: "Shoes",
  };
  return (
    <div
      className={`w-full bg-white  shadow-lg p-5 lg:flex lg:gap-8 border-gray-100 
      hover:shadow-xl transition-shadow duration-300
      }`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative">
        <img
          src={shoes.image_Url[0].url}
          alt="Trendy Shoes"
          className="w-[80%] md:w-[90%] lg:w-full h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
        />

        {/* Optional Badge */}
        <span
          className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-purple-400
          text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md"
        >
          Hot Deal 🔥
        </span>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col mt-5 lg:mt-0">
        {/* Title */}
        <h2
          className={`${styles.productTitle} text-2xl lg:text-3xl font-semibold text-gray-800 leading-snug`}
        >
          New Trend Shoes for Gents - All Sizes
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm lg:text-base leading-relaxed mt-4">
          {shoes.description}
        </p>

        {/* Price & Sold Info */}
        <div className="flex py-3 justify-between items-center">
          <div className="flex space-x-2 items-center">
            <h5 className="font-medium text-[17px] text-gray-400 line-through">
              ${shoes.price}
            </h5>
            <h5 className="font-bold text-[22px] text-purple-600 font-roboto">
              ${shoes.discount_price}
            </h5>
          </div>

          <span className="font-medium text-[17px] text-purple-500">
            {shoes.total_sell} Sold Out
          </span>
        </div>

        {/* Countdown */}
        <div className="mt-3">
          <CountDown />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-5">
          {/* See Details Button */}
          <button
            className="w-1/2 py-3 rounded-xl bg-purple-600 text-white font-medium
            hover:bg-purple-700 transition duration-300 shadow-md"
            onClick={() => setOpen(true)}
          >
            See Details
          </button>

          {/* Add to Cart Button */}
          <button
            className="w-1/2 py-3 rounded-xl bg-purple-400 text-white font-medium
            hover:bg-purple-500 transition duration-300 shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {open && <ProductDetailsCard setOpen={setOpen} data={shoes} />}
    </div>
  );
};

export default EventCard;
