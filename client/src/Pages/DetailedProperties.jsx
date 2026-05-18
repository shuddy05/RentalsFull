import React, { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineBedroomChild } from "react-icons/md";
import { LuBath } from "react-icons/lu";
import { LuSquareArrowOutUpLeft } from "react-icons/lu";
import { RiCarWashingLine } from "react-icons/ri";
import { BsCheckSquareFill } from "react-icons/bs";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { PiBedBold, PiBathtubBold } from "react-icons/pi";
import { FaRegHeart as HeartIcon } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import agentImg from "../assets/images/newpass.jpg";
import map from "../assets/images/Map.png";
import api from "../api/axiosConfig";
import BookmarkButton from "../Components/BookmarkButton";

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
      } catch (error) {
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
        <p className="text-[#7065F0] text-lg font-medium">
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
    <main>
      <div className="layout py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/properties" className="hover:text-[#7065F0]">
            Properties
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{property.title}</span>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl sm:text-[32px] font-bold">
            {property.title}
          </h1>
          <p className="text-sm sm:text-base font-normal flex gap-2 items-center text-[#403F3F]">
            <IoLocationOutline className="h-5 w-4 shrink-0" />
            {property.location}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative w-full lg:w-[63%] h-[250px] sm:h-[380px] lg:h-[462px] rounded-lg overflow-hidden">
            <button
              className={`absolute top-4 left-4 rounded-full px-4 py-2 text-white z-10 text-sm ${property.status === "For Sale" ? "bg-[#097521]" : "bg-[#FF7A37]"}`}
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
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-[35%]">
            <div className="w-1/2 lg:w-full h-[150px] sm:h-[180px] lg:h-[214px] rounded-lg overflow-hidden">
              <img
                src={property.images[1]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/2 lg:w-full h-[150px] sm:h-[180px] lg:h-[214px] rounded-lg overflow-hidden">
              <img
                src={property.images[2]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start mt-6 gap-4">
          <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 rounded-2xl p-4 sm:p-6 bg-white border border-gray-200 shadow-sm">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-sm sm:text-base">Bedrooms</h1>
              <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <MdOutlineBedroomChild /> {property.rooms}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-sm sm:text-base">Bathrooms</h1>
              <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <LuBath /> {property.bath}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-sm sm:text-base">
                Square Area
              </h1>
              <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <LuSquareArrowOutUpLeft /> {property.squareArea}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-sm sm:text-base">Parking</h1>
              <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <RiCarWashingLine /> {property.parking}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-sm sm:text-base">Status</h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {property.status}
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <h1 className="text-2xl sm:text-[32px] lg:text-[40px] font-bold">
              ₦{property.price.toLocaleString()}/year
            </h1>
          </div>
        </div>

        <section className="py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-6">
              <div className="rounded-2xl p-5 sm:p-6 bg-white border border-gray-200 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  About this property
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                  {property.description}
                </p>
              </div>

              <div className="rounded-2xl p-5 sm:p-6 bg-white border border-gray-200 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-5">
                  Property Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <BsCheckSquareFill className="text-[#7065F0] w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-[15px]">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 sm:p-6 bg-white border border-gray-200 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-5">
                  Location
                </h2>
                <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-gray-200">
                  <img
                    src={map}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg flex items-center gap-3 p-3 max-w-[200px]">
                    <img
                      src={property.images[0]}
                      alt=""
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
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

            <div className="w-full lg:w-[340px] flex flex-col gap-6">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-5">
                  Agent Detail
                </h2>
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={agentImg}
                    alt="Agent"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-[15px]">
                      Ibrahim Moshood
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Real Estate Agent
                    </p>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#7065F0] text-white font-semibold text-sm sm:text-[15px] hover:bg-[#5a51d4] transition-colors">
                  <FiPhone className="w-4 h-4" />
                  Call Agent
                </button>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-5">
                  Schedule a Tour
                </h2>
                <div className="flex gap-3 mb-5">
                  <button
                    onClick={() => setTourType("In Person")}
                    className={`flex-1 py-2.5 rounded-lg font-semibold text-sm ${tourType === "In Person" ? "bg-[#7065F0] text-white" : "border border-[#7065F0] text-[#7065F0] bg-white"}`}
                  >
                    In Person
                  </button>
                  <button
                    onClick={() => setTourType("Virtual")}
                    className={`flex-1 py-2.5 rounded-lg font-semibold text-sm ${tourType === "Virtual" ? "bg-[#7065F0] text-white" : "border border-[#7065F0] text-[#7065F0] bg-white"}`}
                  >
                    Virtual
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="date"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:border-[#7065F0]"
                  />
                  <input
                    type="time"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:border-[#7065F0]"
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#7065F0]"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#7065F0]"
                  />
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#7065F0] resize-none"
                  />
                  <button className="w-full py-3.5 rounded-xl bg-[#7065F0] text-white font-semibold text-sm sm:text-[15px] hover:bg-[#5a51d4] transition-colors">
                    Submit Tour Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 mb-16">
          <h1 className="text-2xl sm:text-[32px] font-semibold mb-6">
            Similar Properties
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {similarProperties.map((prop) => (
              <div key={prop._id} className="flex flex-col">
                <div className="rounded-[10px] border border-[#D9D9D9] bg-white shadow-xl overflow-hidden flex flex-col h-full">
                  <div className="relative h-56 sm:h-64 shrink-0">
                    <button
                      className={`absolute top-4 left-4 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-white text-sm ${prop.status === "For Sale" ? "bg-[#097521]" : "bg-[#FF7A37]"}`}
                    >
                      {prop.status}
                    </button>
                    <div className="absolute top-4 right-4">
                      <BookmarkButton
                        propertyId={prop._id}
                        savedProperties={prop.savedProperties}
                      />
                    </div>
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                    <div className="space-y-2 sm:space-y-3">
                      <h2 className="text-lg sm:text-xl font-semibold">
                        {prop.title}
                      </h2>
                      <p className="text-base sm:text-lg text-[#403F3F]">
                        {prop.location}
                      </p>
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                          <PiBedBold />
                          <p className="text-sm sm:text-base">{prop.rooms}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <PiBathtubBold />
                          <p className="text-sm sm:text-base">{prop.bath}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 flex items-center justify-between">
                      <Link to={`/detail-properties/${prop._id}`}>
                        <button className="rounded-lg cursor-pointer bg-purple-500 px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base">
                          Details
                        </button>
                      </Link>
                      <h3 className="text-xl sm:text-2xl font-bold">
                        ₦{prop.price.toLocaleString()}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailedProperties;
