import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPropertySchema } from "../../utils/formvalidation";
import api from "../../api/axiosConfig";
import { motion } from "framer-motion";

const EditPropertyModal = ({ property, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addPropertySchema),
    defaultValues: property,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put(`/api/admin/properties/${property._id}`, {
        ...data,
        price: Number(data.price),
        rooms: Number(data.rooms),
        bath: Number(data.bath),
        squareArea: Number(data.squareArea),
        parking: Number(data.parking),
        images: data.images.filter(Boolean),
        features: [
          data.wifi && "Free Wifi",
          data.parkingSpace && "Parking Space",
          data.powerSupply && "24/7 Power Supply",
        ].filter(Boolean),
      });
      onSave(res.data.property);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update property");
    } finally {
      setLoading(false);
    }
  };

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
            <h2 className="font-semibold text-lg text-gray-900">Edit Property</h2>
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">Property Images</label>
            {[0, 1, 2].map((index) => (
              <input
                key={index}
                type="url"
                placeholder={`Image URL ${index + 1}`}
                {...register(`images.${index}`)}
                className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm"
              />
            ))}
            <small className="text-red-500">{errors.images?.message}</small>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">
              Property Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("title")}
              className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm"
            />
            <small className="text-red-500">{errors.title?.message}</small>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">
              About the Property <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm resize-none"
            />
            <small className="text-red-500">
              {errors.description?.message}
            </small>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register("type")}
              className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm"
            >
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Office Space">Office Space</option>
            </select>
            <small className="text-red-500">{errors.type?.message}</small>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              {...register("status")}
              className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm"
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
            <small className="text-red-500">{errors.status?.message}</small>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("price")}
              className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm"
            />
            <small className="text-red-500">{errors.price?.message}</small>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("location")}
              className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm"
            />
            <small className="text-red-500">{errors.location?.message}</small>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Bedroom</label>
              <input
                type="number"
                {...register("rooms")}
                className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm"
              />
              <small className="text-red-500">{errors.rooms?.message}</small>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Bathroom</label>
              <input
                type="number"
                {...register("bath")}
                className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm"
              />
              <small className="text-red-500">{errors.bath?.message}</small>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Square Area</label>
              <input
                type="number"
                {...register("squareArea")}
                className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm"
              />
              <small className="text-red-500">
                {errors.squareArea?.message}
              </small>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Parking</label>
              <input
                type="number"
                {...register("parking")}
                className="outline-none w-full border border-gray-200 rounded-lg p-3 text-sm"
              />
              <small className="text-red-500">{errors.parking?.message}</small>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">Features</label>
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="wifi"
                  {...register("wifi")}
                  defaultChecked={property.features?.includes("Free Wifi")}
                  className="w-5 h-5"
                />
                <label htmlFor="wifi" className="text-sm">
                  Free Wifi
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="parkingSpace"
                  {...register("parkingSpace")}
                  defaultChecked={property.features?.includes("Parking Space")}
                  className="w-5 h-5"
                />
                <label htmlFor="parkingSpace" className="text-sm">
                  Parking Space
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="powerSupply"
                  {...register("powerSupply")}
                  defaultChecked={property.features?.includes(
                    "24/7 Power Supply",
                  )}
                  className="w-5 h-5"
                />
                <label htmlFor="powerSupply" className="text-sm">
                  24/7 Power Supply
                </label>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#7065F0] hover:bg-[#5a51d4] text-white text-sm font-semibold disabled:opacity-50 cursor-pointer shadow-sm transition-colors"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditPropertyModal;
