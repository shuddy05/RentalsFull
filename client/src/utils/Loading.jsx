import React from "react";

const Loading = () => {
  return (
    <div className="bg-[#f5f5e8] min-h-screen animate-pulse">
      
      <div className="flex items-center justify-between px-10 py-5">
        <div className="h-6 w-28 bg-gray-300 rounded-md" />
        <div className="flex gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-16 bg-gray-300 rounded-md" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-gray-300 rounded-full" />
          <div className="h-4 w-32 bg-gray-300 rounded-md" />
        </div>
      </div>

      <div className="flex justify-between items-center px-10 mt-16">
        <div className="flex flex-col gap-4 w-1/2">
          <div className="h-10 w-3/4 bg-gray-300 rounded-md" />
          <div className="h-10 w-2/4 bg-gray-300 rounded-md" />
          <div className="h-4 w-3/4 bg-gray-300 rounded-md" />
          <div className="h-4 w-2/4 bg-gray-300 rounded-md" />
          <div className="h-12 w-40 bg-gray-300 rounded-xl mt-4" />
        </div>
        <div className="h-80 w-[45%] bg-gray-300 rounded-2xl" />
      </div>

      <div className="flex gap-10 px-10 mt-16">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-8 w-20 bg-gray-300 rounded-md" />
            <div className="h-4 w-24 bg-gray-300 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
