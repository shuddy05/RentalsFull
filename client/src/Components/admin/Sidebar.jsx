import React from "react";
import logo from "../../assets/images/reallogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineHomeWork } from "react-icons/md";
import { MdOutlineTour } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { VscListFlat } from "react-icons/vsc";
const navLinks = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <RxDashboard size={20} />,
  },
  {
    label: "My Properties",
    path: "/admin/properties",
    icon: <MdOutlineHomeWork size={20} />,
  },
  {
    label: "Tour Requests",
    path: "/admin/tours",
    icon: <MdOutlineTour size={20} />,
  },
  {
    label: "Listing Requests",
    path: "/admin/listings",
    icon: <VscListFlat size={20} />,
  },
  {
    label: "User Management",
    path: "/admin/users",
    icon: <RiUserSettingsLine size={20} />,
  },
  {
    label: "Account Settings",
    path: "/admin/settings",
    icon: <IoSettingsOutline size={20} />,
  },
];
const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className=" w-[250px] bg-white h-screen border-r border-gray-200 py-3 px-4 flex flex-col justify-between ">
      <div>
        <img src={logo} alt="Logo" className="mb-10" />
        <nav className="flex flex-col gap-1">
          {navLinks.map(({ label, path, icon }) => {
            return (
              <NavLink
                to={path}
                key={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium ${isActive ? "bg-[#7065F0] text-white" : "text-[#605E5E] hover:text-gray-800"}`
                }
              >
                {icon}
                {label}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 cursor-pointer"
      >
        <RiLogoutBoxLine size={20} />
        Log Out
      </button>
    </aside>
  );
};

export default Sidebar;
