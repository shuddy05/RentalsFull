import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { PiBedBold, PiBathtubBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";
import BookmarkButton from "./BookmarkButton";

const FeaturesProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? properties : properties.slice(0, 9);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/api/properties");
        setProperties(res.data);
      } catch (error) {
        setError("Failed to fetch properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[#7065F0] text-lg font-medium">
          Loading properties...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <main className="bg-[#F1F0FE]">
      <div className="layout flex flex-col gap-8 md:gap-11 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-[32px] font-semibold">
            Featured Properties
          </h1>

          <button
            onClick={() => {
              setShowAll(!showAll);
            }}
            className="text-[14px] md:text-[18px] cursor-pointer text-white bg-[#7065F0] px-4 py-2 rounded-lg hover:bg-[#5a51d4] transition-colors"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {displayed.map((property) => {
            const {
              _id,
              images,
              title,
              location,
              price,
              rooms,
              bath,
              status,
              savedProperties,
            } = property;

            return (
              <div key={_id} className="flex flex-col">
                <div className="rounded-[10px] border border-[#D9D9D9] bg-white shadow-xl overflow-hidden flex flex-col h-full">
                  <div className="relative h-56 sm:h-64 shrink-0">
                    <button
                      className={`absolute top-4 left-4 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-white text-sm ${status === "For Sale" ? "bg-[#097521]" : "bg-[#FF7A37]"}`}
                    >
                      {status}
                    </button>
                    <div className="absolute top-4 right-4">
                      <BookmarkButton
                        propertyId={_id}
                        savedProperties={savedProperties}
                      />
                    </div>
                    <img
                      src={images[0]}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                    <div className="space-y-2 sm:space-y-3">
                      <h2 className="text-lg sm:text-xl font-semibold">
                        {title}
                      </h2>
                      <p className="text-base sm:text-lg text-[#403F3F]">
                        {location}
                      </p>
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                          <PiBedBold />
                          <p className="text-sm sm:text-base">{rooms}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <PiBathtubBold />
                          <p className="text-sm sm:text-base">{bath}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 flex items-center justify-between">
                      <Link to={`/detail-properties/${_id}`}>
                        <button className="rounded-lg cursor-pointer bg-purple-500 px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base">
                          Details
                        </button>
                      </Link>
                      <h3 className="text-xl sm:text-2xl font-bold">
                        ₦{price.toLocaleString()}
                      </h3>
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
