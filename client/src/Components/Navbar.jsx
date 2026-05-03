import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import logo from "../assets/images/reallogo.png";

const navLinks = [
  { label: "Home", path: "/home" },
  { label: "Properties", path: "/properties" },
  { label: "About Us", path: "/about" },
  { label: "List Properties", path: "/detail-properties" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="layout flex items-center justify-between p-4">
        <Link to="/home" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Estatery Logo" className="h-9 w-auto" />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`text-[16px] font-medium transition-colors ${
                  pathname === path
                    ? "text-[#7065F0] font-semibold border-b-2 border-[#7065F0] pb-0.5"
                    : "text-gray-500 hover:text-[#7065F0]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/"
            className="text-[16px] font-semibold text-[#7065F0] hover:opacity-80 transition-opacity"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-[16px] font-semibold text-white bg-[#7065F0] hover:bg-[#5a51d4] transition-colors px-5 py-2.5 rounded-xl"
          >
            Sign up
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden cursor-pointer text-gray-700"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <IoCloseOutline size={28} />
          ) : (
            <RxHamburgerMenu size={24} />
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`text-[16px] font-medium py-2 transition-colors ${
                pathname === path
                  ? "text-[#7065F0] font-semibold"
                  : "text-gray-500 hover:text-[#7065F0]"
              }`}
            >
              {label}
            </Link>
          ))}

          <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-[16px] font-semibold text-[#7065F0] text-center py-2.5 border border-[#7065F0] rounded-xl hover:bg-purple-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="text-[16px] font-semibold text-white bg-[#7065F0] text-center py-2.5 rounded-xl hover:bg-[#5a51d4] transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
