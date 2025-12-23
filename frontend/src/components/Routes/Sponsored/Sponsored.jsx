import React from "react";

const Sponsored = () => {
  const brands = [
    {
      id: 1,
      name: "Apple",
      img: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    },
    {
      id: 2,
      name: "LG",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/2560px-LG_logo_%282014%29.svg.png",
    },
    {
      id: 3,
      name: "Oppo",
      img: "https://logodownload.org/wp-content/uploads/2021/03/oppo-logo.png",
    },
    {
      id: 4,
      name: "Fossil",
      img: "https://cdn.worldvectorlogo.com/logos/fossil-group-1.svg",
    },
    {
      id: 5,
      name: "Samsung",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/00/Samsung_Orig_Wordmark_BLACK_RGB.png",
    },
    {
      id: 6,
      name: "Sony",
      img: "https://pngimg.com/d/sony_logo_PNG7.png",
    },
  ];

  return (
    <div className="w-full bg-white py-10 mb-12 hidden sm:block">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Sponsored Brands
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-8 w-full px-5 lg:px-20">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex items-center justify-center bg-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 flex-1 min-w-[150px] max-w-[220px] h-25"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsored;
