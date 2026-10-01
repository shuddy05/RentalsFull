import React, { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineBedroomChild } from "react-icons/md";
import { LuBath } from "react-icons/lu";
import { LuSquareArrowOutUpLeft } from "react-icons/lu";
import { RiCarWashingLine } from "react-icons/ri";
import { BsCheckSquareFill } from "react-icons/bs";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import agentImg from "../assets/images/newpass.jpg";
import map from "../assets/images/Map.png";
import api from "../api/axiosConfig";
import BookmarkButton from "../Components/BookmarkButton";
import PropertyCard from "../Components/PropertyCard";
const DetailedProperties = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tourType, setTourType] = useState("In Person");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/api/properties/${id}`);
        setProperty(res.data);
        const allRes = await api.get("/api/properties");
        const others = allRes.data
          .filter((p) => p._id !== id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        setSimilarProperties(others);
      } catch {
        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-9 h-9 border-3 border-[#7065F0] border-t-transparent rounded-full animate-spin" />
        <p className="ml-3 text-[#7065F0] text-lg font-medium">
          Loading property...
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
      <div className="layout py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/properties" className="hover:text-[#7065F0] transition-colors">
            Properties
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium truncate">{property.title}</span>
        </div>

        {/* Title & Location Header */}
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl sm:text-[34px] font-bold text-gray-900">
            {property.title}
          </h1>
          <p className="text-sm sm:text-base font-normal flex gap-2 items-center text-[#403F3F]">
            <IoLocationOutline className="h-5 w-4 shrink-0 text-[#7065F0]" />
            {property.location}
          </p>
        </div>

        {/* Images Gallery */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative w-full lg:w-[63%] h-[280px] sm:h-[400px] lg:h-[462px] rounded-2xl overflow-hidden shadow-md group">
            <button
              className={`absolute top-4 left-4 rounded-full px-4 py-1.5 text-white z-10 text-xs sm:text-sm font-medium shadow-sm ${
                property.status === "For Sale" ? "bg-[#097521]" : "bg-[#FF7A37]"
              }`}
            >
              {property.status}
            </button>
            <div className="absolute top-4 right-4 z-10">
              <BookmarkButton
                propertyId={property._id}
                savedProperties={property.savedProperties}
              />
            </div>
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>

          <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-[35%]">
            <div className="w-1/2 lg:w-full h-[150px] sm:h-[190px] lg:h-[220px] rounded-2xl overflow-hidden shadow-sm group">
              <img
                src={property.images[1]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="w-1/2 lg:w-full h-[150px] sm:h-[190px] lg:h-[220px] rounded-2xl overflow-hidden shadow-sm group">
              <img
                src={property.images[2]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>
        </div>

        {/* Key Features Banner */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-xs uppercase font-semibold text-gray-400">Bedrooms</h2>
              <p className="flex items-center gap-2 text-gray-800 font-medium text-base">
                <MdOutlineBedroomChild className="text-[#7065F0] text-lg" />{" "}
                {typeof property.rooms === "number"
                  ? `${property.rooms} ${property.rooms === 1 ? "Bedroom" : "Bedrooms"}`
                  : property.rooms}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xs uppercase font-semibold text-gray-400">Bathrooms</h2>
              <p className="flex items-center gap-2 text-gray-800 font-medium text-base">
                <LuBath className="text-[#7065F0] text-lg" />{" "}
                {typeof property.bath === "number"
                  ? `${property.bath} ${property.bath === 1 ? "Bathroom" : "Bathrooms"}`
                  : property.bath}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xs uppercase font-semibold text-gray-400">Square Area</h2>
              <p className="flex items-center gap-2 text-gray-800 font-medium text-base">
                <LuSquareArrowOutUpLeft className="text-[#7065F0] text-lg" />{" "}
                {typeof property.squareArea === "number"
                  ? `${property.squareArea.toLocaleString()} sq ft`
                  : property.squareArea}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xs uppercase font-semibold text-gray-400">Parking</h2>
              <p className="flex items-center gap-2 text-gray-800 font-medium text-base">
                <RiCarWashingLine className="text-[#7065F0] text-lg" />{" "}
                {typeof property.parking === "number"
                  ? `${property.parking} ${property.parking === 1 ? "Space" : "Spaces"}`
                  : property.parking}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xs uppercase font-semibold text-gray-400">Status</h2>
              <p className="text-gray-800 font-medium text-base">{property.status}</p>
            </div>
          </div>
          <div className="shrink-0 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 w-full lg:w-auto text-left lg:text-right">
            <p className="text-xs uppercase font-semibold text-gray-400">Rent Price</p>
            <h1 className="text-2xl sm:text-[32px] font-bold text-[#7065F0]">
              ₦{property.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-500">/year</span>
            </h1>
          </div>
        </div>

        {/* Content & Sidebar */}
        <section className="py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-6">
              {/* About */}
              <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  About this property
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {property.description}
                </p>
              </div>

              {/* Property Features */}
              <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-5">
                  Property Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {property.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 cursor-default"
                    >
                      <BsCheckSquareFill className="text-[#7065F0] w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Location
                </h2>
                <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
                  <img
                    src={map}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl flex items-center gap-3 p-3 max-w-[220px] border border-gray-100">
                    <img
                      src={property.images[0]}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-xs truncate">
                        {property.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <FiMapPin className="text-[#7065F0] w-3 h-3 shrink-0" />
                        <p className="text-xs text-gray-500 truncate">
                          {property.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[360px] flex flex-col gap-6">
              {/* Agent Detail */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Agent Detail
                </h2>
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={agentImg}
                    alt="Agent"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-base">
                      Ibrahim Moshood
                    </p>
                    <p className="text-xs text-gray-500">
                      Licensed Real Estate Agent
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#7065F0] hover:bg-[#5a51d4] text-white font-medium text-sm shadow-md transition-colors cursor-pointer"
                >
                  <FiPhone className="w-4 h-4" />
                  Call Agent
                </button>
              </div>

              {/* Schedule Tour */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Schedule a Tour
                </h2>
                <div className="flex gap-3 mb-5">
                  {["In Person", "Virtual"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTourType(type)}
                      className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                        tourType === type
                          ? "bg-[#7065F0] text-white shadow-sm"
                          : "border border-gray-300 text-gray-600 bg-white hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3.5">
                  <input
                    type="date"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#7065F0]/30"
                  />
                  <input
                    type="time"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#7065F0]/30"
                  />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7065F0]/30"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7065F0]/30"
                  />
                  <textarea
                    placeholder="Optional message..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7065F0]/30 resize-none"
                  />
                  <button
                    type="button"
                    className="w-full py-3.5 rounded-xl bg-[#7065F0] hover:bg-[#5a51d4] text-white font-medium text-sm shadow-md transition-colors cursor-pointer"
                  >
                    Submit Tour Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Properties */}
        <div className="mt-8 mb-16">
          <h2 className="text-2xl sm:text-[30px] font-bold text-gray-900 mb-6">
            Similar Properties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailedProperties;
