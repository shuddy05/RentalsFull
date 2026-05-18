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
    <main className="bg-[#f6feff]">
      <div className="layout py-8">
        <h1 className="text-[28px] font-semibold">My Account</h1>
        <p className="text-[18px] text-black/50 mb-20">
          Manage your account settings and preferences
        </p>
        <div className="w-full lg:w-[804px] mx-auto">
          <section className="flex flex-col gap-[32px]">
            <div className="shadow-sm rounded-lg px-5 py-5 flex flex-col gap-6 bg-white">
              <div className="flex justify-between items-center">
                <h1 className="text-4.5">Profile Information</h1>
                <button className="bg-red-100 cursor-pointer flex gap-2 items-center rounded-lg py-1 px-6 text-red-500">
                  <RiEdit2Fill /> Edit
                </button>
              </div>
              <div className="w-[130px] h-[130px] relative rounded-full">
                <img
                  src={image}
                  alt="Profile"
                  className="rounded-full w-full object-cover h-full"
                />
                <div className="h-10 w-10 bg-[#7065F0] absolute bottom-0 right-0 rounded-full flex items-center justify-center">
                  <IoCameraOutline className="text-white text-2xl" />
                </div>
              </div>
              <form className="text-4">
                <label htmlFor="fullname" className="flex flex-col gap-2">
                  Full Name
                  <input
                    type="text"
                    id="fullname"
                    className="w-full outline-none text-3 px-3 mb-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9] rounded-lg"
                    placeholder="Ibrahim Moshood"
                  />
                </label>
                <div className="flex flex-col md:flex-row justify-between md:gap-[28px]">
                  <label
                    className="w-full md:w-1/2 mb-3 flex flex-col gap-2"
                    htmlFor="email"
                  >
                    Email Address
                    <input
                      type="text"
                      id="email"
                      className="w-full outline-none text-3 px-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9] rounded-lg"
                      defaultValue={user?.email || ""}
                      readOnly
                    />
                  </label>
                  <label
                    className="w-full md:w-1/2 flex flex-col gap-2"
                    htmlFor="phone"
                  >
                    Phone Number
                    <input
                      type="text"
                      id="phone"
                      className="w-full outline-none text-3 px-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9] rounded-lg"
                      placeholder="+234 810 887 9508"
                    />
                  </label>
                </div>
              </form>
            </div>

            <div className="bg-white shadow-sm rounded-lg px-5 py-5 flex flex-col gap-6">
              <h1 className="text-[20px] text-center md:text-start">
                Security Settings
              </h1>
              <form onSubmit={handleSubmit(handleUpdatePassword)}>
                <h1 className="text-[18px] mb-3">Change Password</h1>
                <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-[28px]">
                  <div className="w-full md:w-[236px] flex flex-col gap-2">
                    <label className="text-[16px]">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="P@^%%4!"
                        {...register("currentPassword")}
                        className="w-full outline-none text-3 px-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9] rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className=" absolute right-3 top-[40%] text-gray-400 cursor-pointer"
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>

                    <small className="text-red-500">
                      {errors.currentPassword?.message}
                    </small>
                  </div>
                  <div className="w-full md:w-[236px] flex flex-col gap-2  ">
                    <label className="text-[16px]">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="P@^%%4!"
                        {...register("newPassword")}
                        className="w-full outline-none text-3 px-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9] rounded-lg  "
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className=" absolute right-3 top-[40%] text-gray-400 cursor-pointer"
                      >
                        {showNewPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>

                    <small className="text-red-500">
                      {errors.newPassword?.message}
                    </small>
                  </div>
                  <div className="w-full md:w-[236px] flex flex-col gap-2">
                    <label className="text-[16px]">Confirm Password</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className=" absolute right-3 top-[40%] text-gray-400 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="P@^%%4!"
                        {...register("confirmPassword")}
                        className="w-full outline-none text-3 px-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9] rounded-lg"
                      />
                    </div>

                    <small className="text-red-500">
                      {errors.confirmPassword?.message}
                    </small>
                  </div>
                </div>

                {passwordError && (
                  <p className="text-red-500 text-sm mt-3">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-green-500 text-sm mt-3">
                    {passwordSuccess}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="bg-[#7065F0] cursor-pointer mt-4 w-full md:w-[196px] text-white px-[24px] py-[14px] rounded-[8px] disabled:opacity-50"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </form>

              <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
                <div>
                  <h1 className="text-[16px] text-gray-700">
                    Two-Factor Authentication
                  </h1>
                  <p className="text-[14px] text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="relative w-12 h-6 rounded-full bg-[#7065F0]">
                  <span className="w-1/2 h-full rounded-full bg-white absolute right-0 top-0" />
                </button>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg px-5 py-5 flex flex-col gap-6">
              <h1 className="text-[20px] text-center md:text-start">
                Notification Preferences
              </h1>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="email-notification"
                  name="notification"
                />
                <label
                  className="text-[14px] text-gray-700"
                  htmlFor="email-notification"
                >
                  Receive Email Notifications
                </label>
              </div>
              <div className="flex gap-2">
                <input type="radio" id="sms-notification" name="notification" />
                <label
                  className="text-[14px] text-gray-700"
                  htmlFor="sms-notification"
                >
                  Receive SMS Alerts
                </label>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg px-5 py-5 flex flex-col gap-6">
              <h1 className="text-red-600 text-[20px] text-center md:text-start">
                Danger Zone
              </h1>
              <div className="bg-red-100 p-4 rounded-lg flex flex-col justify-center items-center md:items-start text-center md:text-start">
                <p>
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  className="bg-red-600 cursor-pointer mt-[18px] rounded-[8px] w-[180px] py-[14px] px-[24px] text-white disabled:opacity-50"
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
