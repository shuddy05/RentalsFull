import React, { useState, useEffect } from "react";
import StatCard from "../../Components/admin/StatCard";
import { BsHousesFill } from "react-icons/bs";
import { MdCheckCircle, MdPendingActions } from "react-icons/md";
import { RiRefreshLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axiosConfig";
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
      {status === "Available" ? "Active" : status}
    </span>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, propertiesRes] = await Promise.all([
          api.get("/api/admin/dashboard-stats"),
          api.get("/api/admin/properties"),
        ]);
        setStats(statsRes.data);
        setRecentProperties(propertiesRes.data.properties);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[#7065F0]">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#7065F0] rounded-xl px-6 py-5">
        <h2 className="text-white text-xl font-bold">
          Welcome {user?.email?.split("@")[0]} 👋
        </h2>
        <p className="text-white/80 text-sm mt-1">
          Here's a quick snapshot of your Properties.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Properties"
          value={stats?.totalProperties ?? 0}
          icon={<BsHousesFill size={22} className="text-[#7065F0]" />}
        />
        <StatCard
          title="Active Properties"
          value={
            (stats?.forSaleProperties ?? 0) + (stats?.forRentProperties ?? 0)
          }
          icon={<MdCheckCircle size={22} className="text-green-500" />}
        />
        <StatCard
          title="Pending Tours"
          value={0}
          icon={<MdPendingActions size={22} className="text-yellow-500" />}
        />
        <StatCard
          title="Rescheduled Tours"
          value={0}
          icon={<RiRefreshLine size={22} className="text-blue-500" />}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-6 px-2 ">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>

        {recentProperties.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto ">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-[#FEFAFA] border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">
                    Property
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">
                    Activity
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">
                    User
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentProperties.map((property) => (
                  <tr
                    key={property._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(property.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      {property.title}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-semibold ${property.status === "For Rent" ? "text-orange-500" : "text-green-600"}`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">Property Added</td>
                    <td className="py-3 px-4 text-gray-400">—</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={property.availability} />
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() =>
                          (window.location.href = `/detail-properties/${property._id}`)
                        }
                        className="text-[#7065F0] font-medium hover:underline cursor-pointer"
                      >
                        View
                      </button>
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

export default Dashboard;
