import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;
  return children;
};

export default AdminRoute;
