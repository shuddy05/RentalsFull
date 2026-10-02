import React, { useState } from "react";
import { FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiCheck, FiX, FiSearch } from "react-icons/fi";
import { MdOutlineTour } from "react-icons/md";

const INITIAL_TOURS = [
  {
    id: "TR-101",
    clientName: "David Adeleke",
    clientEmail: "david@example.com",
    clientPhone: "+234 802 345 6789",
    propertyTitle: "Ocean Breeze Duplex",
    location: "Lekki, Lagos",
    tourDate: "2026-10-08",
    tourTime: "11:00 AM",
    type: "In-Person",
    status: "Pending",
  },
  {
    id: "TR-102",
    clientName: "Amina Yusuf",
    clientEmail: "amina.yusuf@example.com",
    clientPhone: "+234 813 456 7890",
    propertyTitle: "Sunset Penthouse",
    location: "Wuse, Abuja",
    tourDate: "2026-10-10",
    tourTime: "02:30 PM",
    type: "Video Call",
    status: "Confirmed",
  },
  {
    id: "TR-103",
    clientName: "Chinedu Okafor",
    clientEmail: "chinedu@example.com",
    clientPhone: "+234 905 678 1234",
    propertyTitle: "Royal Palm Estate",
    location: "GRA, Port Harcourt",
    tourDate: "2026-10-05",
    tourTime: "10:00 AM",
    type: "In-Person",
    status: "Completed",
  },
];

const TourRequests = () => {
  const [tours, setTours] = useState(INITIAL_TOURS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const handleUpdateStatus = (id, newStatus) => {
    setTours((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
    );
  };

  const filteredTours = tours.filter((t) => {
    const matchFilter = activeFilter === "All" || t.status === activeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      t.clientName.toLowerCase().includes(q) ||
      t.propertyTitle.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Property Tour Requests</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review, approve, and manage in-person and virtual property tour bookings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs uppercase font-semibold text-gray-400">Total Bookings</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">{tours.length}</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs uppercase font-semibold text-amber-500">Pending Approval</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {tours.filter((t) => t.status === "Pending").length}
          </h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs uppercase font-semibold text-green-600">Confirmed</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {tours.filter((t) => t.status === "Confirmed").length}
          </h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs uppercase font-semibold text-blue-600">Completed</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {tours.filter((t) => t.status === "Completed").length}
          </h2>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by client or property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#7065F0] transition-all focus:ring-2 focus:ring-[#7065F0]/20"
          />
          <FiSearch className="absolute left-3.5 top-3 text-gray-400 text-sm" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setActiveFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0 ${
                activeFilter === status
                  ? "bg-[#7065F0] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tour Requests Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredTours.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-[#7065F0] flex items-center justify-center mb-3">
              <MdOutlineTour size={28} />
            </div>
            <h3 className="text-base font-semibold text-gray-800">No tour requests found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              There are no tour requests matching your current filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="py-3.5 px-6 font-semibold text-gray-600">Client Details</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">Property</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">Date & Time</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">Format</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">Status</th>
                  <th className="py-3.5 px-6 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                          <FiUser size={13} className="text-[#7065F0]" />
                          {tour.clientName}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FiMail size={11} /> {tour.clientEmail}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FiPhone size={11} /> {tour.clientPhone}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">{tour.propertyTitle}</span>
                        <span className="text-xs text-gray-500">{tour.location}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      <div className="flex flex-col text-xs">
                        <span className="font-medium text-gray-800 flex items-center gap-1">
                          <FiCalendar size={12} className="text-[#7065F0]" /> {tour.tourDate}
                        </span>
                        <span className="text-gray-500 flex items-center gap-1 mt-0.5">
                          <FiClock size={12} /> {tour.tourTime}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
                        {tour.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusBadge(
                          tour.status,
                        )}`}
                      >
                        {tour.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {tour.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(tour.id, "Confirmed")}
                            className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                            title="Confirm Booking"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                        {tour.status === "Confirmed" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(tour.id, "Completed")}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Mark as Completed"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                        {tour.status !== "Cancelled" && tour.status !== "Completed" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(tour.id, "Cancelled")}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Cancel Tour"
                          >
                            <FiX size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourRequests;