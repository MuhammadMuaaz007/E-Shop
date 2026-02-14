import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DashboardHeader() {
  const { seller } = useSelector((state) => state.seller);

  return (
    <header className="w-full h-[60px] bg-white shadow-sm sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
      
      {/* Brand */}
      <Link to="/" className="flex items-center">
        <h1 className="font-bold text-lg text-gray-800 mr-1">
          Muaaz&apos;s
        </h1>
        <span className="font-bold text-lg text-purple-500">
          Mart
        </span>
      </Link>

      {/* Right Icons */}
      <nav className="flex items-center space-x-6">
        
        <Link to="/dashboard-coupons" className="hidden md:block">
          <AiOutlineGift title="Coupons" className="icon" size={30} />
        </Link>

        <Link to="/dashboard-events" className="hidden md:block">
          <MdOutlineLocalOffer title="Events" className="icon" size={30} />
        </Link>

        <Link to="/dashboard-products" className="hidden md:block">
          <FiShoppingBag title="Products" className="icon" size={30} />
        </Link>

        <Link to="/dashboard-orders" className="hidden md:block">
          <FiPackage title="Orders" className="icon" size={30} />
        </Link>

        <Link to="/dashboard-messages" className="hidden md:block">
          <BiMessageSquareDetail title="Messages" className="icon" size={30} />
        </Link>

        {/* Profile */}
        <Link to={`/shop/${seller?._id}`}>
          <img
            src={seller?.avatar?.url || "/default-avatar.png"}
            alt="Seller"
            className="w-[45px] h-[45px] rounded-full object-cover border border-gray-300 hover:scale-105 transition duration-200"
          />
        </Link>

      </nav>
    </header>
  );
}

export default DashboardHeader;
