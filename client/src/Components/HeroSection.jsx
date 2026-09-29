import React from "react";
import image from "../assets/images/image 489.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f5f5e8] flex items-center py-12 lg:py-0 overflow-hidden">
      <div className="layout grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col justify-between h-full order-2 lg:order-1">
          <div>
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.15] mb-6 text-gray-900">
              Buy, Rent or Sell Your Property{" "}
              <span className="text-[#7065F0]">Easily</span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              A modern, transparent platform to buy, sell, or rent your
              properties with zero hassle and verified listings.
            </p>

            <div>
              <Link to="/properties">
                <button
                  type="button"
                  className="text-white text-base md:text-lg font-medium cursor-pointer bg-[#7065F0] hover:bg-[#5a51d4] transition-colors rounded-xl py-4 px-8 shadow-md"
                >
                  Browse Properties
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 justify-between text-center gap-6 mt-12 sm:mt-16 pt-8 border-t border-gray-200/70">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">50K+</h2>
              <p className="text-[#403F3F] text-xs sm:text-sm md:text-base mt-1">Happy Renters</p>
            </div>

            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">100K+</h2>
              <p className="text-[#403F3F] text-xs sm:text-sm md:text-base mt-1">Active Users</p>
            </div>

            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">1K+</h2>
              <p className="text-[#403F3F] text-xs sm:text-sm md:text-base mt-1">Properties Listed</p>
            </div>
          </div>
        </div>

        <div className="h-full order-1 lg:order-2 flex items-center justify-center">
          <img
            src={image}
            alt="Luxury property"
            className="w-full max-h-[520px] object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
