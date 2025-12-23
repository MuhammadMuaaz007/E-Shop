import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-[#4C1D95] text-white w-full">
      {/* Newsletter Section */}
      <div className="max-w-[1200px] mx-auto px-5 py-10">
        <div className="bg-purple-800 bg-opacity-90 border border-purple-700 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md uppercase text-center md:text-left">
            Subscribe to Our Newsletter
          </h3>
          <div className="flex w-full md:w-1/2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-l-2xl outline-none text-black bg-purple-100 placeholder-gray-600"
            />
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-r-2xl font-semibold transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="max-w-[1200px] mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Muaaz's Mart</h3>
          <p className="text-gray-200 text-sm">
            We provide the best products with premium quality and fast delivery.
            Your one-stop shop for electronics, fashion, lifestyle and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-purple-300 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-purple-300 transition duration-300"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-purple-300 transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-purple-300 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li className="hover:text-purple-300 transition duration-300 cursor-pointer">
              FAQ
            </li>
            <li className="hover:text-purple-300 transition duration-300 cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-purple-300 transition duration-300 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-purple-300 transition duration-300 cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl mb-6 md:mb-0">
            <AiFillFacebook className="cursor-pointer hover:text-purple-300 hover:scale-110 transition duration-300" />
            <AiFillInstagram className="cursor-pointer hover:text-purple-300 hover:scale-110 transition duration-300" />
            <AiFillTwitterCircle className="cursor-pointer hover:text-purple-300 hover:scale-110 transition duration-300" />
            <AiFillLinkedin className="cursor-pointer hover:text-purple-300 hover:scale-110 transition duration-300" />
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="max-w-[1200px] mx-auto px-5 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-purple-700 text-center md:text-left">
        <span className="text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Muaaz's Mart. All rights reserved.
        </span>
        <div className="flex justify-center md:justify-start gap-4 items-center mt-2 md:mt-0">
          <img
            src="https://vectorseek.com/wp-content/uploads/2020/12/vectorseek.com-Jazz-cash-logo-vector.png"
            alt="JazzCash"
            className="h-8 object-contain"
          />
          <img
            src="https://icon2.cleanpng.com/lnd/20250110/er/acded9d6362d497965c18a071cb9fd.webp"
            alt="Easypaisa"
            className="h-8 object-contain"
          />
          <img
            src="https://images.openai.com/static-rsc-1/OuDTx5tfZqGivuwkQRh1bIBAApC0bjbnNZ1FDLMrSc8153M5Xy4mn6yscee3ND_1KmQDpcTQjR7GmrfoBLCbIthplE8TRFC2XBnSF1p4gADPtGcOKxF_2DQ-j1H-rUYxgVmfqui6Klve1OqKanqaXw"
            alt="PayPal"
            className="h-8 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
