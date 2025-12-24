import React, { useState } from "react";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ShopHomePage = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  const [myShop, setMyShop] = useState(false);

  useEffect(() => {
    if (id === seller._id) {
      setMyShop(true);
    } else {
      setMyShop(false);
    }
  }, [myShop, id, seller._id]);

  return (
    <div className="w-full px-4 md:px-8 min-h-screen bg-[#f5f5f5]">
      {/* Mobile Header */}
      <div className="flex md:hidden justify-between items-center py-4">
        <h2 className="text-xl font-semibold">Shop Dashboard</h2>
        <button onClick={() => setOpenSidebar(true)}>
          <RxHamburgerMenu size={30} />
        </button>
      </div>

      <div className="w-full flex justify-between py-6 relative">
        {/* Sidebar for Desktop */}
        <div
          className="
          hidden md:block 
          w-[25%] bg-white shadow-sm rounded-[4px] 
          h-[95vh] sticky top-10 overflow-y-scroll
        "
        >
          <ShopInfo isOwner={myShop} />
        </div>

        {/* Sidebar for Mobile (Slide in) */}
        {/* Sidebar for Mobile (Slide in) */}
        <div
          className={`
                  fixed top-0 left-0 h-full w-[70%] sm:w-[50%]
                  bg-white shadow-lg z-50 p-4 transition-transform duration-300 
                    ${openSidebar ? "translate-x-0" : "-translate-x-full"}
                    overflow-y-auto
                  `}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Menu</h2>

            <button onClick={() => setOpenSidebar(false)}>
              <RxCross2 size={30} />
            </button>
          </div>

          <ShopInfo isOwner={myShop} />
        </div>
        {openSidebar && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-40"
            onClick={() => setOpenSidebar(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="w-full md:w-[72%] rounded-[4px]">
          <ShopProfileData isOwner={myShop} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
