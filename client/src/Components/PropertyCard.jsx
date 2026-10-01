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
    <div className="flex flex-col h-full group transition-transform duration-200 hover:-translate-y-1">
      <div className="rounded-[14px] border border-gray-200 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
        <div className="relative h-56 sm:h-64 shrink-0 overflow-hidden">
          <span
            className={`absolute top-4 left-4 z-10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-white text-xs sm:text-sm font-medium shadow-sm ${
              status === "For Sale" ? "bg-[#097521]" : "bg-[#FF7A37]"
            }`}
          >
            {status}
          </span>

          <div className="absolute top-4 right-4 z-10">
            <BookmarkButton
              propertyId={_id}
              savedProperties={savedProperties}
            />
          </div>

          <img
            src={images[0]}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-[#7065F0] transition-colors line-clamp-1">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#403F3F] line-clamp-1">{location}</p>
            <div className="flex items-center gap-4 sm:gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <PiBedBold className="text-[#7065F0]" />
                <p className="text-sm sm:text-base">
                  {typeof rooms === "number"
                    ? `${rooms} ${rooms === 1 ? "bed" : "beds"}`
                    : rooms?.includes?.("bed")
                      ? rooms
                      : `${rooms} beds`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PiBathtubBold className="text-[#7065F0]" />
                <p className="text-sm sm:text-base">
                  {typeof bath === "number"
                    ? `${bath} ${bath === 1 ? "bath" : "baths"}`
                    : bath?.includes?.("bath")
                      ? bath
                      : `${bath} baths`}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 flex items-center justify-between pt-3 border-t border-gray-100">
            <Link to={`/detail-properties/${_id}`}>
              <button
                type="button"
                className="rounded-lg cursor-pointer bg-purple-500 hover:bg-purple-600 px-4 sm:px-6 py-2 sm:py-2.5 text-white text-sm sm:text-base font-medium shadow-sm transition-colors"
              >
                Details
              </button>
            </Link>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              ₦{price.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
