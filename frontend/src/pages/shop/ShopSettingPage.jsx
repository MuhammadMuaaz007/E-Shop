import React from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";

const ShopSettingPage = () => {
  return (
    <div>
      <DashboardHeader />
      <ShopSettings />
    </div>
  );
};

export default ShopSettingPage;
