import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { AiOutlineCamera } from "react-icons/ai";


const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(seller?.avatar?.url || "");
  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [zipCode, setZipcode] = useState(seller?.zipCode || "");
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    // Show the preview immediately
    setAvatar(URL.createObjectURL(file));
    setAvatarLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.put(`${server}/shop/update-shop-avatar`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Avatar updated successfully!");
      dispatch(loadSeller());
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update avatar");
    } finally {
      setAvatarLoading(false);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-shop-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true },
      )
      .then(() => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen  flex justify-center items-start py-12 px-4">
      <div className="bg-white w-full md:w-4/5 lg:w-3/5 rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        {/* Avatar Section */}
        <div className="relative mb-12">
          <img
            src={
              avatar
                ? typeof avatar === "string"
                  ? avatar // URL or preview
                  : "" // just a safety fallback
                : seller?.avatar?.url
            }
            alt="Shop Avatar"
            className="w-40 h-40 rounded-full border-4 border-purple-300 object-cover shadow-xl"
          />

          <div className="absolute bottom-0 right-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition">
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="avatar">
              {avatarLoading ? (
                <span className="text-purple-600 font-bold">...</span>
              ) : (
                <AiOutlineCamera size={22} className="text-purple-600" />
              )}
            </label>
          </div>
        </div>

        {/* Shop Info Form */}
        <form
          className="w-full flex flex-wrap justify-between"
          onSubmit={updateHandler}
        >
          {/* Shop Name */}
          <div className="flex flex-col w-full md:w-[48%] mb-6">
            <label className="mb-2 font-semibold text-purple-700">
              Shop Name
            </label>
            <input
              type="text"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-4 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition bg-white"
              required
            />
          </div>

          {/* Shop Description */}
          <div className="flex flex-col w-full md:w-[48%] mb-6">
            <label className="mb-2 font-semibold text-purple-700">
              Shop Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your shop description"
              className="p-4 border border-purple-300 rounded-xl h-[56px]"
              required
            />
          </div>

          {/* Shop Address */}
          <div className="flex flex-col w-full md:w-[48%] mb-6">
            <label className="mb-2 font-semibold text-purple-700">
              Shop Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`${seller?.address ? seller.address : "Enter your shop address"}`}
              className="p-4 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition bg-white"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col w-full md:w-[48%] mb-6">
            <label className="mb-2 font-semibold text-purple-700">
              Phone Number
            </label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={`${seller?.phoneNumber ? seller.phoneNumber : "Enter your phone number"}`}
              className="p-4 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition bg-white"
              required
            />
          </div>

          {/* Zip Code */}
          <div className="flex flex-col w-full md:w-[48%] mb-6">
            <label className="mb-2 font-semibold text-purple-700">
              Zip Code
            </label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              placeholder={`${seller?.zipCode ? seller.zipCode : "Enter your zip code"}`}
              className="p-4 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition bg-white"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="w-full mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-purple-700 transition w-full max-w-xs shadow-lg"
            >
              {loading ? "Updating..." : "Update Shop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
