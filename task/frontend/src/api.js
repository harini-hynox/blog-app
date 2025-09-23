import axios from "axios";
import { supabase } from "./supabaseClient";

// ---------------- BACKEND API ----------------
export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ---------------- EXTERNAL API ----------------
export const ExternalAPI = axios.create({
  baseURL: process.env.REACT_APP_EXTERNAL_API || "https://jsonplaceholder.typicode.com/posts",
});

// ---------------- INTERCEPTORS ----------------

// Attach Supabase access token automatically
API.interceptors.request.use(
  async (config) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        config.headers["Authorization"] = `Bearer ${session.access_token}`;
        console.log("🔑 Attached token to request");
      } else {
        console.log("⚠️ No session token found");
      }
    } catch (err) {
      console.error("❌ Error attaching token:", err.message);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized responses
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          console.warn("⚠️ Unauthorized: redirecting to login");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("❌ Session fetch failed:", err.message);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
