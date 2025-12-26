import { useState } from "react";
import styles from "../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import CountDown from "./CountDown";

const EventCard = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`w-full bg-white shadow-lg p-5 lg:flex lg:gap-8 border-gray-100 
      hover:shadow-xl transition-shadow duration-300`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative">
        <img
          src={data?.images?.[0]?.url}
          alt={data?.name}
          className="w-[80%] md:w-[90%] lg:w-full h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
        />

        <span
          className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-purple-400
          text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md"
        >
          Hot Deal 🔥
        </span>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col mt-5 lg:mt-0">
        <h2
          className={`${styles.productTitle} text-2xl lg:text-3xl font-semibold text-gray-800 leading-snug`}
        >
          {data?.name}
        </h2>

        <p className="text-gray-600 text-sm lg:text-base leading-relaxed mt-4">
          {data?.description}
        </p>

        {/* Price & Sold Info */}
        <div className="flex py-3 justify-between items-center">
          <div className="flex space-x-2 items-center">
            {data?.originalPrice && (
              <h5 className="font-medium text-[17px] text-gray-400 line-through">
                ${data?.originalPrice}
              </h5>
            )}
            <h5 className="font-bold text-[22px] text-purple-600 font-roboto">
              ${data?.discountPrice}
            </h5>
          </div>

          <span className="font-medium text-[17px] text-purple-500">
            {data?.sold_out} Sold Out
          </span>
        </div>

        {/* Countdown (uses finish_date) */}
        <div className="mt-3">
          <CountDown endDate={data?.finish_date} />
        </div>

        {/* Buttons (UNCHANGED) */}
        <div className="flex gap-4 mt-5">
          <button
            className="w-1/2 py-3 rounded-xl bg-purple-600 text-white font-medium
            hover:bg-purple-700 transition duration-300 shadow-md"
            onClick={() => setOpen(true)}
          >
            See Details
          </button>

          <button
            className="w-1/2 py-3 rounded-xl bg-purple-400 text-white font-medium
            hover:bg-purple-500 transition duration-300 shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </div>
  );
};

export default EventCard;
