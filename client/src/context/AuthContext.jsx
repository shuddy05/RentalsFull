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

  const contextdata = {
    user,
    loading,
    register,
    login,
  };
  return (
    <AuthContext.Provider value={contextdata}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
