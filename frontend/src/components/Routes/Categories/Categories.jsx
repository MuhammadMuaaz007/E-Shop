import React from "react";

import { brandingData, categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="my-12 px-4 md:px-8 lg:px-16">
      {/* Section Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Explore Our Categories
      </h2>

      {/* Branding Section */}
      <div className="hidden sm:flex flex-wrap justify-between gap-4 w-full bg-white rounded-xl shadow-lg p-6 mb-8">
        {brandingData &&
          brandingData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex-1 min-w-[150px]"
            >
              <div className="text-purple-600 text-2xl">{item.icon}</div>
              <div>
                <h3 className="font-bold text-sm md:text-base text-gray-800">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {item.Description}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Categories Section */}
      <div
        className="w-full bg-white shadow-2xl p-6 rounded-2xl"
        id="categories"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categoriesData &&
            categoriesData.map((category) => {
              const handleClick = () => {
                navigate(`/products?category=${category.title}`);
              };

              return (
                <div
                  key={category.id}
                  onClick={handleClick}
                  className="flex flex-col items-center justify-center cursor-pointer bg-purple-50 p-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-[1.03]"
                >
                  <img
                    src={category.image_Url}
                    alt={category.title}
                    className="w-20 h-20 object-contain mb-2"
                  />
                  <h5 className="text-center text-gray-800 font-semibold text-sm md:text-base">
                    {category.title}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
