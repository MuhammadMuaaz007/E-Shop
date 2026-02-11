import React from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import AllRefundOrders from "../../components/Shop/AllRefundOrders.jsx";

const ShopAllRefunds = () => {
  const [active, setActive] = React.useState(8);

  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-full p-4"><AllRefundOrders/></div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;
