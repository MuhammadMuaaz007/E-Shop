import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

// import { useSelector } from "react-redux";


function DashboardSideBar() {
  const location = useLocation();
  // const { seller } = useSelector((state) => state.seller);

  /* ---------------- MENU CONFIG ---------------- */
  const sidebarMenu = [
    {
      section: "Main",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: RxDashboard },
        { label: "All Orders", path: "/dashboard-orders", icon: FiShoppingBag },
        {
          label: "All Products",
          path: `/dashboard-products`,
          icon: FiPackage,
        },
      ],
    },
    {
      section: "Manage",
      items: [
        {
          label: "Create Product",
          path: "/dashboard-create-product",
          icon: AiOutlineFolderAdd,
        },
        {
          label: "All Events",
          path: "/dashboard-events",
          icon: MdOutlineLocalOffer,
        },
        {
          label: "Create Event",
          path: "/dashboard-create-event",
          icon: VscNewFile,
        },
      ],
    },
    {
      section: "Finance & Support",
      items: [
        {
          label: "Withdraw Money",
          path: "/dashboard-withdraw-money",
          icon: CiMoneyBill,
        },
        {
          label: "Refunds",
          path: "/dashboard-refunds",
          icon: HiOutlineReceiptRefund,
        },
        {
          label: "Messages",
          path: "/dashboard-messages",
          icon: BiMessageSquareDetail,
        },
        {
          label: "Discount Codes",
          path: "/dashboard-coupons",
          icon: AiOutlineGift,
        },
      ],
    },
    {
      section: "Account",
      items: [{ label: "Settings", path: "/settings", icon: CiSettings }],
    },
  ];

  return (
    <aside className="w-full h-[90vh] bg-white shadow-sm p-4 sticky top-0 overflow-y-auto">
      {sidebarMenu.map(({ section, items }) => (
        <div key={section} className="mb-4">
          <p className="text-xs uppercase text-gray-400 font-semibold mb-2 px-2">
            {section}
          </p>

          {items.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }
                `}
              >
                <Icon size={22} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}

export default DashboardSideBar;
