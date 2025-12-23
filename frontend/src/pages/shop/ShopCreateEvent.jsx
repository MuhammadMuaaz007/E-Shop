import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateEvent from "../../components/Shop/CreateEvent.jsx";

const ShopCreateEvent = () => {
  const [active, setActive] = React.useState(6);
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-full flex justify-center">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvent;
