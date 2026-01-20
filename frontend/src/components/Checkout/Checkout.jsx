import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

/* ---------------- MAIN COMPONENT ---------------- */

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ---------------- PRICE CALCULATIONS ---------------- */

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0,
  );
  // this is shipping cost calculation
  const shipping = subTotalPrice * 0.1;
  const discountPercentage = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  /* ---------------- COUPON (Frontend Mock) ---------------- */

  const handleCouponSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios
        .get(`${server}/coupon/get-coupon-value/${couponCode}`)
        .then((res) => {
          const shopId = res.data.couponCode?.shop._id;
          const couponCodeValue = res.data.couponCode?.value;
          if (res.data.couponCode !== null) {
            const isCouponValid =
              cart && cart.filter((item) => item.shopId === shopId);
            if (isCouponValid.length === 0) {
              toast.error("Coupon Code is not valid for this shop!");
              setCouponCode("");
            } else {
              const eligiblePrice = isCouponValid.reduce(
                (acc, item) => acc + item.qty * item.discountPrice,
                0,
              );
              console.log(eligiblePrice);
              const discountPrice =
                (eligiblePrice * Number(couponCodeValue)) / 100;
              setDiscountPrice(discountPrice);
              setCouponCodeData(res.data.couponCode);
              setCouponCode("");
            }
          }
        });

      setCouponCodeData(res.data.couponCode);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const paymentSubmit = () => {
    navigate("/payment");
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] block md:flex gap-6">
        <ShippingInfo
          user={user}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          address1={address1}
          setAddress1={setAddress1}
          address2={address2}
          setAddress2={setAddress2}
          zipCode={zipCode}
          setZipCode={setZipCode}
        />

        <CartData
          subTotalPrice={subTotalPrice}
          shipping={shipping}
          totalPrice={totalPrice}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          discountPrice={discountPrice}
          discountPercentage={discountPercentage}
          handleCouponSubmit={handleCouponSubmit}
        />
      </div>

      <button
        onClick={paymentSubmit}
        className=" mt-3 py-2 px-8 text-white bg-purple-700 border border-purple-700 rounded-lg shadow-md hover:bg-purple-800 hover:shadow-lg transition-all duration-300 font-semibold"
      >
        Go to Payment
      </button>
    </div>
  );
};

/* ---------------- SHIPPING INFO ---------------- */

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full md:w-[65%] bg-white p-5 rounded">
      <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>

      <input
        value={user && user.name}
        readOnly
        className="border w-full mb-3 p-2"
      />
      <input
        value={user && user.email}
        readOnly
        className="border w-full mb-3 p-2"
      />
      <input
        value={user && user.phoneNumber}
        readOnly
        className="border w-full mb-3 p-2"
      />

      <input
        placeholder="Zip Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        className="border w-full mb-3 p-2"
      />

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border w-full mb-3 p-2"
      >
        <option value="">Select Country</option>
        {Country.getAllCountries().map((c) => (
          <option key={c.isoCode} value={c.isoCode}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border w-full mb-3 p-2"
      >
        <option value="">Select City</option>
        {State.getStatesOfCountry(country).map((s) => (
          <option key={s.isoCode} value={s.isoCode}>
            {s.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Address 1"
        value={address1}
        onChange={(e) => setAddress1(e.target.value)}
        className="border w-full mb-3 p-2"
      />

      <input
        placeholder="Address 2"
        value={address2}
        onChange={(e) => setAddress2(e.target.value)}
        className="border w-full mb-3 p-2"
      />

      <div
        className="flex items-center text-red-500 cursor-pointer mt-4"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose Saved Address
        {userInfo ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      {userInfo &&
        user.addresses.map((addr, i) => (
          <div
            key={i}
            className="border p-2 mt-2 cursor-pointer"
            onClick={() => {
              setAddress1(addr.address1);
              setAddress2(addr.address2);
              setZipCode(addr.zipCode);
              setCountry(addr.country);
              setCity(addr.city);
            }}
          >
            {addr.addressType}
          </div>
        ))}
    </div>
  );
};

/* ---------------- CART DATA ---------------- */

const CartData = ({
  subTotalPrice,
  shipping,
  totalPrice,
  couponCode,
  setCouponCode,

  discountPercentage,
  handleCouponSubmit,
}) => {
  return (
    <div className="w-full md:w-[35%] bg-white p-5 rounded">
      <p>Subtotal: ${subTotalPrice}</p>
      <p>Shipping: ${shipping}</p>
      <p>
        Discount: -
        {discountPercentage ? "$" + discountPercentage.toString() : null}
      </p>

      <h3 className="text-lg font-bold mt-3">Total: ${totalPrice}</h3>

      <form onSubmit={handleCouponSubmit} className="mt-4">
        <input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="DISCOUNT10"
          className="border w-full p-2"
        />
        <button
          type="submit"
          className="w-full mt-3 py-2 text-white bg-purple-700 border border-purple-700 rounded-lg shadow-md hover:bg-purple-800 hover:shadow-lg transition-all duration-300 font-semibold"
        >
          Apply Coupon
        </button>
      </form>
    </div>
  );
};

export default Checkout;
