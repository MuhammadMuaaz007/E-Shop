import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillPhone,
  AiFillMail,
  AiFillEnvironment,
  AiFillHeart,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-[#4C1D95] via-purple-900 to-indigo-900 text-white w-full">
      {/* Main Footer Section */}
      <div className="max-w-[1200px] mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
        {/* About & Contact */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-center md:justify-start mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
              <span className="font-bold text-xl text-gray-900">M</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
              Muaaz's Mart
            </h3>
          </div>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            Your trusted e-commerce destination for premium quality products,
            unbeatable prices, and exceptional customer service.
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start">
              <AiFillEnvironment className="text-yellow-400 mr-3" size={18} />
              <span className="text-sm text-gray-300">Lahore, Pakistan</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <AiFillPhone className="text-yellow-400 mr-3" size={18} />
              <span className="text-sm text-gray-300">+92 300 1234567</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <AiFillMail className="text-yellow-400 mr-3" size={18} />
              <span className="text-sm text-gray-300">mrmuaaz31@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-yellow-400">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition duration-300 flex items-center justify-center md:justify-start group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-yellow-400 transition duration-300 flex items-center justify-center md:justify-start group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  All Products
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/best-selling"
                className="hover:text-yellow-400 transition duration-300 flex items-center justify-center md:justify-start group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Best Selling
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="hover:text-yellow-400 transition duration-300 flex items-center justify-center md:justify-start group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Events & Deals
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/shop-create"
                className="hover:text-yellow-400 transition duration-300 flex items-center justify-center md:justify-start group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Become a Seller
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-yellow-400">
            Customer Care
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <Link
                to="/faq"
                className="hover:text-yellow-400 transition duration-300 flex items-center justify-center md:justify-start group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  FAQ & Help
                </span>
              </Link>
            </li>
            <li className="hover:text-yellow-400 transition duration-300 cursor-pointer flex items-center justify-center md:justify-start group">
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Shipping & Delivery
              </span>
            </li>
            <li className="hover:text-yellow-400 transition duration-300 cursor-pointer flex items-center justify-center md:justify-start group">
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Returns & Exchanges
              </span>
            </li>
            <li className="hover:text-yellow-400 transition duration-300 cursor-pointer flex items-center justify-center md:justify-start group">
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Order Tracking
              </span>
            </li>
            <li className="hover:text-yellow-400 transition duration-300 cursor-pointer flex items-center justify-center md:justify-start group">
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Size Guide
              </span>
            </li>
          </ul>
        </div>

        {/* Social Media & Business Info */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-yellow-400">
            Connect With Us
          </h3>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl mb-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-yellow-400 hover:scale-125 transition-all duration-300 transform p-2 rounded-full hover:bg-white/10"
            >
              <AiFillFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-yellow-400 hover:scale-125 transition-all duration-300 transform p-2 rounded-full hover:bg-white/10"
            >
              <AiFillInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-yellow-400 hover:scale-125 transition-all duration-300 transform p-2 rounded-full hover:bg-white/10"
            >
              <AiFillTwitterCircle />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-yellow-400 hover:scale-125 transition-all duration-300 transform p-2 rounded-full hover:bg-white/10"
            >
              <AiFillLinkedin />
            </a>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
            <h4 className="font-semibold mb-3 text-yellow-300">
              Business Hours
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Mon - Fri:</span>
                <span>9:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>12:00 PM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Legal */}
      <div className=" border-purple-400/20 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
        <div className="max-w-[1200px] mx-auto px-5 py-8">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
            <Link
              to="/privacy-policy"
              className="text-gray-300 hover:text-yellow-400 transition duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="text-gray-300 hover:text-yellow-400 transition duration-300"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/refund-policy"
              className="text-gray-300 hover:text-yellow-400 transition duration-300"
            >
              Refund Policy
            </Link>
            <Link
              to="/cookie-policy"
              className="text-gray-300 hover:text-yellow-400 transition duration-300"
            >
              Cookie Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-purple-400/20">
            <div className="flex items-center text-gray-300 text-sm">
              <span>
                &copy; {new Date().getFullYear()} Muaaz's Mart. Made with
              </span>
              <AiFillHeart
                className="text-red-400 mx-2 animate-pulse"
                size={16}
              />
              <span>in Pakistan. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
