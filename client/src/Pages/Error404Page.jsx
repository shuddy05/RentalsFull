import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <main className=" bg-[#f5f5e8] text-[#7065F0] h-screen flex justify-center items-center ">
      <div className=" text-center  ">
        <h1 className="text-xl md:text-7xl ">OOOps!!</h1>
        <h1 className="text-xl md:text-3xl mb-6">404-Page Not Found</h1>
        <div className="flex gap-4 justify-center items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-[#7065F0] text-white  hover:bg-[#5a51d4] hover:text-white p-2.5 md:p-3  rounded-2xl cursor-pointer flex items-center justify-center gap-1 "
          >
            {" "}
            <RiArrowGoBackFill />
            Back
          </button>

          <Link to="/">
            <button
              type="button"
              className="bg-[#7065F0] text-white  hover:bg-[#5a51d4] hover:text-white p-2.5 md:p-3 rounded-2xl cursor-pointer flex items-center justify-center gap-1 "
            >
              {" "}
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
