import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { useState, useEffect } from "react";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import shop from "../../assets/shop-final.jpg";
import styles from "../../styles/styles";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";

import { RiLogoutCircleRLine } from "react-icons/ri";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/user";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchData([]);
      return;
    }

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setSearchData(filteredProducts);
  };
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(logoutUser());
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // FIX: Smooth sticky with no jerk
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="w-full mx-auto bg-gray-100">
        {/* TOP HEADER BAR */}
        <div className="mx-5 hidden md:h-[50px] md:my-[10px] md:flex items-center justify-between ">
          <div className="w-[50px] md:w-[90px] flex items-center ">
            <Link to="/">
              <img src={shop} alt="" className="w-12 bg-white rounded-full" />
            </Link>
            <div className="w-1 flex">
              <h1 className="font-bold text-md mr-2 ml-3">Muaaz's</h1>
              <h1 className="font-bold text-md text-purple-500">Mart</h1>
            </div>
          </div>

          {/* SEARCH BOX */}
          <div className="w-[35%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] px-2 w-full border-[#7e22ce] border-[2px] rounded-md outline-none"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 cursor-pointer top-1.5 "
            />

            {searchData.length > 0 && (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm mt-2 p-4 z-10 ">
                {searchData.map((i, index) => {
                  return (
                    <Link to={`/product/${i._id}`} key={index}>
                      <div className="w-full flex items-start py-1">
                        <img
                          src={i.images?.[0]?.url}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px] rounded-lg"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className={`${styles.button1}`}>
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <div
          className={`${
            active ? "shadow-sm fixed top-0 left-0 z-10" : ""
          } hidden md:flex items-center justify-between w-full bg-[#4C1D95] h-[70px] transition`}
        >
          <div
            className={`${styles.section} relative ${styles.normalFlex} justify-between`}
          >
            {/* CATEGORIES */}
            <div onClick={() => setDropDown(!dropDown)}>
              <div className="relative h-[60px] mt-[10px] w-[270px] hidden lg:block">
                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />

                <button className="h-full w-full flex justify-center items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                  All Categories
                </button>

                {dropDown ? (
                  <IoIosArrowUp
                    size={20}
                    className="absolute right-2 top-4 cursor-pointer"
                  />
                ) : (
                  <IoIosArrowDown
                    size={20}
                    className="absolute right-2 top-4 cursor-pointer"
                  />
                )}

                {dropDown && (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                )}
              </div>
            </div>

            {/* NAVBAR LINKS */}
            <div className={`${styles.normalFlex}`}>
              <Navbar active={activeHeading} />
            </div>

            {/* ICONS */}
            <div className="flex items-center">
              {/* ❤️ Wishlist */}
              <div
                className="relative cursor-pointer mx-[15px] p-1 rounded-xl transition-all duration-200 hover:bg-purple-600 hover:scale-105"
                onClick={() => setOpenWishlist(!openWishlist)}
              >
                <AiOutlineHeart size={30} className="text-white" />
                <span className="absolute -top-1 -right-1 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] flex items-center justify-center">
                  {wishlist && wishlist.length ? wishlist.length : 0}
                </span>
              </div>
              {/* 🛒 Cart */}
              <div
                className="relative cursor-pointer mx-[15px] p-1 rounded-xl transition-all duration-200 hover:bg-purple-600 hover:scale-105"
                onClick={() => setOpenCart(!openCart)}
              >
                <AiOutlineShoppingCart size={30} className="text-white" />
                <span className="absolute -top-1 -right-1 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] flex items-center justify-center">
                  {cart && cart.length ? cart.length : 0}
                </span>
              </div>
              {/* 👤 Avatar / Profile */}
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user.avatar.url}
                    className="h-[40px] w-[40px] rounded-full  shadow-md object-cover mx-[15px] 
                transition-all duration-200 hover:scale-110 hover:ring-4 hover:ring-purple-400"
                    alt="User Avatar"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile
                    size={40}
                    className="cursor-pointer mx-[15px] text-white p-1 rounded-xl transition-all duration-200 hover:bg-purple-600 hover:scale-105"
                  />
                </Link>
              )}
              {/* cart popup */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
              {/* wishlist popup */}
              {openWishlist ? (
                <Wishlist setOpenWishlist={setOpenWishlist} />
              ) : null}
            </div>
          </div>
        </div>
        {active && <div className="h-[70px] hidden sm:block"></div>}
      </div>
      {/* MOBILE HEADER */}

      <div className="w-full h-[60px] fixed bg-white z-50 top-0 left-0 shadow-md flex items-center justify-between px-4 md:hidden">
        {/* Menu Button */}
        <div
          className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <BiMenuAltLeft size={28} />
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link to="/">
            <div className="flex items-center">
              <img
                src={shop}
                alt="Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-2 flex flex-col leading-none">
                <span className="font-bold text-sm">Muaaz's</span>
                <span className="font-bold text-sm">Mart</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer p-2 rounded-md hover:bg-gray-200">
          <AiOutlineShoppingCart size={28} className="text-black" />
          <span className="absolute top-1 right-1 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] flex items-center justify-center">
            {cart && cart.length ? cart.length : 0}
          </span>
        </div>
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          >
            <div
              className="fixed top-0 left-0 w-3/4 sm:w-2/3 h-full bg-white z-50 shadow-lg flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-bold text-lg text-purple-700">Menu</h2>
                <RxCross1
                  size={28}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              {/* Content (scrollable) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* User */}
                <div className="flex items-center border-b pb-4">
                  {isAuthenticated ? (
                    <Link to="/profile" onClick={() => setOpen(false)}>
                      <img
                        src={user.avatar.url}
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover mr-3 shadow-md"
                      />
                    </Link>
                  ) : (
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <CgProfile className="w-12 h-12 text-gray-700" />
                    </Link>
                  )}
                  <div>
                    <p className="font-semibold">
                      {isAuthenticated ? user.name : "Guest"}
                    </p>
                    {!isAuthenticated && (
                      <p className="text-sm text-purple-600">
                        Login to your account
                      </p>
                    )}
                  </div>
                </div>

                {/* Search */}

                <div className="relative w-[35%]">
                  <input
                    type="text"
                    placeholder="Search Product..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="h-[40px] px-2 w-full border-[#7e22ce] border-[2px] rounded-md outline-none"
                  />
                  <AiOutlineSearch
                    size={30}
                    className="absolute right-2 cursor-pointer top-1.5"
                  />

                  {/* Suggestions Popup */}
                  {searchData.length > 0 && (
                    <div className="absolute left-0 top-full w-full bg-white shadow-md mt-1 z-20 rounded-md max-h-[40vh] overflow-y-auto">
                      {searchData.map((i, index) => (
                        <Link to={`/product/${i._id}`} key={index}>
                          <div className="flex items-center p-2 hover:bg-purple-100 cursor-pointer rounded-md">
                            <img
                              src={i.images?.[0]?.url || "/placeholder.png"}
                              alt={i.name}
                              className="w-10 h-10 mr-2 rounded-md object-cover"
                            />
                            <span className="truncate">{i.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Nav Links */}
                <div className="flex flex-col space-y-3 mt-4">
                  <Link
                    to="/"
                    className={`font-medium ${
                      location.pathname === "/"
                        ? "text-purple-600"
                        : "text-gray-700 hover:text-purple-600"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>

                  <Link
                    to="/best-selling"
                    className={`font-medium ${
                      location.pathname === "/best-selling"
                        ? "text-purple-600"
                        : "text-gray-700 hover:text-purple-600"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Best Selling
                  </Link>

                  <Link
                    to="/products"
                    className={`font-medium ${
                      location.pathname === "/products"
                        ? "text-purple-600"
                        : "text-gray-700 hover:text-purple-600"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Products
                  </Link>

                  <Link
                    to="/events"
                    className={`font-medium ${
                      location.pathname === "/events"
                        ? "text-purple-600"
                        : "text-gray-700 hover:text-purple-600"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Events
                  </Link>

                  <Link
                    to="/faq"
                    className={`font-medium ${
                      location.pathname === "/faq"
                        ? "text-purple-600"
                        : "text-gray-700 hover:text-purple-600"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    FAQ
                  </Link>

                  <Link
                    to="/shop-create"
                    className={`${styles.button1} text-center font-medium ${
                      location.pathname === "/shop-create"
                        ? "text-purple-600"
                        : "text-white"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Become a Seller
                  </Link>
                </div>
              </div>

              {/* Footer (fixed) */}
              <div className="p-4 border-t bg-white flex justify-around">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    {/* Profile */}
                    <Link
                      to="/profile"
                      className="flex flex-col items-center text-gray-700 hover:text-purple-600"
                      onClick={() => setOpen(false)}
                    >
                      <img
                        src={user.avatar.url}
                        alt={user.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs">Profile</span>
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        logoutHandler();
                        setOpen(false);
                      }}
                      className="flex flex-col items-center text-gray-700 hover:text-purple-600"
                    >
                      <RiLogoutCircleRLine size={24} />
                      {/* You can change icon to Logout icon */}
                      <span className="text-xs">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex flex-col items-center text-gray-700 hover:text-purple-600"
                    onClick={() => setOpen(false)}
                  >
                    <CgProfile size={24} />
                    <span className="text-xs">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="h-[60px] md:hidden"></div>
    </>
  );
};

export default Header;
