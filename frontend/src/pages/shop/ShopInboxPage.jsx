import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardMessages from "../../components/Shop/DashboardMessages";

const ShopInboxPage = () => {
  const [active, setActive] = React.useState(9);
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={active} setActive={setActive} />
        </div>
        <DashboardMessages/>
      </div>
    </div>
  );
};

export default ShopInboxPage;
