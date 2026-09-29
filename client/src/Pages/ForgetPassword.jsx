import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assets/images/log1.png";
import api from "../api/axiosConfig";
import handleAuthError from "../utils/handleError";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/forgot-password", { email });
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5e8] flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="layout w-full flex justify-center lg:flex-row lg:justify-between items-center gap-12"
      >
        <div className="w-full md:max-w-[453px]">
          <h1 className="text-2xl sm:text-[32px] font-bold text-gray-900">
            Forgot Your Password
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mb-6">
            We'll send a 6-digit verification code to your email to reset your
            password.
          </p>

          <div className="flex flex-col gap-3">
            <label className="text-base font-medium text-gray-800" htmlFor="email">
              Email <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full h-12 px-4 pr-11 border border-gray-300 bg-white rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-3 bg-red-50 p-2.5 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 cursor-pointer w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-[15px] font-semibold rounded-xl shadow-md transition-colors"
          >
            {loading ? "Sending..." : "Send Code"}
          </button>

          <Link to="/login">
            <p className="text-gray-600 hover:text-gray-800 cursor-pointer text-center mt-6 text-sm">
              Remember your password?{" "}
              <span className="text-[#7065F0] font-semibold">Sign In</span>
            </p>
          </Link>
        </div>

        <div className="hidden lg:flex shadow-2xl rounded-3xl overflow-hidden">
          <img src={image1} alt="Interior" className="max-w-[480px] object-cover" />
        </div>
      </form>
    </main>
  );
};

export default ForgetPassword;
