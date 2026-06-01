import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../Components/admin/StatCard";
import { BsHousesFill } from "react-icons/bs";
import { MdCheckCircle, MdPendingActions } from "react-icons/md";
import { RiRefreshLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axiosConfig";
import image from "../../assets/images/image492.png";
import addProp from "../../assets/images/addProp.png";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#7065F0] rounded-xl px-6 py-5">
        <h2 className="text-white text-xl font-bold">Welcome Admin 👋</h2>
        <p className="text-white/80 text-sm mt-1">
          Here's a quick snapshot of your Properties.
        </p>
      </div>

      {loading ? (
        <p className="text-blue-500">Loading stats...</p>
      ) : (
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
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="overflow-x-auto">
          <div className="w-full text-sm">
            <div>
              <div>
                <div className="text-center py-16 text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <img src={image} alt="" />
                    <p className="font-medium text-gray-600">Nothing here,</p>
                    <p className="font-semibold text-gray-800">
                      List property to get started
                    </p>
                    <p className="text-xs text-gray-400 max-w-xs text-center">
                      "You don't have any properties listed or tour requests
                      yet. Start by adding your first property to get started".
                    </p>
                    <button
                      onClick={() => navigate("/admin/properties/add")}
                      className="mt-4 bg-[#7065F0] cursor-pointer text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#5a51d4]  flex items-center gap-2"
                    >
                      Add New Property
                      <img src={addProp} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
