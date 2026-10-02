import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/axiosConfig";
import { FiShield, FiLock, FiCheckCircle, FiBell, FiEye, FiEyeOff } from "react-icons/fi";
import avatarImg from "../../assets/images/newpass.jpg";

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

const AdminAcountSettings = () => {
  const { user } = useAuth();
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [notifications, setNotifications] = useState({
    listingInquiries: true,
    userRegistrations: true,
    securityAlerts: true,
  });

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
      setPasswordSuccess("Admin password updated successfully!");
      reset();
    } catch (err) {
      setPasswordError(
        err.response?.data?.message || "Failed to update password",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your administrator profile, security, and system preferences
        </p>
      </div>

      {/* Admin Profile Overview */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <img
            src={avatarImg}
            alt="Admin"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-purple-100"
          />
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">{user?.email || "Admin"}</h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-[#7065F0] w-max mx-auto sm:mx-0">
              <FiShield size={12} /> Administrator
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Role: <span className="font-medium text-gray-700 capitalize">{user?.role || "admin"}</span>
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Admin User ID: <span className="font-mono">{user?._id || user?.userId || "N/A"}</span>
          </p>
        </div>
      </div>

      {/* Security & Password Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7065F0] flex items-center justify-center shrink-0">
            <FiLock size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Security & Credentials</h2>
            <p className="text-xs text-gray-500">Update your administrator account password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleUpdatePassword)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("currentPassword")}
                  className="w-full outline-none text-sm px-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#7065F0] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showCurrent ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.currentPassword && (
                <small className="text-red-500 text-xs font-medium">
                  {errors.currentPassword.message}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("newPassword")}
                  className="w-full outline-none text-sm px-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#7065F0] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showNew ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.newPassword && (
                <small className="text-red-500 text-xs font-medium">
                  {errors.newPassword.message}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="w-full outline-none text-sm px-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#7065F0] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <small className="text-red-500 text-xs font-medium">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>
          </div>

          {passwordError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {passwordError}
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-medium flex items-center gap-2">
              <FiCheckCircle size={16} /> {passwordSuccess}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={passwordLoading}
              className="bg-[#7065F0] hover:bg-[#5b52c7] text-white px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer shadow-sm transition-colors disabled:opacity-50"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Admin Notification Preferences */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col gap-5">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7065F0] flex items-center justify-center shrink-0">
            <FiBell size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Admin Notification Preferences</h2>
            <p className="text-xs text-gray-500">Configure which system alerts you wish to receive</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-semibold text-gray-800">New Listing Inquiries</p>
              <p className="text-xs text-gray-500">Receive an email when prospective buyers inquire about properties</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.listingInquiries}
              onChange={(e) =>
                setNotifications((prev) => ({ ...prev, listingInquiries: e.target.checked }))
              }
              className="w-5 h-5 accent-[#7065F0] rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-semibold text-gray-800">New User Registrations</p>
              <p className="text-xs text-gray-500">Get notified when new buyers or renters register accounts</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.userRegistrations}
              onChange={(e) =>
                setNotifications((prev) => ({ ...prev, userRegistrations: e.target.checked }))
              }
              className="w-5 h-5 accent-[#7065F0] rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-semibold text-gray-800">Security & System Alerts</p>
              <p className="text-xs text-gray-500">Critical notifications regarding server status, OTPs, and access</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.securityAlerts}
              onChange={(e) =>
                setNotifications((prev) => ({ ...prev, securityAlerts: e.target.checked }))
              }
              className="w-5 h-5 accent-[#7065F0] rounded cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdminAcountSettings;