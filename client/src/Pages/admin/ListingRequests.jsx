import React, { useState } from "react";
import { FiCheck, FiX, FiSearch, FiHome, FiUser, FiMail, FiPhone, FiDollarSign } from "react-icons/fi";
import { VscListFlat } from "react-icons/vsc";

const INITIAL_REQUESTS = [
  {
    id: "LR-201",
    landlordName: "Olumide Bakare",
    landlordEmail: "olumide@example.com",
    landlordPhone: "+234 803 123 4567",
    propertyTitle: "Luxury 4-Bedroom Terrace",
    type: "House",
    statusWanted: "For Rent",
    location: "Ikoyi, Lagos",
    proposedPrice: 18000000,
    submittedAt: "2026-09-28",
    status: "Under Review",
  },
  {
    id: "LR-202",
    landlordName: "Grace Eze",
    landlordEmail: "grace.eze@example.com",
    landlordPhone: "+234 816 789 0123",
    propertyTitle: "Modern Commercial Office Space",
    type: "Office Space",
    statusWanted: "For Rent",
    location: "Central Business District, Abuja",
    proposedPrice: 35000000,
    submittedAt: "2026-09-29",
    status: "Approved",
  },
  {
    id: "LR-203",
    landlordName: "Tunde Williams",
    landlordEmail: "tunde.williams@example.com",
    landlordPhone: "+234 701 234 5678",
    propertyTitle: "Beachfront Villa & Pool",
    type: "Villa",
    statusWanted: "For Sale",
    location: "Elegushi Beach Road, Lagos",
    proposedPrice: 220000000,
    submittedAt: "2026-09-25",
    status: "Rejected",
  },
];

const ListingRequests = () => {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const handleUpdateStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
  };

  const filtered = requests.filter((r) => {
    const matchFilter = activeFilter === "All" || r.status === activeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      r.landlordName.toLowerCase().includes(q) ||
      r.propertyTitle.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Under Review":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Landlord Listing Requests</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review, verify, and approve property submissions from prospective landlords and sellers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs uppercase font-semibold text-gray-400">Total Submissions</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">{requests.length}</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs uppercase font-semibold text-amber-500">Under Review</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {requests.filter((r) => r.status === "Under Review").length}
          </h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs uppercase font-semibold text-green-600">Approved</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {requests.filter((r) => r.status === "Approved").length}
          </h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs uppercase font-semibold text-red-500">Rejected</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            {requests.filter((r) => r.status === "Rejected").length}
          </h2>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by landlord or property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#7065F0] transition-all focus:ring-2 focus:ring-[#7065F0]/20"
          />
          <FiSearch className="absolute left-3.5 top-3 text-gray-400 text-sm" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {["All", "Under Review", "Approved", "Rejected"].map((status) => (
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

      {/* Requests Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-[#7065F0] flex items-center justify-center mb-3">
              <VscListFlat size={28} />
            </div>
            <h3 className="text-base font-semibold text-gray-800">No listing requests found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              There are no property listing submissions matching your filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="py-3.5 px-6 font-semibold text-gray-600">Landlord Details</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">Property Title</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">Type / Status</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">Price</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">Status</th>
                  <th className="py-3.5 px-6 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                          <FiUser size={13} className="text-[#7065F0]" />
                          {req.landlordName}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FiMail size={11} /> {req.landlordEmail}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FiPhone size={11} /> {req.landlordPhone}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 flex items-center gap-1">
                          <FiHome size={13} className="text-[#7065F0]" />
                          {req.propertyTitle}
                        </span>
                        <span className="text-xs text-gray-500">{req.location}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-gray-700">{req.type}</span>
                        <span
                          className={`text-[11px] font-semibold ${
                            req.statusWanted === "For Rent"
                              ? "text-orange-500"
                              : "text-green-600"
                          }`}
                        >
                          {req.statusWanted}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      ₦{req.proposedPrice.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusBadge(
                          req.status,
                        )}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {req.status !== "Approved" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(req.id, "Approved")}
                            className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                            title="Approve Listing"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                        {req.status !== "Rejected" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(req.id, "Rejected")}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Reject Listing"
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

export default ListingRequests;