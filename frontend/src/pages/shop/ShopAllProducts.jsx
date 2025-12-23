import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import AllProducts from "../../components/Shop/AllProducts";

const ShopAllProducts = () => {
  const [active, setActive] = useState(3);

  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-full p-4">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
