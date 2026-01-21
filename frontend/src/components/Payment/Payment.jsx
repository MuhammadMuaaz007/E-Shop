import React, { useState, useEffect } from "react";
// import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [orderData, setOrderData] = useState({
    cart: [],
    subTotalPrice: 0,
    totalPrice: 0,
    discountPrice: 0,
    shipping: 0,
  });
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("latestOrder")) || {};
    setOrderData(data);
  }, []);

  const paymentHandler = (e) => {
    e.preventDefault();
    alert("Payment submitted (frontend only).");
  };
  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };
  const paypalPaymentHandler = async (paymentInfo) => {};

  const cashOnDeliveryHandler = (e) => {
    e.preventDefault();
    alert("Cash on Delivery selected (frontend only).");
  };
  const onApprove = async (data, actions) => {};
  const createOrder = async (data, actions) => {};

  return (
    <div className="w-full flex flex-col items-center py-10 bg-gray-50">
      <div className="w-[95%] lg:w-[80%] flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-[65%]">
          <PaymentInfo
            user={user}
            onApprove={onApprove}
            createOrder={createOrder}
            open={open}
            setOpen={setOpen}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>

        <div className="w-full md:w-[35%]">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

/* ---------------- PAYMENT INFO ---------------- */

const PaymentInfo = ({
  open,
  setOpen,
  paymentHandler,
  cashOnDeliveryHandler,
  user,
  onApprove,
  createOrder,
}) => {
  const [select, setSelect] = useState(1);

  const radioStyle =
    "w-[22px] h-[22px] rounded-full border-2 border-purple-600 flex items-center justify-center cursor-pointer";

  const activeDot = "w-[10px] h-[10px] bg-purple-600 rounded-full";

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-5 border-b pb-2">
        Payment Method
      </h3>

      {/* CARD PAYMENT */}
      <div className="mb-6">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setSelect(1)}
        >
          <div className={radioStyle}>
            {select === 1 && <div className={activeDot} />}
          </div>
          <h4 className="font-medium text-gray-700">Debit / Credit Card</h4>
        </div>

        {select === 1 && (
          <form onSubmit={paymentHandler} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Name on Card"
              value={user&& user.name}
              required
              className="border rounded-md w-full p-3 focus:ring-2 focus:ring-purple-300"
            />

            <div className="flex gap-4">
              <CardNumberElement
                type="text"
                placeholder="Name on Card"
                required
                className="border rounded-md w-full p-3 focus:ring-2 focus:ring-purple-300"
                options={{
                  style: {
                    base: {
                      fontSize: "19px",
                      lineHeight: 1.5,
                      color: "#444",
                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",
                      "::placeholder": {
                        color: "#444",
                      },
                    },
                  },
                }}
              />
              <CardExpiryElement
                type="text"
                placeholder="MM/YY"
                required
                className="border rounded-md w-full p-3 focus:ring-2 focus:ring-purple-300"
                options={{
                  style: {
                    base: {
                      fontSize: "19px",
                      lineHeight: 1.5,
                      color: "#444",
                    },
                    empty: {
                      color: "#3a120a",
                      backgroundColor: "transparent",
                      "::placeholder": {
                        color: "#444",
                      },
                    },
                  },
                }}
              />
            </div>

            <CardCvcElement
              type="password"
              placeholder="CVV"
              required
              className="border rounded-md w-full p-3 focus:ring-2 focus:ring-purple-300"
              options={{
                style: {
                  base: {
                    fontSize: "19px",
                    lineHeight: 1.5,
                    color: "#444",
                  },
                  empty: {
                    color: "#3a120a",
                    backgroundColor: "transparent",
                    "::placeholder": {
                      color: "#444",
                    },
                  },
                },
              }}
            />

            <button
              type="submit"
              className="w-full py-3 text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg hover:scale-105 transition font-semibold"
            >
              Pay Now
            </button>
          </form>
        )}
      </div>

      {/* PAYPAL */}
      <div className="mb-6">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setSelect(2)}
        >
          <div className={radioStyle}>
            {select === 2 && <div className={activeDot} />}
          </div>
          <h4 className="font-medium text-gray-700">PayPal</h4>
        </div>

        {select === 2 && (
          <button
            onClick={() => setOpen(true)}
            className="mt-4 w-full py-3 text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg hover:scale-105 transition font-semibold"
          >
            Pay with PayPal
          </button>
        )}

        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] md:w-[40%] p-6 rounded-xl shadow-md relative">
              <RxCross1
                size={25}
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setOpen(false)}
              />
              <p className="text-center mt-6">
                PayPal integration goes here (frontend only)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CASH ON DELIVERY */}
      <div>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setSelect(3)}
        >
          <div className={radioStyle}>
            {select === 3 && <div className={activeDot} />}
          </div>
          <h4 className="font-medium text-gray-700">Cash on Delivery</h4>
        </div>

        {select === 3 && (
          <button
            onClick={cashOnDeliveryHandler}
            className="mt-4 w-full py-3 text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg hover:scale-105 transition font-semibold"
          >
            Confirm Order
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------------- CART DATA ---------------- */

const CartData = ({ orderData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">
        Order Summary
      </h3>

      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${orderData?.subTotalPrice}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Shipping:</span>
        <span>${orderData?.shipping?.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Discount:</span>
        <span>
          {orderData?.discountPrice ? `-$${orderData?.discountPrice}` : "-$0"}
        </span>
      </div>

      <h3 className="text-lg font-bold mt-3">
        Total: ${orderData?.totalPrice}
      </h3>
    </div>
  );
};

export default Payment;
