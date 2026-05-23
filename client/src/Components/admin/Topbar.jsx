import React from "react";
import { useAuth } from "../../context/AuthContext";
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
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
    <header className="w-full h-[90px] flex items-center justify-between px-6 border-b border-gray-100 shadow-xl ">
      <h1 className="font-bold text-xl"> {getTitle()} </h1>
      <div className="flex items-center gap-8">
        <button className="w-12.5 h-12.5 rounded-full bg-[#F5F7FA] flex items-center justify-center cursor-pointer">
          <IoMdNotificationsOutline size={30} className="text-gray-600" />
        </button>

        <div className="flex gap-2 items-center">
          <div className="w-[45px] h-[45px] rounded-full ">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded-full "
            />
          </div>

          <div>
            <p className="text-gray-600 font-medium">Admin</p>
            <h1 className="text-gray-700">
              {user?.email || "Useradmin@gmail.com"}
            </h1>
          </div>
          <img src={arrowDown} alt="" className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
