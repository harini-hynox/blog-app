import React, { createContext, useState, useEffect } from "react";
import API from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 On first load → restore user if available
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  // 🔹 Login → store accessToken + user (❌ no refreshToken here)
  const login = (userData, accessToken) => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // 🔹 Logout → clear everything + call backend
  const logout = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.id) {
        await API.post("/auth/logout", { userId: storedUser.id });
      }
    } catch (err) {
      console.error("❌ Logout failed:", err.response?.data || err.message);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
