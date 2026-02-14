import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { AiOutlineCamera } from "react-icons/ai";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [avatar, setAvatar] = useState(seller?.avatar?.url || "");
  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [zipCode, setZipcode] = useState(seller?.zipCode || "");
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  /* ---------------- BACK NAVIGATION ---------------- */
  const handleGoBack = () => {
    if (location.state?.from === "shop" && location.state?.shopId) {
      navigate(`/shop/${location.state.shopId}`);
    } else if (location.state?.from === "dashboard") {
      navigate("/dashboard");
    } else {
      navigate(-1); // fallback
    }
  };

  /* ---------------- AVATAR UPDATE ---------------- */
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(URL.createObjectURL(file));
    setAvatarLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.put(`${server}/shop/update-shop-avatar`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Avatar updated successfully!");
      dispatch(loadSeller());
    } catch (error) {
      toast.error(error.response?.data?.message || "Avatar update failed");
    } finally {
      setAvatarLoading(false);
    }
  };

  /* ---------------- SHOP INFO UPDATE ---------------- */
  const updateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `${server}/shop/update-shop-info`,
        { name, address, zipCode, phoneNumber, description },
        { withCredentials: true },
      );
      toast.success("Shop info updated successfully!");
      dispatch(loadSeller());
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-12 px-4">
      <div className="bg-white w-full md:w-4/5 lg:w-3/5 rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        {/* 🔙 GO BACK BUTTON */}
        <div className="w-full mb-6">
          <div className="w-full mb-6">
            <div className="w-full mb-6 flex items-center">
              <div className="w-full mb-6">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="
                  `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800 active:scale-[0.97] transition-all duration-200 "
                >
                  <span className="text-lg leading-none">←</span>
                  Go back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AVATAR */}
        <div className="relative mb-12">
          <img
            src={avatar || seller?.avatar?.url}
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

        {/* FORM */}
        <form
          className="w-full flex flex-wrap justify-between"
          onSubmit={updateHandler}
        >
          {[
            { label: "Shop Name", value: name, set: setName },
            {
              label: "Shop Description",
              value: description,
              set: setDescription,
            },
            { label: "Shop Address", value: address, set: setAddress },
            { label: "Phone Number", value: phoneNumber, set: setPhoneNumber },
            { label: "Zip Code", value: zipCode, set: setZipcode },
          ].map(({ label, value, set }) => (
            <div key={label} className="flex flex-col w-full md:w-[48%] mb-6">
              <label className="mb-2 font-semibold text-purple-700">
                {label}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => set(e.target.value)}
                className="p-4 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-200"
                required
              />
            </div>
          ))}

          {/* SUBMIT */}
          <div className="w-full mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="
                bg-purple-600 text-white font-semibold
                py-3 px-8 rounded-xl
                hover:bg-purple-700 transition
                w-full max-w-xs shadow-lg
                disabled:opacity-60
              "
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
