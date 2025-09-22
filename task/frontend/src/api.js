// src/api.js
import axios from "axios";
import { supabase } from "./supabaseClient"; // Ensure this path is correct

// 🔹 Normalize base URLs to avoid trailing slashes
const normalizeBaseURL = (url) => {
  if (!url) return "";
  return url.replace(/\/+$/, ""); // remove trailing slashes
};

// ---------------- BACKEND API ----------------
export const API = axios.create({
  baseURL:
    normalizeBaseURL(process.env.REACT_APP_API_URL) ||
    "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// ---------------- EXTERNAL API (jsonplaceholder) ----------------
export const ExternalAPI = axios.create({
  baseURL:
    normalizeBaseURL(process.env.REACT_APP_EXTERNAL_API) ||
    "https://jsonplaceholder.typicode.com",
});

// ✅ Ensure all external requests always start with `/posts`
ExternalAPI.interceptors.request.use(
  (config) => {
    if (!config.url.startsWith("/posts")) {
      config.url = `/posts${config.url}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------- INTERCEPTORS ----------------
// Attach Supabase access token to every backend request
API.interceptors.request.use(
  async (config) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        config.headers["Authorization"] = `Bearer ${session.access_token}`;
      }
    } catch (err) {
      console.error("❌ Error attaching token:", err.message);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------- RESPONSE HANDLING ----------------
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired or unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          // Redirect if no valid session
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
