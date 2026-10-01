import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoCloudDownloadOutline, IoCloseCircle } from "react-icons/io5";
import api from "../../api/axiosConfig";

const AMENITY_OPTIONS = [
  { id: "edit-wifi", label: "Free Wifi" },
  { id: "edit-parkingSpace", label: "Parking Space" },
  { id: "edit-power", label: "24/7 Power Supply" },
  { id: "edit-other", label: "Swimming Pool" },
];

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    status: "",
    price: "",
    location: "",
    rooms: "",
    bath: "",
    squareArea: "",
    parking: "",
    features: [],
    images: [],
    availability: "Available",
  });

  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/api/admin/properties/${id}`);
        const property = res.data?.property || res.data;
        if (property) {
          setFormData({
            title: property.title || "",
            description: property.description || "",
            type: property.type || "",
            status: property.status || "",
            price: property.price ?? "",
            location: property.location || "",
            rooms: property.rooms ?? "",
            bath: property.bath ?? "",
            squareArea: property.squareArea ?? "",
            parking: property.parking ?? "",
            features: Array.isArray(property.features) ? property.features : [],
            images: Array.isArray(property.images) ? property.images : [],
            availability: property.availability || "Available",
          });
        }
      } catch (err) {
        setApiError(
          err.response?.data?.message || "Failed to load property details",
        );
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFeatureToggle = (label) => {
    setFormData((prev) => {
      const exists = prev.features.includes(label);
      const updated = exists
        ? prev.features.filter((f) => f !== label)
        : [...prev.features, label];
      return { ...prev, features: updated };
    });
    if (errors.features) {
      setErrors((prev) => ({ ...prev, features: null }));
    }
  };

  const processFiles = (files) => {
    const validFiles = [];
    let fileError = null;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        fileError = "Only JPG and PNG images are allowed";
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        fileError = "Each image must be 5MB or less";
        continue;
      }
      validFiles.push(file);
    }

    if (fileError) {
      setErrors((prev) => ({ ...prev, images: fileError }));
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, e.target.result],
        }));
        setErrors((prev) => ({ ...prev, images: null }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (e) => {
    if (e.target.files?.length) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleAddImageUrl = (e) => {
    e.preventDefault();
    const trimmed = imageUrlInput.trim();
    if (!trimmed) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, trimmed],
    }));
    setImageUrlInput("");
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: null }));
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Property title is required";
    if (!formData.description.trim())
      errs.description = "About the property description is required";
    if (!formData.type) errs.type = "Please select a property type";
    if (!formData.status) errs.status = "Please select status";
    if (!formData.price || Number(formData.price) <= 0)
      errs.price = "Enter a valid positive price";
    if (!formData.location.trim()) errs.location = "Location is required";
    if (formData.rooms === "" || Number(formData.rooms) < 0)
      errs.rooms = "Enter number of bedrooms";
    if (formData.bath === "" || Number(formData.bath) < 0)
      errs.bath = "Enter number of bathrooms";
    if (formData.squareArea === "" || Number(formData.squareArea) <= 0)
      errs.squareArea = "Enter square area in sq ft";
    if (formData.parking === "" || Number(formData.parking) < 0)
      errs.parking = "Enter parking capacity";
    if (!formData.features || formData.features.length === 0)
      errs.features = "Select at least one feature / amenity";
    if (!formData.images || formData.images.length === 0)
      errs.images = "At least one property image is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) {
      return;
    }

    setLoading(true);

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type,
      status: formData.status,
      price: Number(formData.price),
      location: formData.location.trim(),
      rooms: Number(formData.rooms),
      bath: Number(formData.bath),
      squareArea: Number(formData.squareArea),
      parking: Number(formData.parking),
      features: formData.features,
      images: formData.images,
      availability: formData.availability,
    };

    try {
      await api.patch(`/api/admin/properties/${id}`, payload);
      navigate("/admin/properties");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Failed to update property listing",
      );
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-8 h-8 border-3 border-[#7065F0] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#7065F0] text-sm font-medium">
          Loading property details...
        </p>
      </div>
    );
  }

  return (
    <main className="pb-16">
      <div className="flex gap-2 text-sm items-center mb-6">
        <Link
          className="text-gray-500 hover:text-gray-700 transition-colors"
          to="/admin/properties"
        >
          My Property
        </Link>
        <p className="text-gray-400">›</p>
        <span className="text-gray-800 font-medium">Edit Property</span>
      </div>

      <div className="flex flex-col gap-2 mb-10">
        <h1 className="font-bold text-[22px] text-gray-900">Edit Property</h1>
        <p className="text-gray-600 text-[15px]">
          Update details, images, and availability for this listing
        </p>
      </div>

      {apiError && (
        <div className="max-w-[804px] mx-auto mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {apiError}
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div className="max-w-[804px] mx-auto mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          Please review the highlighted fields below before submitting.
        </div>
      )}

      <div className="flex justify-center items-center">
        <form className="w-[804px] flex flex-col gap-7" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="w-full rounded-lg border bg-white border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-semibold text-[20px] text-gray-800">
              Basic Information
            </h2>

            {/* Drag & drop upload area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-colors ${
                isDragging
                  ? "border-[#7065F0] bg-[#7065F0]/5"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <IoCloudDownloadOutline size={44} className="text-[#7065F0]" />
              <div className="text-center">
                <p className="text-gray-700 font-medium text-sm">
                  Drag and drop your images here (JPG/PNG, max 5MB)
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Upload high quality photos of the property
                </p>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept="image/jpeg,image/png"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-lg bg-[#7065F0] hover:bg-[#5b52c7] text-white font-medium px-4 py-2 text-sm transition-colors shadow-sm"
              >
                Choose File
              </button>
            </div>

            {/* Direct Image URL input */}
            <div className="flex flex-col gap-2 pt-2">
              <label className="text-xs font-semibold uppercase text-gray-500">
                Or paste image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="outline-none flex-1 border border-gray-200 shadow-sm rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 rounded-lg border border-[#7065F0] text-[#7065F0] hover:bg-[#7065F0] hover:text-white transition-colors text-sm font-medium cursor-pointer"
                >
                  Add URL
                </button>
              </div>
            </div>

            {/* Images Preview Grid */}
            {formData.images.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-xs font-semibold text-gray-600">
                  Property Images ({formData.images.length})
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-lg overflow-hidden h-24 border border-gray-200 bg-gray-50"
                    >
                      <img
                        src={img}
                        alt={`Property preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 text-red-600 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 bg-[#7065F0] text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {errors.images && (
              <small className="text-red-600 text-xs font-medium">
                {errors.images}
              </small>
            )}

            {/* Form Fields */}
            <div className="w-full flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px] text-gray-800">
                  Property Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter property title"
                  value={formData.title}
                  onChange={handleChange}
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                {errors.title && (
                  <small className="text-red-600 text-xs font-medium">
                    {errors.title}
                  </small>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px] text-gray-800">
                  About the Property <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter the description of the property"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                {errors.description && (
                  <small className="text-red-600 text-xs font-medium">
                    {errors.description}
                  </small>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[16px] text-gray-800">
                    Property Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm cursor-pointer focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                  >
                    <option value="">Select property type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Office Space">Office Space</option>
                  </select>
                  {errors.type && (
                    <small className="text-red-600 text-xs font-medium">
                      {errors.type}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[16px] text-gray-800">
                    Status <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm cursor-pointer focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                  >
                    <option value="">Select status</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                  {errors.status && (
                    <small className="text-red-600 text-xs font-medium">
                      {errors.status}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[16px] text-gray-800">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm cursor-pointer focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px] text-gray-800">
                  Price (₦) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter amount (e.g. 15000000)"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                {errors.price && (
                  <small className="text-red-600 text-xs font-medium">
                    {errors.price}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="w-full rounded-lg bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-semibold text-[20px] text-gray-800">Location</h2>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm text-gray-700">
                Location <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Lekki, Lagos, Nigeria"
                value={formData.location}
                onChange={handleChange}
                className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
              />
              {errors.location && (
                <small className="text-red-600 text-xs font-medium">
                  {errors.location}
                </small>
              )}
            </div>
          </div>

          {/* Amenities & Specs */}
          <div className="w-full rounded-lg bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-semibold text-[20px] text-gray-800">
              Amenities & Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm text-gray-700">
                  Bedrooms <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="rooms"
                  placeholder="e.g. 3"
                  value={formData.rooms}
                  onChange={handleChange}
                  min="0"
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                {errors.rooms && (
                  <small className="text-red-600 text-xs font-medium">
                    {errors.rooms}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm text-gray-700">
                  Bathrooms <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="bath"
                  placeholder="e.g. 2"
                  value={formData.bath}
                  onChange={handleChange}
                  min="0"
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                {errors.bath && (
                  <small className="text-red-600 text-xs font-medium">
                    {errors.bath}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm text-gray-700">
                  Square Area (sq ft) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="squareArea"
                  placeholder="e.g. 1500"
                  value={formData.squareArea}
                  onChange={handleChange}
                  min="1"
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                {errors.squareArea && (
                  <small className="text-red-600 text-xs font-medium">
                    {errors.squareArea}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm text-gray-700">
                  Parking Spaces <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="parking"
                  placeholder="e.g. 2"
                  value={formData.parking}
                  onChange={handleChange}
                  min="0"
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#7065F0]/20 focus:border-[#7065F0]"
                />
                {errors.parking && (
                  <small className="text-red-600 text-xs font-medium">
                    {errors.parking}
                  </small>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="font-medium text-sm text-gray-700">
                Features & Amenities <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center gap-6 flex-wrap">
                {AMENITY_OPTIONS.map((item) => (
                  <div key={item.id} className="flex gap-2.5 items-center">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={formData.features.includes(item.label)}
                      onChange={() => handleFeatureToggle(item.label)}
                      className="w-5 h-5 accent-[#7065F0] rounded cursor-pointer"
                    />
                    <label
                      htmlFor={item.id}
                      className="text-gray-700 font-medium text-sm cursor-pointer select-none"
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
              {errors.features && (
                <small className="text-red-600 text-xs font-medium">
                  {errors.features}
                </small>
              )}
            </div>

            <div className="flex justify-end items-center gap-4 mt-6 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/admin/properties")}
                disabled={loading}
                className="cursor-pointer text-base rounded-lg border border-gray-300 text-gray-700 bg-white font-medium px-5 py-2.5 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer text-base rounded-lg bg-[#7065F0] text-white font-medium px-6 py-2.5 hover:bg-[#5b52c7] transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProperty;