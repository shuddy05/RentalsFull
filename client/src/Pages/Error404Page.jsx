import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-[#f5f5e8] text-[#7065F0] min-h-screen flex justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-5xl md:text-8xl font-black mb-2">
          OOOps!!
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold mb-6 text-gray-800">
          404 - Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm md:text-base">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex gap-4 justify-center items-center flex-wrap">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-[#7065F0] hover:bg-[#5a51d4] text-white px-5 py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-md font-medium text-sm sm:text-base transition-colors"
          >
            <RiArrowGoBackFill />
            Back
          </button>

          <Link to="/">
            <button
              type="button"
              className="bg-white border border-[#7065F0] text-[#7065F0] hover:bg-purple-50 px-5 py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-sm font-medium text-sm sm:text-base transition-colors"
            >
              <IoHome />
              Go to Homepage
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error404;
