import React from "react";
import { properties } from "../utils/properties";
import image1 from "../assets/images/1.png";
import { FaRegHeart } from "react-icons/fa6";
import { PiBedBold, PiBathtubBold } from "react-icons/pi";

const FeaturesProperties = () => {
  return (
    <main className="bg-[#F1F0FE]">
      <div className="layout md:flex flex-col gap-11">
        <div className="flex justify-between">
          <h1 className=" text-2xl md:text-[32px] ">Featured Properties</h1>
          <button className=" mb-3 md:mb-0  text-[14px] md:text-[18px] text-white bg-[#7065F0] px-4 py-2 rounded-lg">
            View All
          </button>
        </  div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((property) => {
            const { id, image, name, location, price, feature, status } =
              property;

            return (
              <div key={id} className="w-full">
                <div className="rounded-[10px] border border-[#D9D9D9] bg-white shadow-xl overflow-hidden">
                  <div className="relative h-64">
                    <button
                      className={`absolute top-4 left-4 rounded-full px-4 py-2 text-white ${
                        status === "For Sale" ? "bg-[#097521]" : "bg-[#FF7A37]"
                      }`}
                    >
                      {status}
                    </button>

                    <div className="absolute top-4 right-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 bg-white">
                        <FaRegHeart className="h-6 w-6 text-gray-500" />
                      </div>
                    </div>

                    <img
                      src={image}
                      alt={name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h2 className="text-xl font-semibold">{name}</h2>

                      <p className="text-lg text-[#403F3F]">{location}</p>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <PiBedBold />
                          <p>{feature.rooms}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <PiBathtubBold />
                          <p>{feature.bath}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <button className="rounded-lg bg-purple-500 px-6 py-3 text-white">
                        Details
                      </button>

                      <h3 className="text-2xl font-bold">₦{price}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default FeaturesProperties;
