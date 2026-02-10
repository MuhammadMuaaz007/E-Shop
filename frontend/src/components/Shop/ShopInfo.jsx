import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../Layout/Loader.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server.js";
import { useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product.js";
import { useEffect } from "react";
import { useState } from "react";

const InfoCard = ({ title, value }) => (
  <div className="px-4 py-2 border-b border-gray-200">
    <h5 className="font-semibold text-gray-700 text-sm sm:text-base">
      {title}
    </h5>
    <p className="text-gray-500 text-sm sm:text-base">{value || "N/A"}</p>
  </div>
);

const ShopInfo = ({ isOwner }) => {
  const navigate = useNavigate();
  // const { seller } = useSelector((state) => state.seller);
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.product);
  const totalProducts = products?.length || 0;
  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [dispatch, id]);


    const totalReviews =
    products &&
    products.reduce(
      (acc, product) => acc + (product.reviews ? product.reviews.length : 0),
      0,
    );
  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0,
    );

  const avg = totalRatings / totalReviews || 0;

  const averageRating = avg.toFixed(2);

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/shop/logout`, {
        withCredentials: true,
      });

      toast.success("Logged out successfully");
      navigate("/");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  if (isLoading) return <Loader />;

  if (!data?._id && !isLoading) {
    return <p className="text-center py-10 text-gray-500">Seller not found</p>;
  }

  return (
    <div className="w-full sm:max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Shop Avatar */}
      <div className="flex justify-center mt-6">
        <img
          src={data?.avatar?.url || "/default-avatar.png"}
          alt={data.name}
          className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full border-4 border-gray-200"
        />
      </div>

      {/* Shop Name & Description */}
      <div className="text-center px-4 sm:px-6 py-4">
        <h3 className="text-xl sm:text-2xl font-semibold">{data.name}</h3>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quaerat
          repellat quam eum perferendis, repellendus ex rerum.
        </p>
      </div>

      {/* Info Cards */}
      <div className="divide-y divide-gray-200">
        <InfoCard title="Address" value={data.address} />
        <InfoCard title="Phone Number" value={data.phoneNumber} />
        <InfoCard title="Total Products" value={totalProducts} />
        <InfoCard title="Shop Ratings" value={`${averageRating}/5`} />
        <InfoCard title="Joined On" value={data?.createdAt?.slice(0, 10)} />
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
