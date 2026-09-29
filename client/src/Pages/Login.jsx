import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assets/images/log1.png";
import { loginSchema } from "../utils/formvalidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import handleAuthError from "../utils/handleError";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const handleLogin = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", res.data.token);
      await fetchUser();
      navigate("/");
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f5f5e8] min-h-screen flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="layout w-full flex justify-center lg:flex-row lg:justify-between items-center gap-12"
      >
        <div className="w-full md:max-w-113.25">
          <h1 className="text-3xl sm:text-[34px] font-bold text-gray-900">Login</h1>
          <p className="text-base text-gray-500 mb-6">
            Enter your details to sign in to your account
          </p>

          <div className="flex flex-col gap-3">
            <label className="text-base font-medium text-gray-800" htmlFor="email">
              Email <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className={`w-full h-12 px-4 pr-11 border rounded-xl text-sm outline-none bg-white transition-all
                ${errors.email ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`}
            />
          </div>
          {errors.email && (
            <small className="text-red-500 text-xs mt-1 block">
              {errors.email?.message}
            </small>
          )}

          <div className="flex flex-col gap-3 mt-4">
            <label className="text-base font-medium text-gray-800" htmlFor="password">
              Password <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
                className={`w-full h-12 px-4 pr-11 border rounded-xl text-sm outline-none bg-white transition-all
                  ${errors.password ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {errors.password && (
            <small className="text-red-500 text-xs mt-1 block">
              {errors.password?.message}
            </small>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-3 bg-red-50 p-2.5 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          <div className="mt-4">
            <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm font-medium">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-12 cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-[15px] font-semibold rounded-xl shadow-md transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link to="/register">
            <p className="text-gray-600 hover:text-gray-800 cursor-pointer text-center mt-6 text-sm">
              Don't have an account?{" "}
              <span className="text-[#7065F0] font-semibold">Sign Up</span>
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

export default Login;
