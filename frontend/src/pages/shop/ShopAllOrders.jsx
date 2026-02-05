import React, { useState } from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import AllOrders from "../../components/Shop/AllOrders";
const ShopAllOrders = () => {
    const [active, setActive] = useState(2);
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-full p-4">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
