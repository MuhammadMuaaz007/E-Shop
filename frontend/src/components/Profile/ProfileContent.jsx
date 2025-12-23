import React, { useEffect, useState } from "react";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

// Data Grid
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineTrackChanges } from "react-icons/md";
const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [Address1, setAddress1] = useState("");
  const [Address2, setAddress2] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phone || "");
      setZipCode(user.zip || "");
    }
  }, [user]);
  const handleSubmit = (e) => { 
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="w-full p-0">
      {active === 1 && (
        <div className="w-full">
          {/* Avatar */}
          <div className="flex justify-center w-full mb-8">
            <div className="relative">
              <img
                src={user?.avatar?.url}
                className="h-[150px] w-[150px] rounded-full border-[3px] border-[#3ad132] shadow-lg object-cover mx-[15px]"
                alt="User Avatar"
              />
              <div
                className="h-[35px] w-[35px] bg-[#E3E9EE] rounded-full flex items-center justify-center 
                absolute bottom-3 right-4 cursor-pointer hover:scale-110 transition-all"
              >
                <AiOutlineCamera size={20} />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full px-2 md:px-6 ">
            <form action="" onSubmit={handleSubmit} aria-required="true">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${styles.input} w-full bg-white p-2 border border-gray-300 rounded-md outline-none`}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.input} w-full bg-white p-2 border border-gray-300 rounded-md outline-none`}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`${styles.input} w-full bg-white p-2 border border-gray-300 rounded-md outline-none`}
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className={`${styles.input} w-full bg-white p-2 border border-gray-300 rounded-md outline-none`}
                  />
                </div>
                <div>
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="text"
                    value={Address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className={`${styles.input} w-full bg-white p-2 border border-gray-300 rounded-md outline-none`}
                  />
                </div>
                <div>
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="text"
                    value={Address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className={`${styles.input} w-full bg-white p-2 border border-gray-300 rounded-md outline-none`}
                  />
                </div>
              </div>

              {/* Update Button */}
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="px-6 w-[300px] py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium"
                >
                  Update Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {active === 4 && (
        <div className="text-xl ml-5 flex justify-center items-center mt-5">
          No message!
        </div>
      )}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
      {/* {active === 8 && <div>Admin Dashboard</div>} */}
      {active === 8 && (
        <div>
          <PaymentMethods />
        </div>
      )}
      {active === 9 && <div>Logging Out...</div>}
    </div>
  );
};

export default ProfileContent;

const TrackOrder = () => {
  const orders = [
    {
      id: "7645gs",
      items: ["Mobile phone 14 pro max"],
      total: 350,
      status: "Processing",
    },
  ];

  return (
    <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-1 gap-5 mt-5">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-lg transition-all"
        >
          <div>
            <h5 className="font-semibold">Order ID: {order.id}</h5>
            <p className="text-gray-500">Items: {order.items.join(", ")}</p>
            <p className="text-gray-400 font-medium">Total: ${order.total}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-3 md:mt-0">
            <span
              className={`px-3 py-1 rounded-full text-white font-medium ${
                order.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {order.status}
            </span>
            <Link to={`/user/order/${order.id}`}>
              <Button variant="contained" color="primary">
                View
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      id: "7645gs",
      items: ["Mobile phone 14 pro max"],
      total: 350,
      status: "Processing",
    },
  ];

  return (
    <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-1 gap-5">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-lg transition-all"
        >
          <div>
            <h5 className="font-semibold">Order ID: {order.id}</h5>
            <p className="text-gray-500">Items: {order.items.join(", ")}</p>
            <p className="text-gray-400 font-medium">Total: ${order.total}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-3 md:mt-0">
            <span
              className={`px-3 py-1 rounded-full text-white font-medium ${
                order.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {order.status}
            </span>
            <Link to={`/user/order/${order.id}`}>
              <Button variant="contained" color="primary">
                View
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};


import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
    } else {
      alert("Password changed successfully (UI only)");
    }
  };

  return (
    <div className="w-full px-5 md:px-10">
      <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 pb-6">
        Change Password
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full gap-6"
      >
        {/* Old Password */}
        <div className="relative w-full md:w-[50%]">
          <label className="block text-[18px] pb-2">Old Password</label>
          <input
            type={showPassword.old ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={`${styles.input} w-full bg-white p-2 border border-gray-300 rounded-md outline-none`}
            required
          />
          <span
            className="absolute right-2.5 top-[45px] cursor-pointer"
            onClick={() => toggleShow("old")}
          >
            {showPassword.old ? (
              <AiOutlineEye size={22} />
            ) : (
              <AiOutlineEyeInvisible size={22} />
            )}
          </span>
        </div>

        {/* New Password */}
        <div className="relative w-full md:w-[50%]">
          <label className="block pb-2 text-[18px]">New Password</label>
          <input
            type={showPassword.new ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`${styles.input} w-full bg-white p-2 border border-gray-300 rounded-md outline-none`}
            required
          />
          <span
            className="absolute right-2.5 top-[45px] cursor-pointer"
            onClick={() => toggleShow("new")}
          >
            {showPassword.new ? (
              <AiOutlineEye size={22} />
            ) : (
              <AiOutlineEyeInvisible size={22} />
            )}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative w-full md:w-[50%]">
          <label className="block pb-2 text-[18px]">Confirm Password</label>
          <input
            type={showPassword.confirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`${styles.input} w-full bg-white p-2 border border-gray-300 rounded-md outline-none`}
            required
          />
          <span
            className="absolute right-2.5 top-[45px] cursor-pointer"
            onClick={() => toggleShow("confirm")}
          >
            {showPassword.confirm ? (
              <AiOutlineEye size={22} />
            ) : (
              <AiOutlineEyeInvisible size={22} />
            )}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-[50%] mt-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};
const PaymentMethods = () => {
  const payments = [
    {
      id: 1,
      name: "Muhammad Muaaz",
      card: "1234 **** **** 5678",
      expiry: "25/12/2025",
      logo: "https://quickpay.net/images/payment-methods/visa.png",
    },
  ];

  return (
    <div className="w-full px-5 md:px-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Payment Methods</h1>
        <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-md text-white font-medium mt-2 md:mt-0">
          Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {payments.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <img src={p.logo} alt="" className="w-12 h-12 object-contain" />
              <div>
                <h5 className="font-semibold">{p.name}</h5>
                <p className="text-gray-500">{p.card}</p>
                <p className="text-gray-400 text-sm">Expiry: {p.expiry}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-3 md:mt-0">
              <AiOutlineDelete size={25} className="cursor-pointer text-red-500 hover:text-red-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Address = () => {
  const addresses = [
    {
      id: 1,
      type: "Default",
      location: "New Model Town 449, Lahore",
      phone: "+923069544314",
    },
  ];

  return (
    <div className="w-full px-5 md:px-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">My Addresses</h1>
        <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-md text-white font-medium mt-2 md:mt-0">
          Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {addresses.map((a) => (
          <div
            key={a.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-lg transition-all"
          >
            <div>
              <h5 className="font-semibold">{a.type}</h5>
              <p className="text-gray-500">{a.location}</p>
              <p className="text-gray-400">{a.phone}</p>
            </div>
            <div className="flex gap-3 mt-3 md:mt-0">
              <AiOutlineDelete size={25} className="cursor-pointer text-red-500 hover:text-red-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      id: "7645gs",
      items: ["Mobile phone 14 pro max"],
      total: 350,
      status: "Processing",
    },
  ];

  return (
    <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-1 gap-5">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-lg transition-all"
        >
          <div>
            <h5 className="font-semibold">Order ID: {order.id}</h5>
            <p className="text-gray-500">Items: {order.items.join(", ")}</p>
            <p className="text-gray-400 font-medium">Total: ${order.total}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-3 md:mt-0">
            <span
              className={`px-3 py-1 rounded-full text-white font-medium ${
                order.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {order.status}
            </span>
            <Link to={`/user/order/${order.id}`}>
              <Button variant="contained" color="primary">
                View
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

