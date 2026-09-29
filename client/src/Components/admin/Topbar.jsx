import React from "react";
import { useAuth } from "../../context/AuthContext";
import arrowDown from "../../assets/images/Vector.png";
import { useLocation } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import image from "../../assets/images/newpass.jpg";

const Topbar = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const getTitle = () => {
    if (pathname.includes("dashboard")) return "Dashboard";
    if (pathname.includes("properties")) return "My Properties";
    if (pathname.includes("users")) return "User Management";
    if (pathname.includes("tours")) return "Tour Requests";
    if (pathname.includes("listings")) return "Listing Requests";
    if (pathname.includes("settings")) return "Account Settings";
    return "Dashboard";
  };

  return (
    <header className="w-full h-[85px] bg-white flex items-center justify-between px-6 border-b border-gray-100 shadow-sm shrink-0">
      <h1 className="font-bold text-xl text-gray-900">{getTitle()}</h1>
      <div className="flex items-center gap-6">
        <button
          type="button"
          className="w-11 h-11 rounded-full bg-[#F5F7FA] hover:bg-purple-50 flex items-center justify-center cursor-pointer transition-colors"
        >
          <IoMdNotificationsOutline size={24} className="text-gray-600 hover:text-[#7065F0]" />
        </button>

        <div className="flex gap-3 items-center cursor-pointer p-1 rounded-xl">
          <div className="w-[42px] h-[42px] rounded-full ring-2 ring-[#7065F0]/20 overflow-hidden">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <p className="text-gray-500 font-medium text-xs">Admin</p>
            <h2 className="text-gray-800 font-semibold text-sm">
              {user?.email || "Useradmin@gmail.com"}
            </h2>
          </div>
          <img src={arrowDown} alt="" className="w-2.5 opacity-60" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
