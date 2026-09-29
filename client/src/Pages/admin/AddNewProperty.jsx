import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { addPropertySchema } from "../../utils/formvalidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import api from "../../api/axiosConfig";

const AddNewProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addPropertySchema) });

  const onSubmit = async (data, availability) => {
    console.log("form data:", data);
    console.log("availability:", availability);
    setLoading(true);
    setError(null);
    try {
      await api.post("/api/admin/properties", {
        ...data,
        availability,
        images: data.images.filter(Boolean),
        features: [
          data.wifi && "Free Wifi",
          data.parkingSpace && "Parking Space",
          data.powerSupply && "24/7 Power Supply",
        ].filter(Boolean),
      });
      navigate("/admin/properties");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = handleSubmit(
    (data) => {
      console.log("draft valid:", data);
      onSubmit(data, "Draft");
    },
    (errors) => {
      console.log("draft errors:", errors);
    },
  );

  const handlePublish = handleSubmit(
    (data) => {
      console.log("publish valid:", data);
      onSubmit(data, "Available");
    },
    (errors) => {
      console.log("publish errors:", errors);
    },
  );

  return (
    <main>
      <div className="flex gap-2 text-sm items-center mb-6">
        <Link
          className="text-gray-500 hover:text-gray-700 transition-colors"
          to="/admin/properties"
        >
          My Property
        </Link>
        <p className="text-gray-400">›</p>
        <span className="text-gray-800 font-medium">Add New Property</span>
      </div>

      <div className="flex flex-col gap-2 mb-10">
        <h1 className="font-bold text-[22px] text-gray-900">Add a New Property</h1>
        <p className="text-gray-600 text-[15px]">
          Provide details about your properties so buyers can easily discover it
        </p>
      </div>

      <div className="flex justify-center items-center">
        <form className="w-[804px] flex flex-col gap-7">
          <div className="w-full rounded-lg border bg-white border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <h1 className="font-semibold text-[20px] text-gray-800">Basic Information</h1>

            <div className="border border-gray-300 gap-3 flex flex-col items-center justify-center rounded-lg p-6">
              <IoCloudDownloadOutline size={40} className="text-gray-600" />
              <p className="text-gray-600">
                Drag and drop your images here (JPG/PNG, max 5MB)
              </p>
              <p className="text-gray-600">Or paste image URLs below</p>
              <div className="flex flex-col gap-3 w-full">
                {[0, 1, 2].map((index) => (
                  <input
                    key={index}
                    type="url"
                    placeholder={`Image URL ${index + 1} ${index === 0 ? "(required)" : "(optional)"}`}
                    {...register(`images.${index}`)}
                    className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                  />
                ))}
                <small className="text-red-700">{errors.images?.message}</small>
              </div>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px]">
                  Property Title <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your property title"
                  {...register("title")}
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                />
                <small className="text-red-700">{errors.title?.message}</small>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px]">
                  About the Property <span className="text-red-700">*</span>
                </label>
                <textarea
                  placeholder="Enter the description of the property"
                  {...register("description")}
                  className="outline-none w-full h-[114px] border border-gray-200 shadow-sm rounded-lg p-3 resize-none"
                />
                <small className="text-red-700">
                  {errors.description?.message}
                </small>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px]">
                  Property Type <span className="text-red-700">*</span>
                </label>
                <select
                  {...register("type")}
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                >
                  <option value="">Select property type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Office Space">Office Space</option>
                </select>
                <small className="text-red-700">{errors.type?.message}</small>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px]">
                  Status <span className="text-red-700">*</span>
                </label>
                <select
                  {...register("status")}
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                >
                  <option value="">Select status</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
                <small className="text-red-700">{errors.status?.message}</small>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px]">
                  Price <span className="text-red-700">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter Amount"
                  {...register("price")}
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                />
                <small className="text-red-700">{errors.price?.message}</small>
              </div>
            </div>
          </div>

          <div className="w-full rounded-lg bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <h1 className="font-semibold text-[20px] text-gray-800">Location</h1>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-[16px]">Location</label>
              <input
                type="text"
                placeholder="e.g. Lekki, Lagos, Nigeria"
                {...register("location")}
                className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 transition-all focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
              />
              <small className="text-red-700">{errors.location?.message}</small>
            </div>
          </div>

          <div className="w-full rounded-lg bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <h1 className="font-semibold text-[20px] text-gray-800">Amenities</h1>
            <div className="flex gap-6 flex-wrap sm:flex-nowrap">
              <div className="flex flex-col gap-2 w-full sm:w-1/4">
                <label className="font-medium text-sm text-gray-700">Bedroom</label>
                <input
                  type="text"
                  placeholder="e.g. 3 Bedrooms"
                  {...register("rooms")}
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 transition-all focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                <small className="text-red-700">{errors.rooms?.message}</small>
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/4">
                <label className="font-medium text-sm text-gray-700">Bathroom</label>
                <input
                  type="text"
                  placeholder="e.g. 2 Bathrooms"
                  {...register("bath")}
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 transition-all focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                <small className="text-red-700">{errors.bath?.message}</small>
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/4">
                <label className="font-medium text-sm text-gray-700">Square Area</label>
                <input
                  type="text"
                  placeholder="e.g. 850 sq ft"
                  {...register("squareArea")}
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 transition-all focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                <small className="text-red-700">
                  {errors.squareArea?.message}
                </small>
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/4">
                <label className="font-medium text-sm text-gray-700">Parking</label>
                <input
                  type="text"
                  placeholder="e.g. 2 Car Garage"
                  {...register("parking")}
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 transition-all focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                <small className="text-red-700">
                  {errors.parking?.message}
                </small>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-wrap mt-2">
              <label className="flex gap-3 items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="wifi"
                  {...register("wifi")}
                  className="w-5 h-5 accent-[#7065F0] rounded cursor-pointer"
                />
                <span className="text-gray-700 font-medium">Free Wifi</span>
              </label>
              <label className="flex gap-3 items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="parkingSpace"
                  {...register("parkingSpace")}
                  className="w-5 h-5 accent-[#7065F0] rounded cursor-pointer"
                />
                <span className="text-gray-700 font-medium">Parking Space</span>
              </label>
              <label className="flex gap-3 items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="powerSupply"
                  {...register("powerSupply")}
                  className="w-5 h-5 accent-[#7065F0] rounded cursor-pointer"
                />
                <span className="text-gray-700 font-medium">24/7 Power Supply</span>
              </label>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">
                {error}
              </p>
            )}

            <div className="flex justify-end items-center gap-4 mt-6">
              <button
                type="button"
                onClick={handleDraft}
                disabled={loading}
                className="cursor-pointer text-base rounded-lg border border-[#7065F0] text-[#7065F0] bg-white font-medium px-5 py-2.5 hover:bg-[#7065F0] hover:text-white transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save as Draft"}
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={loading}
                className="cursor-pointer text-base rounded-lg bg-[#7065F0] text-white font-medium px-5 py-2.5 hover:bg-[#5b52c7] transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Property"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddNewProperty;
