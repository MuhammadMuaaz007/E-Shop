import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

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

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const shipping = subTotalPrice * 0.1;
  const discountPercentage = couponCodeData ? discountPrice : 0;
  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${server}/coupon/get-coupon-value/${couponCode}`
      );
      const shopId = res.data.couponCode?.shop._id;
      const couponCodeValue = res.data.couponCode?.value;

      if (res.data.couponCode) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);
        if (isCouponValid.length === 0) {
          toast.error("Coupon Code is not valid for this shop!");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * Number(couponCodeValue)) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const paymentSubmit = () => {
    if (!address1 || !country || !city || !zipCode) {
      toast.error("Please choose your delivery address!");
      return;
    }
    const shippingAddress = { address1, address2, country, city, zipCode };
    const orderData = {
      cart,
      user,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
    };
    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  return (
    <div className="w-full flex flex-col items-center py-10 bg-gray-50">
      <div className="w-[95%] lg:w-[80%] flex flex-col md:flex-row gap-8">
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
        className="mt-6 py-3 px-10 text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 font-semibold"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

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
    <div className="w-full md:w-[65%] bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-5 border-b pb-2">Shipping Address</h3>

      <input
        value={user?.name || ""}
        readOnly
        className="border rounded-md w-full mb-3 p-3 focus:ring-2 focus:ring-purple-300"
      />
      <input
        value={user?.email || ""}
        readOnly
        className="border rounded-md w-full mb-3 p-3 focus:ring-2 focus:ring-purple-300"
      />
      <input
        value={user?.phoneNumber || ""}
        readOnly
        className="border rounded-md w-full mb-3 p-3 focus:ring-2 focus:ring-purple-300"
      />

      <input
        placeholder="Zip Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        className="border rounded-md w-full mb-3 p-3 focus:ring-2 focus:ring-purple-300"
      />

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border rounded-md w-full mb-3 p-3 focus:ring-2 focus:ring-purple-300"
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
        className="border rounded-md w-full mb-3 p-3 focus:ring-2 focus:ring-purple-300"
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
        className="border rounded-md w-full mb-3 p-3 focus:ring-2 focus:ring-purple-300"
      />

      <input
        placeholder="Address 2"
        value={address2}
        onChange={(e) => setAddress2(e.target.value)}
        className="border rounded-md w-full mb-3 p-3 focus:ring-2 focus:ring-purple-300"
      />

      <div
        className="flex items-center text-purple-700 cursor-pointer mt-4 font-medium select-none"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose Saved Address
        {userInfo ? <IoIosArrowUp className="ml-1" /> : <IoIosArrowDown className="ml-1" />}
      </div>

      {userInfo &&
        user?.addresses?.map((addr, i) => (
          <div
            key={i}
            className="border rounded-md p-3 mt-2 cursor-pointer hover:bg-purple-50 transition"
            onClick={() => {
              setAddress1(addr.address1);
              setAddress2(addr.address2);
              setZipCode(addr.zipCode);
              setCountry(addr.country);
              setCity(addr.city);
              setUserInfo(false);
            }}
          >
            <p className="font-medium">{addr.addressType}</p>
            <p className="text-sm text-gray-500">{`${addr.address1}, ${addr.address2}, ${addr.city}, ${addr.country}`}</p>
          </div>
        ))}
    </div>
  );
};

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
    <div className="w-full md:w-[35%] bg-white p-6 rounded-xl shadow-md flex flex-col">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${subTotalPrice}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping:</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Discount:</span>
        <span>{discountPercentage ? `-$${discountPercentage.toFixed(2)}` : "-$0"}</span>
      </div>

      <h3 className="text-lg font-bold mt-3">Total: ${totalPrice}</h3>

      <form onSubmit={handleCouponSubmit} className="mt-5 flex flex-col gap-2">
        <input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
          className="border rounded-md p-3 focus:ring-2 focus:ring-purple-300"
        />
        <button
          type="submit"
          className="w-full py-2 mt-2 text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-md hover:scale-105 transform transition duration-300 font-semibold"
        >
          Apply Coupon
        </button>
      </form>
    </div>
  );
};

export default Checkout;
