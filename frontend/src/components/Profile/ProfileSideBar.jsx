import React from "react";
import {
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineMessage,
  AiOutlineLogout,
} from "react-icons/ai";
import { BiCreditCard, BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { id: 1, name: "Profile", icon: <AiOutlineUser size={18} /> },
  { id: 2, name: "Orders", icon: <AiOutlineShopping size={18} /> },
  { id: 3, name: "ReFunds", icon: <BiMoneyWithdraw size={18} /> },
  { id: 5, name: "Track", icon: <MdOutlineTrackChanges size={18} /> },
  { id: 6, name: "Password", icon: <RiLockPasswordLine size={18} /> },
  { id: 7, name: "Address", icon: <CiLocationOn size={18} /> },
  { id: 8, name: "LogOut", icon: <AiOutlineLogout size={18} /> },
];

const ProfileSideBar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="md:w-[180px] bg-white shadow-lg rounded-xl p-2">
      {/* Heading only on small screens */}
      <div className="flex md:hidden justify-center mb-2">
        <h2 className="text-sm font-semibold text-gray-700">Menu</h2>
      </div>

      {/* Sidebar container */}
      <div className="flex flex-wrap md:flex-col justify-center items-center gap-3 overflow-x-auto md:overflow-x-visible">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.name === "LogOut") logoutHandler();
              else setActive(item.id);
            }}
            className={`flex flex-col items-center justify-center cursor-pointer p-1 transition-all
              ${active === item.id ? "text-purple-700" : "text-gray-700"}`}
          >
            {/* Circle with icon */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full mb-1
                ${active === item.id ? "bg-purple-100" : "bg-gray-200"} 
                hover:bg-purple-200 transition-all shrink-0`}
            >
              {item.icon}
            </div>

            {/* Name below circle */}
            <span className="text-[10px] text-center font-medium md:text-xs whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSideBar;
