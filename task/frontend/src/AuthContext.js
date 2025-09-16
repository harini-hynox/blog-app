import React, { createContext, useState, useEffect } from "react";
import { API } from "./api";  // ✅ named import
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await API.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error("Auth check failed:", err);
          logout();
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, [token]);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
