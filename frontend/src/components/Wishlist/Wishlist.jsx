import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeFromWishlistAction } from "../../redux/actions/wishlist";
import { addToCartAction } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlistAction(data));
    toast.success("Item removed from wishlist");
  };

  const addToCartHandler = (data) => {
    const cartData = { ...data, qty: 1 };
    dispatch(addToCartAction(cartData));
    setOpenWishlist(false);
    toast.success("Item added to cart");
  };

  return (
    <div className="fixed top-0 right-0 w-full h-screen z-10 bg-black/30">
      <div className="fixed top-0 right-0 min-h-full bg-white w-[30%] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <AiOutlineHeart size={30} className="text-black" />
            <h5 className="text-[20px] font-semibold">
              {wishlist?.length || 0} Items
            </h5>
          </div>
          <AiOutlineClose
            className="cursor-pointer text-2xl text-red-500"
            onClick={() => setOpenWishlist(false)}
          />
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-80px)]">
          {wishlist?.length === 0 ? (
            <h1 className="text-center w-full py-10 text-gray-600">
              Your wishlist is empty
            </h1>
          ) : (
            wishlist.map((item) => (
              <WishlistItem
                key={item._id}
                data={item}
                removeFromWishlistHandler={removeFromWishlistHandler}
                addToCartHandler={addToCartHandler}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

// -------------------------
// Single Wishlist Item
// -------------------------
const WishlistItem = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  // Helper function to format big numbers
  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"; // 1500 -> 1.5k
    }
    return num;
  };

  const price = formatNumber(data.discountPrice || data.originalPrice);

  return (
    <div className="border-b border-gray-200 p-4 flex relative">
      {/* Product Image */}
      <img
        src={data.images?.[0]?.url || "/placeholder.png"}
        alt={data.name}
        className="w-20 h-20 object-cover rounded flex-shrink-0"
      />

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between ml-4">
        {/* Name & Description */}
        <div className="overflow-hidden">
          <h1 className="font-semibold text-[16px] line-clamp-2">{data.name}</h1>
          <p className="text-gray-500 text-sm line-clamp-3 mt-1">
            {data.description || "No description available"}
          </p>
        </div>

        {/* Price */}
        <span className="bg-purple-500 text-white px-2 py-1 rounded font-semibold text-sm mt-2 w-fit">
          ${price} each
        </span>
      </div>

      {/* Buttons Column (exact same location as before) */}
      <div className="flex flex-col items-center justify-between ml-4">
        <button
          onClick={() => removeFromWishlistHandler(data)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 border border-gray-400 text-gray-600 hover:bg-red-500 hover:text-white transition"
        >
          <AiOutlineClose size={16} />
        </button>

        <button
          onClick={() => addToCartHandler(data)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 border border-gray-400 text-gray-600 hover:bg-green-500 hover:text-white transition mt-2"
        >
          <IoBagHandleOutline size={20} />
        </button>
      </div>
    </div>
  );
};


