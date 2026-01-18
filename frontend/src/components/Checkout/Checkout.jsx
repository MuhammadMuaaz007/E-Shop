import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

/* ---------------- DUMMY DATA (Frontend Only) ---------------- */

const dummyUser = {
  name: "John Doe",
  email: "john@example.com",
  phoneNumber: "03001234567",
  addresses: [
    {
      addressType: "Home",
      address1: "Street 1",
      address2: "Block A",
      zipCode: "54000",
      country: "PK",
      city: "PB",
    },
  ],
};

const dummyCart = [
  {
    name: "Product 1",
    qty: 2,
    discountPrice: 50,
  },
  {
    name: "Product 2",
    qty: 1,
    discountPrice: 100,
  },
];

/* ---------------- MAIN COMPONENT ---------------- */

const Checkout = () => {
  const user = dummyUser;
  const cart = dummyCart;

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ---------------- PRICE CALCULATIONS ---------------- */

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.02;
  const totalPrice = (subTotalPrice + shipping - discountPrice).toFixed(2);

  /* ---------------- COUPON (Frontend Mock) ---------------- */

  const handleCouponSubmit = (e) => {
    e.preventDefault();

    if (couponCode === "DISCOUNT10") {
      setDiscountPrice(subTotalPrice * 0.1);
      setCouponCode("");
      alert("Coupon Applied!");
    } else {
      alert("Invalid Coupon Code");
      setCouponCode("");
    }
  };

  /* ---------------- PAYMENT BUTTON ---------------- */

  const paymentSubmit = () => {
    if (!address1 || !address2 || !zipCode || !country || !city) {
      alert("Please fill shipping address");
      return;
    }

    const orderData = {
      cart,
      user,
      address1,
      address2,
      zipCode,
      country,
      city,
      totalPrice,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    alert("Order saved locally. Ready for payment page.");
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
          handleCouponSubmit={handleCouponSubmit}
        />
      </div>

      <button
        onClick={paymentSubmit}
        className="bg-red-500 text-white px-10 py-3 rounded mt-10"
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

      <input value={user.name} readOnly className="border w-full mb-3 p-2" />
      <input value={user.email} readOnly className="border w-full mb-3 p-2" />
      <input value={user.phoneNumber} readOnly className="border w-full mb-3 p-2" />

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
  discountPrice,
  handleCouponSubmit,
}) => {
  return (
    <div className="w-full md:w-[35%] bg-white p-5 rounded">
      <p>Subtotal: ${subTotalPrice}</p>
      <p>Shipping: ${shipping.toFixed(2)}</p>
      <p>Discount: -${discountPrice.toFixed(2)}</p>

      <h3 className="text-lg font-bold mt-3">Total: ${totalPrice}</h3>

      <form onSubmit={handleCouponSubmit} className="mt-4">
        <input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="DISCOUNT10"
          className="border w-full p-2"
        />
        <button className="border w-full mt-3 py-2 text-red-500">
          Apply Coupon
        </button>
      </form>
    </div>
  );
};

export default Checkout;
