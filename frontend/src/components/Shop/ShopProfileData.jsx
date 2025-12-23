import React, { useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);

  const tabs = [
    { id: 1, label: "Shop Products" },
    { id: 2, label: "Running Events" },
    { id: 3, label: "Shop Reviews" },
  ];

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between border-b border-gray-200 pb-2 flex-wrap gap-2">
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <h5
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`font-semibold text-lg cursor-pointer pb-1 border-b-2 transition ${
                active === tab.id
                  ? "text-red-500 border-red-500"
                  : "text-gray-700 border-transparent hover:text-red-500"
              }`}
            >
              {tab.label}
            </h5>
          ))}
        </div>

        {/* Dashboard Button */}
        {isOwner && (
          <Link to="/dashboard">
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm">
              Dashboard
            </button>
          </Link>
        )}
      </div>

      <div className="mt-6">
        {active === 1 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productData && productData.length > 0 ? (
              productData.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products available
              </p>
            )}
          </div>
        )}

        {active === 2 && (
          <div className="text-center text-gray-500 py-10">
            No running events yet.
          </div>
        )}

        {active === 3 && (
          <div className="text-center text-gray-500 py-10">
            No reviews yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProfileData;
