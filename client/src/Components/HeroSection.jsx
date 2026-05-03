import React from "react";
import image from "../assets/images/image 489.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <main className="min-h-screen bg-[#f5f5e8] flex items-center">
      <div className="layout grid lg:grid-cols-2 gap-12 items-stretch order-2 lg:order-1 ">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-6">
              Buy, Rent or Sell Your Property Easily
            </h1>

            <p className=" text-md md:text-lg text-gray-500 mb-10">
              A great platform to buy, sell, or even rent your properties
              without any commissions.
            </p>
            <Link to="/properties">
              <button
                type="button"
                className="text-white text-lg cursor-pointer bg-purple-500 rounded-lg py-4 px-8"
              >
                Browse Properties
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-3 justify-between text-center gap-8 mt-16 ">
            <div className="text-c">
              <h2 className="text-2xl md:text-4xl font-semibold">50K+</h2>
              <p className="text-[#403F3F] text-sm md:text-lg">Happy Renters</p>
            </div>

            <div>
              <h2 className="text-2xl md:text-4xl font-semibold">100K+</h2>
              <p className="text-[#403F3F] text-sm md:text-lg">Active Users</p>
            </div>

            <div>
              <h2 className="text-2xl md:text-4xl font-semibold">1K+</h2>
              <p className="text-[#403F3F] text-sm md:text-lg">
                Properties Listed
              </p>
            </div>
          </div>
        </div>

        <div className="h-full order-1 lg:order-2 ">
          <img
            src={image}
            alt="Luxury property"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
