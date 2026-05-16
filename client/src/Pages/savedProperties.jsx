import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PiBedBold, PiBathtubBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
      <FaRegHeart className="w-8 h-8 text-gray-400" />
    </div>
    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
      You haven't saved any Properties yet.
    </h2>
    <p className="text-gray-500 text-sm sm:text-base text-center">
      Find Properties you love and tap the{" "}
      <FaHeart className="inline text-red-500 mx-1" /> to save them here
    </p>
    <Link to="/properties">
      <button className="bg-[#7065F0] cursor-pointer text-white px-6 py-3 rounded-xl hover:bg-[#5a51d4] transition-colors">
        Start Exploring
      </button>
    </Link>
  </div>
);

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await api.get("/api/saved-properties");
        setSavedProperties(res.data.data);
      } catch (error) {
        setError("Failed to load saved properties");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);

  const handleUnsave = async (propertyId) => {
    try {
      await api.delete(`/api/saved-properties/${propertyId}`);
      setSavedProperties((prev) => prev.filter((p) => p._id !== propertyId));
    } catch (error) {
      console.error("Unsave error:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#7065F0] text-lg font-medium">
          Loading saved properties...
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
    <main>
      <div className="bg-[#0C092C] h-[230px] sm:h-[330px] text-white text-center flex flex-col items-center justify-center gap-3 px-4">
        <h1 className="text-2xl sm:text-[48px] font-bold">
          Your Saved Properties
        </h1>
        <p className="text-sm sm:text-[18px] text-white/80">
          Quickly access properties you've shown interest in.
        </p>
      </div>

      <div className="layout py-10">
        {savedProperties.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <h2 className="text-2xl sm:text-[32px] font-semibold mb-8">
              Saved Properties ({savedProperties.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {savedProperties.map((property) => {
                const {
                  _id,
                  images,
                  title,
                  location,
                  price,
                  rooms,
                  bath,
                  status,
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
                        <button
                          onClick={() => handleUnsave(_id)}
                          className="absolute top-4 right-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-gray-400 bg-white cursor-pointer"
                        >
                          <FaHeart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                        </button>
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
                          <p className="text-base sm:text-lg text-[#403F3F] flex items-center gap-1">
                            <IoLocationOutline className="shrink-0" />
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
                            <button className="rounded-lg cursor-pointer bg-[#7065F0] px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base hover:bg-[#5a51d4] transition-colors">
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
          </>
        )}
      </div>
    </main>
  );
};

export default SavedProperties;
