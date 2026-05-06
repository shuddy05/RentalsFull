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
      const res = await api.post("/auth/forgot-password", { email });
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5e8]">
      <form
        onSubmit={handleSubmit}
        className="layout flex flex-col gap-5 md:flex-row justify-between items-center"
      >
        <div className="w-full md:max-w-[453px]">
          <h1 className="text-2xl sm:text-[32px] font-bold">
            Forget Your Password
          </h1>
          <p className="text-sm sm:text-[16px] text-[#666666] mb-6">
            We'll send a 6-digit verification code to your email to reset your
            password.
          </p>

          <div className="flex flex-col gap-3">
            <label className="text-sm sm:text-[16px]" htmlFor="email">
              Email <span className="text-red-500 font-bold text-xl">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full h-12 px-4 pr-11 border border-gray-300 bg-white rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-12 cursor-pointer w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-[15px] font-medium rounded-xl"
          >
            {loading ? "Sending..." : "Send Code"}
          </button>

          <Link to="/">
            <p className="text-gray-600 cursor-pointer text-center mt-6">
              Remember your password{" "}
              <span className="text-[#7065F0]">Sign In</span>
            </p>
          </Link>
        </div>

        <div className="mt-5 shadow-md">
          <img src={image1} alt="Interior" className="" />
        </div>
      </form>
    </main>
  );
};

export default ForgetPassword;
