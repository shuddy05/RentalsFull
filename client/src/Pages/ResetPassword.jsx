import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import image1 from "../assets/images/log1.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/axiosConfig";
import handleAuthError from "../utils/handleError";
import { resetPasswordSchema } from "../utils/formvalidation";

const ResetPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  const handleReset = async (data) => {
    setLoading(true);
    setError(null);
    const { password, confirmPassword } = data;
    try {
      await api.post("/auth/reset-password", {
        email,
        otp,
        password,
        confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5e8] flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit(handleReset)}
        className="layout w-full flex justify-center lg:flex-row lg:justify-between items-center gap-12"
      >
        <div className="w-full md:max-w-[453px]">
          <h1 className="text-2xl sm:text-[32px] font-bold text-gray-900">
            Reset Your Password
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mb-6">
            You're just one step away from accessing your account.
          </p>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-base font-medium text-gray-800" htmlFor="password">
              New Password <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
                className={`w-full h-12 px-4 pr-11 border bg-white rounded-xl text-sm outline-none transition-all ${
                  errors.password ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <small className="text-red-500 text-xs mt-1 block">
                {errors.password?.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="text-base font-medium text-gray-800" htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                {...register("confirmPassword")}
                className={`w-full h-12 px-4 pr-11 border bg-white rounded-xl text-sm outline-none transition-all ${
                  errors.confirmPassword ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <small className="text-red-500 text-xs mt-1 block">
                {errors.confirmPassword?.message}
              </small>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 p-2.5 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-[15px] font-semibold rounded-xl shadow-md transition-colors"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <Link to="/login">
            <p className="text-gray-600 hover:text-gray-800 cursor-pointer text-center mt-6 text-sm">
              Remember your password?{" "}
              <span className="text-[#7065F0] font-semibold">Login</span>
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

export default ResetPassword;
