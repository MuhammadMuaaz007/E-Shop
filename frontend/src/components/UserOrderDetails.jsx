import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../redux/actions/order";
import styles from "../styles/styles";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../server";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  // const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);
  const reviewHandler = async (e) => {
    e.preventDefault(); // prevent default form submission

    if (!selectedItem?._id) {
      toast.error("No product selected for review!");
      return;
    }

    try {
      const { data } = await axios.put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem._id,
          orderId: id,
        },
        { withCredentials: true },
      );

      // Show success toast
      toast.success(data.message || "Review submitted successfully!");

      // Update orders in Redux
      dispatch(getAllOrdersUser(user._id));

      // Reset form
      setComment("");
      setRating(null);
      setOpen(false);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(errMsg); // Show error toast
    }
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersUser(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${item.images[0]?.url}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>

            {data?.status === "Delivered" && !item.isReviewed && (
              <div
                className="
      px-8 h-[45px] flex items-center justify-center rounded-md font-semibold text-[16px] text-purple-600 
      bg-purple-50 border border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-300 
      cursor-pointer whitespace-nowrap
    "
                onClick={() => {
                  setSelectedItem(item);
                  setOpen(true);
                }}
              >
                Give Review
              </div>
            )}
          </div>
        ))}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <RxCross1
                size={28}
                onClick={() => setOpen(false)}
                className="cursor-pointer text-gray-600 hover:text-gray-900 transition"
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
              Give a Review
            </h2>

            {/* Product info */}
            <div className="flex items-center px-6 mb-4">
              <img
                src={selectedItem?.images[0]?.url}
                alt={selectedItem?.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="ml-4 flex-1">
                <div className="text-lg font-medium">{selectedItem?.name}</div>
                <div className="text-purple-600 font-semibold">
                  US${selectedItem?.discountPrice} x {selectedItem?.qty}
                </div>
              </div>
            </div>

            {/* Ratings */}
            <div className="px-6 mb-4">
              <h5 className="text-lg font-medium mb-2">
                Give a Rating <span className="text-red-500">*</span>
              </h5>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      key={i}
                      className="mr-1 cursor-pointer hover:scale-110 transition-transform"
                      color="rgb(246,186,0)"
                      size={28}
                      onClick={() => setRating(i)}
                    />
                  ) : (
                    <AiOutlineStar
                      key={i}
                      className="mr-1 cursor-pointer hover:scale-110 transition-transform"
                      color="rgb(246,186,0)"
                      size={28}
                      onClick={() => setRating(i)}
                    />
                  ),
                )}
              </div>
            </div>

            {/* Comment box */}
            <div className="px-6 mb-6">
              <label className="block text-lg font-medium mb-1">
                Write a Comment{" "}
                <span className="text-gray-500 font-normal text-sm">
                  (optional)
                </span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? Share your experience!"
                className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300"
                rows={4}
              />
            </div>

            {/* Submit button */}
            <div className="px-6 pb-6">
              <button
                onClick={rating > 0 ? reviewHandler : null}
                disabled={rating <= 0}
                className={`w-full py-3 text-white font-semibold rounded-md transition-all duration-300
            ${rating > 0 ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-300 cursor-not-allowed"}`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">
            Country: {data?.shippingAddress.country}
          </h4>
          <h4 className=" text-[20px]">City: {data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">Phone: {data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4 className="font-bold mt-3">
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
          <br />
          {data?.status === "Delivered" && (
            <div
              className={`${styles.button1} text-white`}
              onClick={refundHandler}
            >
              Give a Refund
            </div>
          )}
        </div>
        <Link to="/">
          {" "}
          <button
            className="mt-5 px-6 py-2.5 bg-black text-white rounded-lg 
             shadow-md hover:shadow-lg hover:bg-gray-900 
             transition duration-200 font-medium"
          >
            Send Message
          </button>
        </Link>
      </div>
      <br />
      <br />
    </div>
  );
};

export default UserOrderDetails;
