import React from "react";
import { Link } from "react-router-dom";
import { IoCloudDownloadOutline } from "react-icons/io5";

const AddNewProperty = () => {
  return (
    <main>
      <div className="flex gap-2 text-sm items-center mb-6 ">
        <Link
          className="text-gray-500 hover:text-gray-700"
          to="/admin/properties"
        >
          My Property
        </Link>
        <p> ›</p>
        <span className="text-gray-800 font-medium">Add New Property</span>
      </div>
      <div className="flex flex-col gap-2 mb-10 ">
        <h1 className="font-medium text-[20px]">Add a New Property</h1>
        <p className="text-gray-700 text-[16px] font-medium ">
          Provide details about your properties so buyer can easily discover it
        </p>
      </div>
      <div className="flex justify-center items-center ">
        <form className="w-[804px] flex flex-col gap-7   ">
          <div className="w-full rounded-lg border bg-white border-gray-200 p-6 shadow-sm flex flex-col gap-4 ">
            <h1 className="font-medium text-[20px]">Basic Information</h1>
            <div className="h-[217px] border border-gray-300 gap-3 flex flex-col items-center justify-center rounded-lg mt-4">
              <div className="text-gray-600">
                <IoCloudDownloadOutline size={40} className="mx-auto mb-2" />
                <p>Drag and drop your images here (JPG/PNG, max 5MB)</p>
              </div>
              <p className="text-gray-600">Or</p>
              <button className=" cursor-pointer rounded-lg bg-[#7065F0] text-white font-medium px-4 py-2 text-[18px]">
                Choose File
              </button>
            </div>
            <div className="w-full flex flex-col gap-4 ">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px] ">
                  Property Title <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your property title"
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px] ">
                  About the Property <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter the description of the property"
                  className="outline-none w-full h-[114px] border border-gray-200 shadow-sm rounded-lg p-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px] ">
                  Property Type <span className="text-red-700">*</span>
                </label>
                <select className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3">
                  <option value="">Select property type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[16px] ">
                  Price <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Amount"
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                />
              </div>
            </div>
          </div>
          <div className="w-full rounded-lg bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <h1 className="font-medium text-[20px]">Location</h1>
            <div className="flex gap-2">
              <div className="flex flex-col gap-2 w-1/2 ">
                <label> Location</label>
                <input
                  type="text"
                  placeholder="City/Area"
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                />
              </div>
              <div className="flex flex-col gap-2 w-1/2 ">
                <label> Full Address</label>
                <input
                  type="text"
                  placeholder="Enter full address"
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                />
              </div>
            </div>
          </div>
          <div className="w-full rounded-lg bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <h1 className="font-medium text-[20px]">Amenities</h1>
            <div className="flex gap-6">
              <div className="flex flex-col gap-2 w-1/3 ">
                <label> Bedroom</label>
                <input
                  type="text"
                  placeholder="Enter number "
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                />
              </div>
              <div className="flex flex-col gap-2 w-1/3 ">
                <label> Bathroom</label>
                <input
                  type="text"
                  placeholder="Enter number "
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                />
              </div>
              <div className="flex flex-col gap-2 w-1/3 ">
                <label> Square Area</label>
                <input
                  type="text"
                  placeholder="Enter square area"
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                />
              </div>
              <div className="flex flex-col gap-2 w-1/3 ">
                <label> Packing</label>
                <input
                  type="text"
                  placeholder="Enter number "
                  className="outline-none w-full border border-gray-200 shadow-sm rounded-lg p-3"
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  className=" w-[24px] h-[24px] "
                />
                <label htmlFor="checkbox">Free Wifi</label>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  className=" w-[24px] h-[24px] "
                />
                <label htmlFor="checkbox">Parking SPace</label>
              </div>{" "}
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  className=" w-[24px] h-[24px] "
                />
                <label htmlFor="checkbox">24/7 Power Supply</label>
              </div>{" "}
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  className=" w-[24px] h-[24px] "
                />
                <label htmlFor="checkbox">+</label>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 mt-6">
              <button className=" text-[18px] rounded-lg border border-[#7065F0] text-[#7065F0] bg-white font-medium px-4 py-2 hover:bg-[#7065F0] hover:text-white ">
                Save as Draft
              </button>
              <button className=" text-[18px] rounded-lg  bg-[#7065F0] text-white font-medium px-4 py-2 hover:bg-white hover:text-[#7065F0] hover:border hover:border-[#7065F0]">
                Publish Property
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddNewProperty;
