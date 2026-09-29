import React, { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { Eye, EyeOff } from "lucide-react";

import image from "../assets/images/newpass.jpg";
import { IoCameraOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const passwordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const AccountSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordSchema) });

  const handleUpdatePassword = async (data) => {
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);
    try {
      await api.post("/auth/update-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      setPasswordSuccess("Password updated successfully!");
      reset();
    } catch (error) {
      setPasswordError(
        error.response?.data?.message || "Failed to update password",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    setDeleteLoading(true);
    try {
      await api.delete("/auth/delete-account");
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Delete account error:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <main className="bg-[#f6feff] min-h-screen pb-16">
      <div className="layout py-8">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900">My Account</h1>
          <p className="text-base text-gray-500 mb-10">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="w-full lg:w-[804px] mx-auto">
          <section className="flex flex-col gap-[32px]">
            {/* Profile Info */}
            <div className="shadow-sm hover:shadow-md transition-shadow rounded-2xl p-6 flex flex-col gap-6 bg-white border border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
                <button
                  type="button"
                  className="bg-red-50 hover:bg-red-100 cursor-pointer flex gap-2 items-center rounded-xl py-2 px-5 text-red-500 font-medium text-sm transition-colors"
                >
                  <RiEdit2Fill /> Edit
                </button>
              </div>

              <div className="w-[130px] h-[130px] relative rounded-full">
                <img
                  src={image}
                  alt="Profile"
                  className="rounded-full w-full object-cover h-full ring-4 ring-purple-100"
                />
                <div className="h-10 w-10 bg-[#7065F0] hover:bg-[#5a51d4] absolute bottom-0 right-0 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors">
                  <IoCameraOutline className="text-white text-xl" />
                </div>
              </div>

              <form className="text-sm">
                <label htmlFor="fullname" className="flex flex-col gap-2 font-medium text-gray-700">
                  Full Name
                  <input
                    type="text"
                    id="fullname"
                    className="w-full outline-none text-sm px-4 py-3.5 bg-[#FBFBFB] border border-gray-200 rounded-xl focus:border-[#7065F0] focus:bg-white transition-all"
                    placeholder="Ibrahim Moshood"
                  />
                </label>
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-[28px] mt-4">
                  <label
                    className="w-full md:w-1/2 flex flex-col gap-2 font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Email Address
                    <input
                      type="text"
                      id="email"
                      className="w-full outline-none text-sm px-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                      defaultValue={user?.email || ""}
                      readOnly
                    />
                  </label>
                  <label
                    className="w-full md:w-1/2 flex flex-col gap-2 font-medium text-gray-700"
                    htmlFor="phone"
                  >
                    Phone Number
                    <input
                      type="text"
                      id="phone"
                      className="w-full outline-none text-sm px-4 py-3.5 bg-[#FBFBFB] border border-gray-200 rounded-xl focus:border-[#7065F0] focus:bg-white transition-all"
                      placeholder="+234 810 887 9508"
                    />
                  </label>
                </div>
              </form>
            </div>

            {/* Security Settings */}
            <div className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl p-6 flex flex-col gap-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                Security Settings
              </h2>
              <form onSubmit={handleSubmit(handleUpdatePassword)}>
                <h3 className="text-base font-semibold text-gray-800 mb-3">Change Password</h3>
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-[28px]">
                  <div className="w-full md:w-1/3 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("currentPassword")}
                        className="w-full outline-none text-sm px-4 pr-10 py-3.5 bg-[#FBFBFB] border border-gray-200 rounded-xl focus:border-[#7065F0] focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-red-500 text-xs">{errors.currentPassword?.message}</p>
                    )}
                  </div>

                  <div className="w-full md:w-1/3 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("newPassword")}
                        className="w-full outline-none text-sm px-4 pr-10 py-3.5 bg-[#FBFBFB] border border-gray-200 rounded-xl focus:border-[#7065F0] focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-red-500 text-xs">{errors.newPassword?.message}</p>
                    )}
                  </div>

                  <div className="w-full md:w-1/3 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                        className="w-full outline-none text-sm px-4 pr-10 py-3.5 bg-[#FBFBFB] border border-gray-200 rounded-xl focus:border-[#7065F0] focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs">{errors.confirmPassword?.message}</p>
                    )}
                  </div>
                </div>

                {passwordError && (
                  <p className="text-red-500 text-sm mt-3 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    {passwordError}
                  </p>
                )}
                {passwordSuccess && (
                  <p className="text-green-600 text-sm mt-3 bg-green-50 p-2.5 rounded-lg border border-green-200">
                    {passwordSuccess}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="bg-[#7065F0] hover:bg-[#5a51d4] cursor-pointer mt-5 w-full md:w-auto text-white font-medium px-6 py-3 rounded-xl disabled:opacity-50 shadow-md transition-colors"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </form>

              <div className="flex items-center justify-between border border-gray-200 rounded-2xl px-5 py-4 bg-gray-50/60">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button
                  type="button"
                  className="relative w-12 h-6 rounded-full bg-[#7065F0] cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-white absolute right-0.5 top-0.5 shadow-sm" />
                </button>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl p-6 flex flex-col gap-4 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                Notification Preferences
              </h2>
              <div className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  id="email-notification"
                  name="notification"
                  defaultChecked
                  className="text-[#7065F0] focus:ring-[#7065F0]"
                />
                <label
                  className="text-sm text-gray-700 cursor-pointer"
                  htmlFor="email-notification"
                >
                  Receive Email Notifications
                </label>
              </div>
              <div className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  id="sms-notification"
                  name="notification"
                  className="text-[#7065F0] focus:ring-[#7065F0]"
                />
                <label
                  className="text-sm text-gray-700 cursor-pointer"
                  htmlFor="sms-notification"
                >
                  Receive SMS Alerts
                </label>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white shadow-sm rounded-2xl p-6 flex flex-col gap-4 border border-red-100">
              <h2 className="text-red-600 text-lg font-bold">
                Danger Zone
              </h2>
              <div className="bg-red-50 p-5 rounded-2xl border border-red-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-red-900">
                    Delete this account
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  className="bg-red-600 hover:bg-red-700 cursor-pointer rounded-xl py-2.5 px-5 text-white text-sm font-semibold disabled:opacity-50 shrink-0 shadow-sm transition-colors"
                >
                  {deleteLoading ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AccountSettings;
