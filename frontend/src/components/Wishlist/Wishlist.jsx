import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiMinus } from "react-icons/hi";
import { Link } from "react-router-dom";

const Wishlist = ({ setOpenWishlist }) => {
  const wishlistData = [
    {
      name: "iPhone 14 Pro max ",
      description: "Apple iPhone 14 Pro with A16 Bionic chip and 128GB storage",
      price: 1199,
    },
    {
      name: "Samsung Galaxy S23",
      description:
        "Samsung Galaxy S23 smartphone with Snapdragon 8 Gen 2 processor",
      price: 999,
    },
  ];

  return (
    <div className="fixed top-0 right-0 w-full h-screen z-10 bg-[#0000004b]">
      <div className="fixed top-0 right-0 min-h-full bg-white w-[30%] shadow-2xl flex flex-col ">
        <div className="p-4 flex justify-end">
          <AiOutlineClose
            className="cursor-pointer text-2xl"
            onClick={() => setOpenWishlist(false)}
            color="red"
            size={35}
          />
        </div>
        <div className={`${styles.normalFlex} p-4`}>
          <AiOutlineHeart size={30} className="text-black" />
          <h5 className="pl-2 text-[20px] font-500">3 Items</h5>
        </div>
        <br />
        {/* Wishlist Items */}
        <div className="w-full border-t overflow-y-auto max-h-[63vh] pr-2">
          {wishlistData &&
            wishlistData.map((i, index) => <SingleCart key={index} data={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
const SingleCart = ({ data }) => {
  return (
    <div className="border-b border-gray-300 p-4 relative">
      {/* ❌ REMOVE BUTTON - Improved Style */}
      <button className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 border border-gray-400 text-gray-600 hover:bg-red-500 hover:text-white transition-shadow shadow-md hover:shadow-lg">
        <AiOutlineClose size={16} title="Remove Item" />
      </button>

      <div className="w-full flex items-center">
        {/* Product Image */}
        <img
          src="https://res.cloudinary.com/junaidshaukat/image/upload/v1751570174/products/product-1751570170239-549601354-0.png"
          alt={data.name}
          className="w-20 h-20 object-cover ml-4 rounded"
        />

        {/* Product Info */}
        <div className="pl-5 w-full">
          <h1 className="font-semibold text-[17px]">{data.name}</h1>
          <p className="text-gray-600 text-sm">{data.description}</p>

          <div className="relative w-full mt-2">
            <h5 className="w-fit bg-purple-500 text-white px-2 py-1 rounded font-bold mt-1 text-sm relative">
              ${data.price} each
            </h5>
            <button className="absolute top-0 left-50  w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 border border-gray-400 text-gray-600 hover:bg-green-500 hover:text-white transition-shadow shadow-md hover:shadow-lg">
              <IoBagHandleOutline size={20} title="Add to Cart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
