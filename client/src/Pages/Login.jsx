import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assets/images/log1.png";
import logo from "../assets/images/logo.png";
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
      navigate("/home");
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f5f5e8] h-screen">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="layout flex justify-center lg:flex-row lg:justify-between items-center"
      >
        <div className="w-full md:max-w-113.25 md:max-h-149.5">
          <h1 className="text-[32px] font-bold">Login</h1>
          <p className="text-[16px] text-gray-500 mb-6">
            Enter your details to signin your account
          </p>

          <div className="flex flex-col gap-3">
            <label className="text-[16px]" htmlFor="email">
              Email <span className="text-red-500 font-bold text-xl">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className={`w-full h-12 px-4 pr-11 border rounded-xl text-sm outline-none bg-white
                ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
            />
          </div>
          <small className="text-red-500">{errors.email?.message}</small>

          <div className="flex flex-col gap-3">
            <label className="text-[16px]" htmlFor="password">
              Password <span className="text-red-500 font-bold text-xl">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
                className={`w-full h-12 px-4 pr-11 border rounded-xl text-sm outline-none bg-white
                  ${errors.password ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          <small className="text-red-500">{errors.password?.message}</small>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-4">
            <Link to="/forgot-password" className="text-blue-600 text-[14px]">
              Forget password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-[48px] w-full h-12 cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-[15px] font-medium rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link to="/register">
            <p className="text-gray-600 cursor-pointer text-center mt-[24px]">
              Don't have account?{" "}
              <span className="text-[#7065F0]">Sign Up</span>
            </p>
          </Link>
        </div>

        <div className=" hidden lg:flex mt-5 shadow-md">
          <img src={image1} alt="Interior" className="" />
        </div>
      </form>
    </main>
  );
};

export default Login;
