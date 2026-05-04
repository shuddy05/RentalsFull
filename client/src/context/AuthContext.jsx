import { useContext, createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const handleAuthError = (error) => {
    if (error.response) {
      return error.response.data?.message || "An error occurred";
    } else if (error.request) {
      return "Network error, check your connection";
    } else {
      return "Something went wrong";
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/user");
      setUser(res.data.user);
    } catch (error) {
      console.log("fetchUser error:", error.response?.data);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, confirmPassword) => {
    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        confirmPassword,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.safeUser);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: handleAuthError(error) };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.safeUser);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: handleAuthError(error) };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await api.post("/auth/forgot-password", { email });
      return { success: true, message: res.data.message };
    } catch (error) {
      return { success: false, message: handleAuthError(error) };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      return { success: true, message: res.data.message };
    } catch (error) {
      return { success: false, message: handleAuthError(error) };
    }
  };

  const resetPassword = async (email, otp, password, confirmPassword) => {
    try {
      const res = await api.post("/auth/reset-password", {
        email,
        otp,
        password,
        confirmPassword,
      });
      return { success: true, message: res.data.message };
    } catch (error) {
      return { success: false, message: handleAuthError(error) };
    }
  };

  const contextdata = {
    user,
    loading,
    register,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={contextdata}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
