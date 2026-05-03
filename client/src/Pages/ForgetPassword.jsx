import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import image1 from "../assets/images/log1.png";
import logo from "../assets/images/logo.png";

const ForgetPassword = () => {
  return (
    <main className=" bg-[#f5f5e8] h-screen  ">
      <div className=" layout  flex flex-col gap-5 md:flex-row justify-between items-center ">
        <div className=" w-full md:max-w-113.25 md:max-h-149.5 ">
          <h1 className="text-[32px] font-bold">Forget Your Password</h1>
          <p className="text-[16px] text-[#666666] mb-6">
            {" "}
            We’ll send a 6-digit verification code to your email to reset your
            password.{" "}
          </p>

          <div className="flex flex-col gap-3">
            <label className="text-[16px]" htmlFor="email">
              {" "}
              Email <span className="text-red-500 font-bold text-xl ">*</span>
            </label>
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter email"
              className="w-full h-12 px-4 pr-11 border border-gray-300 bg-white rounded-xl text-sm outline-none focus:border-blue-500  "
            />
          </div>

          <button className="mt-[48px] w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-medium rounded-xl">
            Send Code
          </button>
          <Link to="/">
            <p className="text-gray-600  cursor-pointer text-center mt-[24px]">
              Remember your password{" "}
              <span className="text-[#7065F0]">Sign In</span>
            </p>
          </Link>
        </div>

        <div className=" mt-5  shadow-md">
          <img src={image1} alt="Interior" className="" />
        </div>
      </div>
    </main>
  );
};

export default ForgetPassword;
