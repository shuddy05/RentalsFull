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

  const savedProperty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      if (saved) {
        await api.delete(`/auth/saved-properties/${propertyId}`);
        setSaved(false);
      } else {
        await api.post(`/auth/saved-properties/${propertyId}`);
        setSaved(true);
      }
    } catch (error) {
      console.error("Bookmark error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={savedProperty}
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
