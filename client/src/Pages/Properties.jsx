import React, { useState, useEffect } from "react";
import circle from "../assets/images/WarningCircle.png";
import ErrorImg from "../assets/images/Frame.png";
import BgImage from "../assets/images/bgImage.jpg";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";
import PropertyCard from "../Components/PropertyCard";
import { useAuth } from "../context/AuthContext";

const NoMatchFound = ({ onClear }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6">
    <img
      src={ErrorImg}
      alt="No match"
      className="w-40 sm:w-auto"
    />
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 text-center">
      No match found
    </h2>
    <p className="text-gray-500 text-sm sm:text-base mb-8 text-center max-w-sm flex items-start gap-2">
      <span className="shrink-0">
        <img src={circle} alt="" />
      </span>
      We couldn't find any house that matches your search request.
    </p>
    <button
      onClick={onClear}
      className="px-8 py-3 rounded-xl bg-[#7065F0] hover:bg-[#5a51d4] text-white font-semibold text-base cursor-pointer shadow-md transition-colors"
    >
      Clear Filters
    </button>
  </div>
);

const Properties = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchType, setSearchType] = useState("");
  const [searchBudget, setSearchBudget] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/api/properties");
        setProperties(res.data);
      } catch {
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = () => {
    if (!searchType && !searchBudget && !searchLocation) return;
    setSearched(true);
    setActiveFilter("All");
  };

  const handleClear = () => {
    setSearchType("");
    setSearchBudget("");
    setSearchLocation("");
    setSearched(false);
    setActiveFilter("All");
  };

  const filteredProperties = properties.filter((property) => {
    const matchesStatus =
      activeFilter === "All" ||
      (activeFilter === "For Rent" && property.status === "For Rent") ||
      (activeFilter === "For Sale" && property.status === "For Sale");

    const matchesType = searchType
      ? property.type?.toLowerCase() === searchType.toLowerCase()
      : true;

    const matchesBudget = searchBudget
      ? property.price <= Number(searchBudget)
      : true;

    const matchesLocation = searchLocation
      ? property.location?.toLowerCase().includes(searchLocation.toLowerCase())
      : true;

    return matchesStatus && matchesType && matchesBudget && matchesLocation;
  });

  const showNoMatch = searched && filteredProperties.length === 0;

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-9 h-9 border-3 border-[#7065F0] border-t-transparent rounded-full animate-spin" />
        <p className="ml-3 text-[#7065F0] text-lg font-medium">
          Loading properties...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <main className="pb-16">
      <div>
        <div
          className={`relative min-h-[420px] md:min-h-[484px] text-center flex flex-col justify-center items-center px-4 py-12
            ${!user ? "bg-[#0C092C]" : ""}`}
        >
          {user && (
            <div>
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${BgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 z-0 bg-black/60" />
            </div>
          )}
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-white text-2xl md:text-[48px] font-bold mb-4">
              {user ? "Find the right property for you" : "Browse Property"}
            </h1>
            <p className="text-sm md:text-[18px] text-[#E0DDDD] mb-8 md:mb-[54px] font-normal px-2">
              {user
                ? "Browse verified properties, save your favorites, and connect directly with sellers—simple, fast, and stress-free."
                : "Explore verified properties available for rent and sale."}
            </p>
          </div>

          <div className="relative z-10 w-full max-w-5xl bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 items-end">
              <div>
                <label className="block text-gray-800 font-semibold text-sm sm:text-base mb-1 text-left">
                  Property Type
                </label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full h-11 sm:h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Office Space">Office Space</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-800 font-semibold text-sm sm:text-base mb-1 text-left">
                  Budget
                </label>
                <input
                  type="number"
                  placeholder="Enter Budget"
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full h-11 sm:h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold text-sm sm:text-base mb-1 text-left">
                  Location
                </label>
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full h-11 sm:h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base cursor-pointer"
                >
                  <option value="">All Locations</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Port Harcourt">Port Harcourt</option>
                  <option value="Ibadan">Ibadan</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="h-11 sm:h-12 w-full sm:col-span-2 md:col-span-1 cursor-pointer rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base shadow-md transition-colors"
              >
                Search Properties
              </button>
            </div>
          </div>
        </div>

        <div className="layout flex flex-col gap-8 md:gap-11 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-[32px] font-bold text-gray-900">
              Featured Properties
            </h1>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {["All", "For Rent", "For Sale"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setSearched(false);
                  }}
                  className={`text-sm sm:text-base font-medium px-4 py-2 cursor-pointer flex-1 sm:flex-none sm:w-[119px] rounded-xl transition-all shadow-sm ${
                    activeFilter === filter
                      ? "text-white bg-[#7065F0] shadow-purple-500/20"
                      : "text-[#7065F0] border border-[#7065F0] hover:bg-purple-50 bg-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {showNoMatch ? (
            <NoMatchFound onClear={handleClear} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>

              <div className="w-full bg-white rounded-2xl border border-gray-200 px-4 sm:px-6 py-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-gray-500 text-sm text-center sm:text-left">
                    Showing <span className="font-semibold text-gray-800">{filteredProperties.length}</span> of <span className="font-semibold text-gray-800">{properties.length}</span>
                  </p>
                  <div className="flex items-center justify-center sm:justify-end gap-4 sm:gap-6">
                    <span className="text-gray-800 font-medium text-sm sm:text-base whitespace-nowrap">
                      Page 1 of 1
                    </span>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {["«", "‹", "›", "»"].map((symbol, idx) => (
                        <button
                          key={idx}
                          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl cursor-pointer ${
                            idx < 2 ? "text-gray-400 hover:bg-gray-100" : "text-gray-700 hover:bg-purple-50 hover:text-[#7065F0]"
                          }`}
                        >
                          {symbol}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Properties;
