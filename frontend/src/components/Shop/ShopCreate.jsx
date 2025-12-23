import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ShopCreate = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("zipCode", zipCode);
    formData.append("file", avatar);
    try {
      const res = await axios.post(`${server}/shop/create-shop`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      setName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setAddress("");
      setZipCode("");
      setAvatar(null);
      navigate("/shop-login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create shop!");
    }
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register Your Shop
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Shop Name */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Shop Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           placeholder-gray-400 focus:outline-none focus:ring-purple-500 
                           focus:border-purple-500 sm:text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer text-gray-500"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer text-gray-500"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Shop Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="number"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            {/* Image Upload — same as Signup */}
            <div>
              <label className="block text-left text-sm font-medium text-gray-700">
                Shop Image
              </label>

              <div className="mt-2 flex items-center gap-4">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden border border-gray-300">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="shop"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                      No Img
                    </span>
                  )}
                </span>

                <label
                  htmlFor="file-input"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                             text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border 
                           border-transparent text-sm font-medium rounded-md text-white 
                           bg-purple-600 hover:bg-purple-700 shadow-md transition duration-300"
              >
                Register Shop
              </button>
            </div>

            {/* Login Link */}
            <div className={`${styles.normalFlex} w-full justify-center`}>
              <h4 className="text-gray-600">Already have a seller account?</h4>
              <Link
                to="/shop-login"
                className="text-purple-600 pl-2 hover:underline"
              >
                Login to your Shop
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
