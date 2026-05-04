import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assets/images/log1.png";
import { useAuth } from "../context/AuthContext";

const ForgetPassword = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await forgotPassword(email);
    setLoading(false);

    if (result.success) {
      navigate("/verify-otp", { state: { email } });
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="bg-[#f5f5e8] h-screen">
      <form
        onSubmit={handleSubmit}
        className="layout flex flex-col gap-5 md:flex-row justify-between items-center"
      >
        <div className="w-full md:max-w-113.25 md:max-h-149.5">
          <h1 className="text-[32px] font-bold">Forget Your Password</h1>
          <p className="text-[16px] text-[#666666] mb-6">
            We'll send a 6-digit verification code to your email to reset your
            password.
          </p>

          <div className="flex flex-col gap-3">
            <label className="text-[16px]" htmlFor="email">
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
            className="mt-[48px] cursor-pointer w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[15px] font-medium rounded-xl"
          >
            {loading ? "Sending..." : "Send Code"}
          </button>

          <Link to="/">
            <p className="text-gray-600 cursor-pointer text-center mt-[24px]">
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
