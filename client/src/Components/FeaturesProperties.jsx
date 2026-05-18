import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
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
          {displayed.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FeaturesProperties;
