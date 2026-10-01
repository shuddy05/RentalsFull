import React from "react";
import { IoClose } from "react-icons/io5";
import { BsCheckSquareFill } from "react-icons/bs";
import { motion } from "framer-motion";

const ViewPropertyModal = ({
  property,
  onClose,
  onEdit,
  onToggleAvailability,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <h2 className="font-semibold text-lg">Property Details</h2>
            <p className="text-sm text-gray-500">{property.location}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
        
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-[200px] object-cover rounded-xl"
          />

         
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base border-b border-gray-100 pb-2">
              Basic Information
            </h3>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">Property Title</p>
              <p className="text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                {property.title}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">About the Property</p>
              <p className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">Property Type</p>
              <p className="text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                {property.type}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                ₦{property.price.toLocaleString()}/year
              </p>
            </div>
          </div>

         
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base border-b border-gray-100 pb-2">
              Location
            </h3>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                {property.location}
              </p>
            </div>
          </div>

         
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base border-b border-gray-100 pb-2">
              Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Bedroom</p>
                <p className="text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                  {typeof property.rooms === "number"
                    ? `${property.rooms} ${property.rooms === 1 ? "Bedroom" : "Bedrooms"}`
                    : property.rooms}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Bathroom</p>
                <p className="text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                  {typeof property.bath === "number"
                    ? `${property.bath} ${property.bath === 1 ? "Bathroom" : "Bathrooms"}`
                    : property.bath}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Square Area</p>
                <p className="text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                  {typeof property.squareArea === "number"
                    ? `${property.squareArea.toLocaleString()} sq ft`
                    : property.squareArea}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">Parking</p>
                <p className="text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                  {typeof property.parking === "number"
                    ? `${property.parking} ${property.parking === 1 ? "Space" : "Spaces"}`
                    : property.parking}
                </p>
              </div>
            </div>

       
            {property.features?.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {property.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <BsCheckSquareFill className="text-[#7065F0] w-4 h-4 shrink-0" />
                    <span className="text-sm text-gray-700">{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onEdit}
              className="px-5 py-2.5 rounded-xl border border-[#7065F0] text-[#7065F0] text-sm font-semibold hover:bg-purple-50 cursor-pointer transition-colors"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                onToggleAvailability(property._id, property.availability);
                onClose();
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer text-white shadow-sm transition-colors ${
                property.availability === "Available"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {property.availability === "Available"
                ? "Unlist Property"
                : "Activate Property"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ViewPropertyModal;
