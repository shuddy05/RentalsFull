import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assets/images/log1.png";
import logo from "../assets/images/logo.png";
import { registerSchema } from "../utils/formvalidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import handleAuthError from "../utils/handleError";

const Register = () => {
  const { fetchUser } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const handleSignup = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const { email, password, confirmPassword } = data;
      const res = await api.post("/auth/register", {
        email,
        password,
        confirmPassword,
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className=" bg-[#f5f5e8] h-screen  ">
      <form
        onSubmit={handleSubmit(handleSignup)}
        className=" layout  flex flex-col gap-5 md:flex-row justify-between items-center "
      >
        <div className=" w-full md:max-w-113.25 md:max-h-149.5 ">
          <h1 className="text-[32px] font-bold">Sign Up</h1>
          <p className="text-[16px] text-gray-500 mb-6">
            Enter your details to sign up
          </p>

          <div className="flex flex-col gap-3">
            <label className="text-[16px]" htmlFor="email">
              {" "}
              Email <span className="text-red-500 font-bold text-xl ">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter email"
              className={`w-full h-12 px-4 pr-11 border  bg-white rounded-xl text-sm outline-none  ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"} `}
            />
          </div>
          <small className="text-red-500">{errors.email?.message}</small>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-[16px]" htmlFor="password">
              Password <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
                className={`w-full h-12 px-4 pr-11 border  bg-white rounded-xl text-sm outline-none  ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
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

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-[16px]" htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                {...register("confirmPassword")}
                className={`w-full h-12 px-4 pr-11 border bg-white rounded-xl text-sm outline-none  ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
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
            className="w-full h-12 cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[15px] font-medium rounded-xl"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          <Link to="/">
            <p className="text-gray-600  cursor-pointer text-center mt-[24px]">
              Already have account?{" "}
              <span className="text-[#7065F0]">Login</span>
            </p>
          </Link>
        </div>

        <div className=" mt-5  shadow-md">
          <img src={image1} alt="Interior" className="" />
        </div>
      </form>
    </main>
  );
};

export default Register;
