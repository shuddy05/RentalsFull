import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

const BookmarkButton = ({ propertyId, savedProperties = [] }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isBookmarked = user
    ? savedProperties.some(
        (id) => id === user._id || id.toString() === user._id?.toString(),
      )
    : false;

  const [saved, setSaved] = useState(isBookmarked);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      if (saved) {
        await api.delete(`/api/saved-properties/${propertyId}`);
        setSaved(false);
      } else {
        const res = await api.post(`/api/saved-properties/${propertyId}`);
        console.log("save response:", res.data);
        setSaved(true);
      }
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      disabled={loading}
      className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-gray-400 bg-white disabled:opacity-50 cursor-pointer"
    >
      {saved ? (
        <FaHeart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
      ) : (
        <FaRegHeart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
      )}
    </button>
  );
};

export default BookmarkButton;
