import React, { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { FiSearch, FiTrash2, FiUser, FiUsers, FiShield, FiAlertTriangle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalUser, setDeleteModalUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/admin/users");
      setUsers(res.data?.users || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load registered users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/admin/users");
        if (!ignore) {
          setUsers(res.data?.users || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Failed to load registered users");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchUsers();
    return () => {
      ignore = true;
    };
  }, []);

  const handleDeleteUser = async () => {
    if (!deleteModalUser) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/api/admin/users/${deleteModalUser._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== deleteModalUser._id));
      setFeedbackMessage({
        type: "success",
        text: `User ${deleteModalUser.email} was successfully deleted.`,
      });
      setDeleteModalUser(null);
    } catch (err) {
      setFeedbackMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete user.",
      });
    } finally {
      setDeleteLoading(false);
      setTimeout(() => setFeedbackMessage(null), 5000);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = searchTerm.toLowerCase();
    const matchEmail = u.email?.toLowerCase().includes(q);
    const matchId = u._id?.toLowerCase().includes(q);
    return matchEmail || matchId;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            View, search, and manage registered user accounts
          </p>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#7065F0] flex items-center justify-center shrink-0">
            <FiUsers size={24} />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-gray-400">Total Users</p>
            <h2 className="text-2xl font-bold text-gray-900">{users.length}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <FiUser size={24} />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-gray-400">Standard Users</p>
            <h2 className="text-2xl font-bold text-gray-900">
              {users.filter((u) => u.role === "user").length}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FiShield size={24} />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-gray-400">Verified System</p>
            <h2 className="text-base font-bold text-gray-900">Active Mongoose DB</h2>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-xl text-sm font-medium border ${
            feedbackMessage.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {feedbackMessage.text}
        </div>
      )}

      {/* Search & Actions Bar */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by email or user ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#7065F0] transition-all focus:ring-2 focus:ring-[#7065F0]/20"
          />
          <FiSearch className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
        </div>
        <p className="text-sm text-gray-500 hidden sm:block">
          Showing <span className="font-semibold text-gray-800">{filteredUsers.length}</span> of{" "}
          <span className="font-semibold text-gray-800">{users.length}</span> users
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-3 border-[#7065F0] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#7065F0] text-sm font-medium">Loading user accounts...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <p className="text-red-500 font-medium mb-3">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-[#7065F0] text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-[#5b52c7]"
            >
              Retry
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
              <FiUsers size={28} />
            </div>
            <h3 className="text-base font-semibold text-gray-800">No users found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              {searchTerm
                ? `No accounts match "${searchTerm}". Try a different email address or search query.`
                : "No registered users in the database yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="py-3.5 px-6 font-semibold text-gray-600">User Email</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">User ID</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">Role</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-600">Date Registered</th>
                  <th className="py-3.5 px-6 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => {
                  const initial = user.email ? user.email.charAt(0).toUpperCase() : "U";
                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7065F0] to-purple-400 text-white font-semibold flex items-center justify-center text-sm shadow-sm shrink-0">
                            {initial}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-gray-500">
                        {user._id}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-[#7065F0] capitalize border border-purple-100">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setDeleteModalUser(user)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer transition-colors"
                        >
                          <FiTrash2 size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {deleteModalUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-100 flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <FiAlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Delete User Account</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    This action is permanent and cannot be undone.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDeleteModalUser(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <IoClose size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200">
              Are you sure you want to permanently delete{" "}
              <strong className="text-gray-900">{deleteModalUser.email}</strong>?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalUser(null)}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={deleteLoading}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium cursor-pointer shadow-sm transition-colors disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Delete User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;