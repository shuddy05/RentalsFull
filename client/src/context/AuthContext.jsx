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

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/user");
      setUser(res.data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const contextdata = {
    user,
    loading,
    logout,
    fetchUser,
  };
  return (
    <AuthContext.Provider value={contextdata}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
