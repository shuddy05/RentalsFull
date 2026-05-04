import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import image1 from "../assets/images/log1.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";

const schema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const ResetPassword = () => {
  const { resetPassword } = useAuth();
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
  } = useForm({ resolver: yupResolver(schema) });

  const handleReset = async (data) => {
    setLoading(true);
    setError(null);
    const result = await resetPassword(
      email,
      otp,
      data.password,
      data.confirmPassword,
    );
    setLoading(false);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5e8]">
      <form
        onSubmit={handleSubmit(handleReset)}
        className="layout flex flex-col md:flex-row justify-between items-center gap-8 min-h-screen py-10"
      >
        <div className="w-full md:max-w-[453px]">
          <h1 className="text-2xl sm:text-[32px] font-bold">
            Reset Your Password
          </h1>
          <p className="text-sm sm:text-[16px] text-gray-500 mb-6">
            You're just one step away from accessing your account.
          </p>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm sm:text-[16px]" htmlFor="password">
              Password <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
                className={`w-full h-12 px-4 pr-11 border bg-white rounded-xl text-sm outline-none ${errors.password ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <small className="text-red-500">{errors.password?.message}</small>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-sm sm:text-[16px]" htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                {...register("confirmPassword")}
                className={`w-full h-12 px-4 pr-11 border bg-white rounded-xl text-sm outline-none ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <small className="text-red-500">
              {errors.confirmPassword?.message}
            </small>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-[15px] font-medium rounded-xl"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <Link to="/">
            <p className="text-gray-600 cursor-pointer text-center mt-6">
              Remember your password?{" "}
              <span className="text-[#7065F0]">Login</span>
            </p>
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
          <img
            src={image1}
            alt="Interior"
            className="w-full max-w-sm md:max-w-full rounded-xl object-cover shadow-md"
          />
        </div>
      </form>
    </main>
  );
};

export default ResetPassword;
