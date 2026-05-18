import React from "react";
import { PiBedBold, PiBathtubBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";

const PropertyCard = ({ property }) => {
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
    <div className="flex flex-col h-full">
      <div className="rounded-[10px] border border-[#D9D9D9] bg-white shadow-xl overflow-hidden flex flex-col h-full">
        <div className="relative h-56 sm:h-64 shrink-0">
          <button
            className={`absolute top-4 left-4 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-white text-sm ${
              status === "For Sale" ? "bg-[#097521]" : "bg-[#FF7A37]"
            }`}
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
            <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
            <p className="text-base sm:text-lg text-[#403F3F]">{location}</p>
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
};

export default PropertyCard;
