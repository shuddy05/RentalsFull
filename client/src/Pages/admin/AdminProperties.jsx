import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import addProp from "../../assets/images/addProp.png";
import image from "../../assets/images/image492.png";
import EmptyState from "../../Components/admin/EmptyState";
const StatusBadge = ({ status }) => {
  const styles = {
    Available: "bg-green-100 text-green-700",
    Unavailable: "bg-red-100 text-red-700",
    Draft: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
};

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/api/admin/properties");
        console.log("admin properties:", res.data);
        setProperties(res.data.properties);
      } catch (error) {
        console.error("Failed to fetch properties:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleToggleAvailability = async (id, currentAvailability) => {
    const newAvailability =
      currentAvailability === "Available" ? "Unavailable" : "Available";
    try {
      await api.patch(`/admin/properties/${id}`, {
        availability: newAvailability,
      });
      setProperties((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, availability: newAvailability } : p,
        ),
      );
    } catch (error) {
      console.error("Failed to update availability:", error.response?.data);
    }
  };

 
  const filtered = properties.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType ? p.type === filterType : true;
    const matchStatus = filterStatus ? p.availability === filterStatus : true;
    return matchSearch && matchType && matchStatus;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[#7065F0]">Loading properties...</p>
      </div>
    );

  if (!loading && properties.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#7065F0] w-[220px]"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#7065F0]"
          >
            <option value="">All</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Office Space">Office Space</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#7065F0]"
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <button
          onClick={() => navigate("/admin/properties/add")}
          className="bg-[#7065F0] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#5a51d4] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <img src={addProp} alt="Add Property" className="w-5 h-5" />
          Add New Property
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-gray-100 bg-[#FEFAFA]">
                <th className="text-left py-3 px-4 text-gray-500 font-medium">
                  Property
                </th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">
                  Price
                </th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">
                  Date Added
                </th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((property) => (
                <tr
                  key={property._id}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <span className="font-medium text-gray-800">
                        {property.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs font-semibold ${property.status === "For Rent" ? "text-orange-500" : "text-green-600"}`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {property.location}
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    ₦{property.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={property.availability} />
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {new Date(property.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/detail-properties/${property._id}`}
                        className="text-[#7065F0] font-medium hover:underline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() =>
                          navigate(`/admin/properties/edit/${property._id}`)
                        }
                        className="text-gray-600 font-medium hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleToggleAvailability(
                            property._id,
                            property.availability,
                          )
                        }
                        className={`font-medium hover:underline cursor-pointer ${
                          property.availability === "Available"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {property.availability === "Available"
                          ? "Unlist"
                          : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {filtered.length} of {properties.length}
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
              «
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
              ‹
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#7065F0] text-white">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
              ›
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProperties;
