// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { supabase } from "./supabaseClient"; // Supabase v2 client

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [loading, setLoading] = useState(true);

  // 🔹 On first load → check Supabase session
  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const loggedUser = {
          id: session.user.id,
          email: session.user.email,
          ...session.user.user_metadata,
        };
        setUser(loggedUser);
        setAccessToken(session.access_token);
        localStorage.setItem("accessToken", session.access_token);
      } else {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("accessToken");
      }

      setLoading(false);
    };

    initAuth();

    // 🔹 Listen to Supabase auth state changes (handles refresh automatically)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const loggedUser = {
            id: session.user.id,
            email: session.user.email,
            ...session.user.user_metadata,
          };
          setUser(loggedUser);
          setAccessToken(session.access_token);
          localStorage.setItem("accessToken", session.access_token);
        } else {
          setUser(null);
          setAccessToken(null);
          localStorage.removeItem("accessToken");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔹 Login via Supabase
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const loggedUser = {
      id: data.user.id,
      email: data.user.email,
      ...data.user.user_metadata,
    };

    setUser(loggedUser);
    setAccessToken(data.session.access_token);
    localStorage.setItem("accessToken", data.session.access_token);

    return loggedUser;
  };

  // 🔹 Signup via Supabase (auto-login)
  const signup = async (email, password, extraMeta = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: extraMeta }, // store name, role, etc. in user_metadata
    });
    if (error) throw error;

    // some setups require email confirmation → session may be null
    if (!data.session) {
      return {
        message: "Signup successful. Please check your email to confirm.",
      };
    }

    const loggedUser = {
      id: data.user.id,
      email: data.user.email,
      ...data.user.user_metadata,
    };

    setUser(loggedUser);
    setAccessToken(data.session.access_token);
    localStorage.setItem("accessToken", data.session.access_token);

    return loggedUser;
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("❌ Logout failed:", err.message);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("accessToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
