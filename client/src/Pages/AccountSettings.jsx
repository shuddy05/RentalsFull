import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import image from "../assets/images/newpass.jpg";
import { IoCameraOutline } from "react-icons/io5";
const AccountSettings = () => {
  return (
    <main className="bg-[#f6feff] ">
      <div className="layout">
        <h1 className="text-[28px] font-semibold ">My Account</h1>
        <p className="text-[18px] text-black/50 mb-20 ">
          Manage your account settings and preferences
        </p>
        <div className=" w-full lg:w-[804px]  mx-auto ">
          <section className="flex flex-col gap-[32px]">
            <div className="  shadow-sm rounded-lg px-5 py-5 flex flex-col gap-6 bg-white ">
              <div className="flex justify-between items-center  ">
                <h1 className="text-4.5">Profile Information</h1>
                <button className="bg-red-100 flex gap-2 items-center rounded-lg py-1 px-6 text-red-500">
                  {" "}
                  <span>
                    <RiEdit2Fill />
                  </span>{" "}
                  Edit
                </button>
              </div>
              <div className=" w-[130px] h-[130px] relative rounded-full ">
                <img
                  src={image}
                  alt="Profile"
                  className="rounded-full w-full object-cover h-full"
                />
                <div className="h-10 w-10 bg-[#7065F0] absolute bottom-0 right-0 rounded-full flex items-center justify-center">
                  <IoCameraOutline className="text-white text-2xl" />
                </div>
              </div>

              <form action="" className="text-4">
                <label htmlFor="full name" className="flex flex-col gap-2">
                  Full Name
                  <input
                    type="text"
                    id="full name"
                    className="w-full text-3 px-3 mb-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9]  rounded-lg "
                    placeholder="Ibrahim Moshood"
                  />
                </label>
                <div className="flex flex-col md:flex-row justify-between md:gap-[28px] ">
                  <label
                    className="w-full md:w-1/2 mb-3 flex flex-col gap-2 "
                    htmlFor="full name"
                  >
                    Email Address
                    <input
                      type="text"
                      id="full name"
                      className="w-full text-3 px-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9]  rounded-lg "
                      placeholder="Ibrahim Moshood"
                    />
                  </label>{" "}
                  <label
                    className="w-full md:w-1/2 flex flex-col gap-2 "
                    htmlFor="full name"
                  >
                    Phone Number
                    <input
                      type="text"
                      id="full name"
                      className="w-full text-3 px-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9]  rounded-lg "
                      placeholder="Ibrahim Moshood"
                    />
                  </label>
                </div>
              </form>
            </div>
            <div className="bg-white   shadow-sm rounded-lg px-5 py-5 flex flex-col gap-6 ">
              <h1 className="text-[20px] text-center md:text-start ">
                Security Settings
              </h1>
              <form action="" className=" ">
                <h1 className="text-[18px] mb-3  ">Change Password</h1>
                <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-[28px]">
                  <div className="w-fulll md:w-[236px] flex flex-col gap-2 ">
                    <label htmlFor="" className="text-[16px]">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="P@^%%4!"
                      className="w-full text-3 px-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9]  rounded-lg "
                    />
                  </div>
                  <div className="w-fulll md:w-[236px] flex flex-col gap-2">
                    <label htmlFor="" className="text-[16px]">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="P@^%%4!"
                      className="w-full text-3 px-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9]  rounded-lg "
                    />
                  </div>
                  <div className="w-fulll md:w-[236px] flex flex-col gap-2">
                    <label htmlFor="" className="text-[16px]">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="P@^%%4!"
                      className="w-full text-3 px-3 py-4 bg-[#FBFBFB] border border-[#D9D9D9]  rounded-lg "
                    />
                  </div>
                </div>
              </form>
              <button className="bg-[#7065F0] w-full md: w-[196px] text-white px-[24px] py-[14px] rounded-[8px] ">
                Update Password
              </button>
              <div className="text-center md:text-start">
                <h1 className="text-[16px] text-gray-700 ">
                  Two-Factor Authentication
                </h1>
                <p className="text-[14px] text-gray-500 ">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <div className="bg-white  shadow-sm rounded-lg px-5 py-5 flex flex-col gap-6 ">
              <h1 className="text-[20px] text-center md:text-start">
                Notification Preferences
              </h1>
              <div className="flex gap-2">
                <input type="checkbox" name="" id="email-notification" />
                <label
                  className="text-[14px] text-gray-700"
                  htmlFor="email-notification"
                >
                  Receive Email Notifications
                </label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="" id="sms-notification" />
                <label
                  className="text-[14px] text-gray-700"
                  htmlFor="sms-notification"
                >
                  Receive SMS Alerts
                </label>
              </div>
            </div>
            <div className="bg-white  shadow-sm rounded-lg px-5 py-5 flex flex-col gap-6">
              <h1 className="text-red-600 text-[20px] text-center md:text-start ">
                {" "}
                Danger Zone
              </h1>
              <div className="bg-red-100 p-4 rounded-lg flex flex-col justify-center  items-center  md:items-start text-center md:text-start ">
                <p>
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <button className="bg-red-600  mt-[18px] rounded-[8px] w-[180px] py-[14px] px-[24px]  text-white">
                  Delete Account
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
