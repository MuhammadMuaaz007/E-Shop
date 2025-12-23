import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server.js";
import { useNavigate } from "react-router-dom";

const InfoCard = ({ title, value }) => (
  <div className="px-4 py-2 border-b border-gray-200">
    <h5 className="font-semibold text-gray-700 text-sm sm:text-base">
      {title}
    </h5>
    <p className="text-gray-500 text-sm sm:text-base">{value || "N/A"}</p>
  </div>
);

const ShopInfo = ({ isOwner }) => {
  const { seller, isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/shop/logout`, {
        withCredentials: true,
      });

      toast.success("Logged out successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  if (isLoading) return <Loader />;

  if (!seller)
    return <p className="text-center py-10 text-gray-500">Seller not found</p>;

  return (
    <div className="w-full sm:max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Shop Avatar */}
      <div className="flex justify-center mt-6">
        <img
          src={seller?.avatar?.url || "/default-avatar.png"}
          alt={seller.name}
          className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full border-4 border-gray-200"
        />
      </div>

      {/* Shop Name & Description */}
      <div className="text-center px-4 sm:px-6 py-4">
        <h3 className="text-xl sm:text-2xl font-semibold">{seller.name}</h3>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quaerat
          repellat quam eum perferendis, repellendus ex rerum.
        </p>
      </div>

      {/* Info Cards */}
      <div className="divide-y divide-gray-200">
        <InfoCard title="Address" value={seller.address} />
        <InfoCard title="Phone Number" value={seller.phoneNumber} />
        <InfoCard title="Total Products" value={seller.totalProducts || 10} />
        <InfoCard title="Shop Ratings" value={`${seller.ratings || 4}/5`} />
        <InfoCard title="Joined On" value={seller?.createdAt?.slice(0, 10)} />
      </div>

      {/* Owner Actions */}
      {isOwner && (
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-3">
          <Link to="/settings">
            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition text-sm sm:text-base">
              Edit Shop
            </button>
          </Link>
          <button
            onClick={logoutHandler}
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-500 transition text-sm sm:text-base"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
