import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("user:", user);
  console.log("loading:", loading);
  console.log("role:", user?.role);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;
  return children;
};

export default AdminRoute;
