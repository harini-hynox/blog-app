import React, { createContext, useState, useEffect } from "react";
import { API } from "./api"; 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Verify session on mount (token is handled via httpOnly cookie on backend)
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await API.get("/auth/me", { withCredentials: true }); 
        // ✅ "withCredentials" tells axios to send httpOnly cookies
        setUser(res.data);
      } catch (err) {
        console.error("Auth check failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  // 🔹 Login just updates React state, server sets cookie
  const login = async (credentials) => {
    try {
      const res = await API.post("/auth/login", credentials, { withCredentials: true });
      setUser(res.data.user);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // 🔹 Logout clears session on server + React state
  const logout = async () => {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
