import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { getAllEventsShop } from "../../redux/actions/event";
import styles from "../../styles/styles";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const formatPrice = (price) => {
  if (!price) return "";
  if (price >= 1000) {
    return (price / 1000).toFixed(1).replace(/\.0$/, "") + "k$";
  }
  return price + "$";
};

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  const tabs = [
    { id: 1, label: "Shop Products" },
    { id: 2, label: "Running Events" },
    { id: 3, label: "Shop Reviews" },
  ];

  // Helper to calculate remaining time
  // const getTimeRemaining = (endDate) => {
  //   const diff = new Date(endDate) - new Date();
  //   if (diff <= 0) return "Ended";
  //   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  //   const minutes = Math.floor((diff / (1000 * 60)) % 60);
  //   const seconds = Math.floor((diff / 1000) % 60);
  //   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  // };
  // Helper to format price

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex w-full items-center justify-between border-b border-gray-200 pb-2 flex-wrap gap-2">
        <div className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <h5
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`font-semibold text-lg cursor-pointer pb-1 border-b-2 transition ${
                active === tab.id
                  ? "text-red-500 border-red-500"
                  : "text-gray-700 border-transparent hover:text-red-500"
              }`}
            >
              {tab.label}
            </h5>
          ))}
        </div>

        {isOwner && (
          <Link to="/dashboard">
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm">
              Dashboard
            </button>
          </Link>
        )}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {/* Shop Products */}
        {active === 1 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products && products.length > 0 ? (
              products.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products available
              </p>
            )}
          </div>
        )}

        {/* Running Events */}
        {active === 2 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events && events.length > 0 ? (
              events.map((event) => <EventCard event={event} key={event._id} />)
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No running events yet.
              </p>
            )}
          </div>
        )}

        {/* Shop Reviews */}
        {active === 3 && (
          <div className="text-center text-gray-500 py-10">No reviews yet.</div>
        )}
      </div>
    </div>
  );
};

export default ShopProfileData;

// -----------------------------
// EventCard Component
const EventCard = ({ event }) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const updateRemaining = () => {
      const diff = new Date(event.finish_date) - new Date();
      if (diff <= 0) {
        setRemainingTime("Ended");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateRemaining();
    const timer = setInterval(updateRemaining, 1000);

    return () => clearInterval(timer);
  }, [event.finish_date]);

  return (
    <Link to={`/events`}>
      <div
        className="w-full bg-white rounded-2xl relative p-4 shadow-md cursor-pointer
          hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
      >
        {/* Event Image */}
        <img
          src={event?.images?.[0]?.url}
          alt={event.name}
          className="w-full h-[160px] object-contain rounded-xl drop-shadow-sm
            transition-transform duration-300 hover:scale-105"
        />

        {/* Event Name */}
        <h4 className="pt-1 font-[500] text-[18px] text-gray-800">
          {event.name.length > 20
            ? event.name.slice(0, 20) + "..."
            : event.name}
        </h4>

        {/* Stars */}
        <div className="flex mt-1">
          {[1, 2, 3, 4].map((_) => (
            <AiFillStar key={_} color="#F6BA00" size={20} className="mr-1" />
          ))}
          <AiOutlineStar color="#F6BA00" size={20} />
        </div>

        {/* Price & Sold */}
        {/* Price & Sold */}
        <div className="py-2 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <h5 className={`${styles.productDiscountPrice}`}>
              <span className={styles.productDiscountPrice}>
                {formatPrice(event.discountPrice)}
              </span>
              {event.originalPrice && (
                <span className={`${styles.price} line-through text-gray-400`}>
                  {formatPrice(event.originalPrice)}
                </span>
              )}
            </h5>
            {event.price && (
              <h4 className={`${styles.price} line-through text-gray-400`}>
                {formatPrice(event.price)}
              </h4>
            )}
          </div>

          <span className="font-[400] text-[15px] text-green-600">
            {event.sold_out} sold
          </span>
        </div>

        {/* Small Running Badge */}
        <div className="absolute top-3 left-3 group">
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full cursor-default">
            Running
          </span>
          <div className="absolute left-0 -bottom-8 w-max p-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all">
            {remainingTime}
          </div>
        </div>
      </div>
    </Link>
  );
};
