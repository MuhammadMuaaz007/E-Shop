import React from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi"; // import arrow icon
import styles from "../../styles/styles";

function Hero() {
  return (
    <div
      className="relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat bg-cover flex flex-col items-center justify-center rounded-md"
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className="w-[90%] md:w-[50%] text-center md:text-left">
        <h1 className="text-[30px] md:text-[50px] leading-[1.2] text-[#3d3a3a] font-[500] capitalize break-words mt-3">
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[15px] font-[Poppins] font-[400] text-[#000000ba] break-words">
          Welcome to our premium e-commerce platform, your one-stop destination
          for everything you need. <br />
          We bring you a seamless shopping experience with a wide variety of
          products ranging from fashion,
          <br />
          electronics, home essentials, beauty, lifestyle, and much more. Our
          goal is to make online shopping simple, <br />
          convenient, and enjoyable for everyone. <br />
        </p>
        <Link to="/products">
          <div className="mt-5 flex justify-center md:justify-start">
            <button className={styles.button1}>Shop Now</button>
          </div>
        </Link>
      </div>

      {/* Scroll Down Icon */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
        <FiChevronDown className="text-white text-3xl animate-bounce" />
      </div>
    </div>
  );
}

export default Hero;
