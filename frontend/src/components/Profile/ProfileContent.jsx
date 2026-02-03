import React, { useEffect, useState } from "react";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  deleteUserAddress,
  loadUser,
  updateUserAddresses,
  updateUserInformation,
} from "../../redux/actions/user";
import { toast } from "react-toastify";
import {
  ClearErrors,
  UpdateUserAddressSuccess,
} from "../../redux/reducers/user";
import { server } from "../../server";
import axios from "axios";
import { getAllOrdersUser } from "../../redux/actions/order";

const ProfileContent = ({ active }) => {
  const { user, error, updateAddressSuccessMessage } = useSelector(
    (state) => state.user,
  );
  // console.log(user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }
  }, [error, dispatch, updateAddressSuccessMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserInformation({ name, email, phoneNumber, password }));
    toast.success("Information Updated successfully!");

    // Handle form submission logic here
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      await axios.put(`${server}/user/update-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      dispatch(loadUser());
      toast.success("Avatar updated!");
    } catch (error) {
      toast.error("Error uploading avatar");
      console.log(error);
    }
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
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera size={20} color="#7C7C7C" />
                </label>
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
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`${styles.input} w-full bg-white p-2 border border-gray-300 rounded-md outline-none`}
                  />
                </div>
                <div>
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
      {active === 8 && <div className="text-center">Logging Out...</div>}
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
      toast.error("New Password and Confirm Password do not match!");
    } else {
      axios
        .put(
          `${server}/user/update-user-password`,
          { oldPassword, newPassword, confirmPassword },
          { withCredentials: true },
        )
        .then((res) => {
          toast.success(res.data.message);
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message || "Failed to update password",
          );
        });
    }
  };

  return (
    <div className="w-full flex justify-center px-4 md:px-10 py-10">
      <div className="w-full md:w-[500px] bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          🔐 Change Password
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Old Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Old Password
            </label>
            <input
              type={showPassword.old ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-purple-600"
              onClick={() => toggleShow("old")}
            >
              {showPassword.old ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </span>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Password
            </label>
            <input
              type={showPassword.new ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-purple-600"
              onClick={() => toggleShow("new")}
            >
              {showPassword.new ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword.confirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-purple-600"
              onClick={() => toggleShow("confirm")}
            >
              {showPassword.confirm ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 active:scale-[0.98] transition-all"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country || !city || !addressType) {
      toast.error("Please fill all required fields!");
    } else {
      dispatch(
        updateUserAddresses({
          country,
          city,
          address1,
          address2,
          addressType,
          zipCode,
        }),
      );

      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setAddressType("");
      setZipCode(null);
    }
  };
  const handleDeleteAddress = (id) => {
    dispatch(deleteUserAddress(id));
  };

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  return (
    <div className="w-full px-5 md:px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">My Addresses</h1>
        <button
          className="bg-purple-800 hover:bg-purple-900 px-5 py-2 rounded-md text-white font-medium mt-2 md:mt-0 transition-colors"
          onClick={() => setOpen(true)}
        >
          Add New
        </button>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {user?.addresses && user.addresses.length > 0 ? (
          user.addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white shadow-md rounded-xl p-4
                   flex flex-col md:flex-row
                   items-start md:items-center
                   justify-between gap-4
                   hover:shadow-lg transition-all"
            >
              {/* Address Info */}
              <div>
                <h5 className="font-semibold text-purple-600">
                  {address.addressType}
                </h5>

                <p className="text-gray-600">
                  {address.address1}
                  {address.address2 && `, ${address.address2}`}
                </p>

                <p className="text-gray-500">
                  {address.city}, {address.country} — {address.zipCode}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-3 md:mt-0">
                <AiOutlineDelete
                  size={24}
                  className="cursor-pointer text-red-500 hover:text-red-600"
                  onClick={() => handleDeleteAddress(address._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No addresses added yet.
          </p>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div
            className="
        relative z-50
        w-full max-w-md
        bg-white rounded-xl shadow-lg
        p-6

        max-h-[90vh] overflow-y-auto
        md:max-h-[90vh] md:overflow-y-auto
      "
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            >
              <RxCross1 />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center">
              Add New Address
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Country */}
              <div>
                <label className="block mb-2 font-medium">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-gray-300 h-10 rounded-md px-3
              focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">Choose your country</option>
                  {Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block mb-2 font-medium">State</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-gray-300 h-10 rounded-md px-3
              focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">Choose your state</option>
                  {State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address 1 */}
              <div>
                <label className="block mb-2 font-medium">Address 1</label>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md h-10 px-3
              focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Address 2 */}
              <div>
                <label className="block mb-2 font-medium">Address 2</label>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md h-10 px-3
              focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Zip Code */}
              <div>
                <label className="block mb-2 font-medium">Zip Code</label>
                <input
                  type="number"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md h-10 px-3
              focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Address Type */}
              <div>
                <label className="block mb-2 font-medium">Address Type</label>
                <select
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="w-full border border-gray-300 h-10 rounded-md px-3
              focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">Choose your address type</option>
                  {addressTypeData.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700
            text-white font-medium py-2 rounded-md transition-colors"
              >
                Add Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getAllOrdersUser(user._id));
    }
  }, [user, dispatch]);

  if (isLoading)
    return <p className="flex justify-center ">Loading orders...</p>;
  if (error) return <p className="flex justify-center ">Error: {error}</p>;

  return (
    <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-1 gap-5">
      {orders?.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-lg transition-all"
        >
          <div>
            <h5 className="font-semibold">Order ID: {order._id}</h5>
            <p className="text-gray-500">
              Items: {order.cart.map((item) => item.name).join(", ")}
            </p>
            <p className="text-gray-400 font-medium">
              Total: ${order.totalPrice}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-3 md:mt-0">
            <span
              className={`px-3 py-1 rounded-full text-white font-medium ${
                order.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {order.status}
            </span>
            <Link to={`/user/order/${order._id}`}>
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
