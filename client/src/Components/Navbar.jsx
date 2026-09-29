import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import logo from "../assets/images/newlogo.png";
import { useAuth } from "../context/AuthContext";
import arrowDown from "../assets/images/Vector.png";
import photo from "../assets/images/newpass.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownVariants, mobileMenuVariants } from "../utils/motion";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = user
    ? [
      { label: "Home", path: "/" },
        { label: "Properties", path: "/properties" },
        { label: "About Us", path: "/about" },
        { label: "Saved Properties", path: "/saved-properties" },
        { label: "Contact Us", path: "/contact" },
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Properties", path: "/properties" },
        { label: "About Us", path: "/about" },
         { label: "Saved Properties", path: "/saved-properties" },
        { label: "Contact Us", path: "/contact" },
      ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)]">
      <nav className="layout flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src={logo}
            alt="Estatery Logo"
            className="h-9 w-auto"
          />
          <span className="font-bold text-xl text-gray-900 tracking-tight">Estatery</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, path }) => {
            const isActive = pathname === path;
            return (
              <li key={path} className="relative">
                <Link
                  to={path}
                  className={`text-[16px] font-medium transition-colors py-1 ${
                    isActive
                      ? "text-[#7065F0] font-semibold"
                      : "text-gray-500 hover:text-[#7065F0]"
                  }`}
                >
                  {label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7065F0] rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {loading && !user ? (
          <div className="hidden lg:block w-32 h-10" />
        ) : user ? (
          <div
            className="hidden lg:flex items-center gap-3 relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="rounded-full w-[45px] h-[45px] ring-2 ring-[#7065F0]/20 overflow-hidden">
                <img
                  src={photo}
                  alt=""
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <span className="text-[16px] font-semibold text-gray-700">
                Hello, {user.email.split("@")[0]}
              </span>
              <img
                src={arrowDown}
                alt=""
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="absolute right-0 top-12 bg-white border border-gray-100 rounded-xl shadow-xl py-2 w-52 z-50 origin-top-right overflow-hidden"
                >
                  <Link
                    to="/account"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7065F0] transition-colors"
                  >
                    Account Settings
                  </Link>
                  <Link
                    to="/sellerMode"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7065F0] transition-colors"
                  >
                    Switch to Seller Mode
                  </Link>
                  <Link
                    to="/help"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7065F0] transition-colors"
                  >
                    Help
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    className="w-full cursor-pointer text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/login"
              className="text-[16px] font-semibold text-[#7065F0] hover:text-[#5a51d4] transition-colors cursor-pointer"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-[16px] font-semibold text-white bg-[#7065F0] hover:bg-[#5a51d4] transition-colors px-5 py-2.5 rounded-xl cursor-pointer shadow-md shadow-purple-500/20"
            >
              Sign up
            </Link>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden cursor-pointer text-gray-700 p-1 rounded-lg"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <IoCloseOutline size={28} />
          ) : (
            <RxHamburgerMenu size={24} />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 overflow-hidden"
          >
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
              {!loading &&
                (user ? (
                  <>
                    <Link
                      to="/account"
                      onClick={() => setMenuOpen(false)}
                      className="text-[16px] font-medium text-gray-700 py-2 hover:text-[#7065F0] transition-colors"
                    >
                      Account Settings
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        navigate("/login");
                        setMenuOpen(false);
                      }}
                      className="text-[16px] font-semibold text-red-500 text-center py-2.5 border border-red-400 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-[16px] font-semibold text-[#7065F0] text-center py-2.5 border border-[#7065F0] rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="text-[16px] font-semibold text-white bg-[#7065F0] text-center py-2.5 rounded-xl hover:bg-[#5a51d4] transition-colors shadow-md shadow-purple-500/20"
                    >
                      Sign up
                    </Link>
                  </>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
