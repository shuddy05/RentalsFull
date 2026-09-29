import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-5 flex items-center justify-between transition-shadow cursor-default">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h2 className="text-[28px] font-bold text-gray-900">{value}</h2>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;