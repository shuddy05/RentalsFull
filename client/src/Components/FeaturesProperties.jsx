import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import PropertyCard from "./PropertyCard";

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
      } catch {
        setError("Failed to fetch properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center py-24 bg-[#F1F0FE]">
        <div className="w-8 h-8 border-3 border-[#7065F0] border-t-transparent rounded-full animate-spin" />
        <p className="ml-3 text-[#7065F0] text-base font-medium">
          Loading properties...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center py-20 bg-[#F1F0FE]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <main className="bg-[#F1F0FE]">
      <div className="layout flex flex-col gap-8 md:gap-11 py-14">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-[32px] font-bold text-gray-900">
              Featured Properties
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-1">
              Explore our hand-picked selection of top-rated listings
            </p>
          </div>

          <button
            onClick={() => {
              setShowAll(!showAll);
            }}
            className="text-sm md:text-base font-medium cursor-pointer text-white bg-[#7065F0] hover:bg-[#5a51d4] px-5 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {displayed.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FeaturesProperties;
