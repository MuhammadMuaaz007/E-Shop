import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllCoupons from "../../components/Shop/AllCoupons";

const ShopAllCoupons = () => {
  const [active, setActive] = useState(10);

  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-full p-4">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupons;
