import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-[28px] font-bold text-gray-800">{value}</h2>
      </div>
      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;