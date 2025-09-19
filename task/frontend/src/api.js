import axios from "axios";

// 🔹 Backend API instance
export const API = axios.create({
  baseURL: "http://localhost:5000", // backend server
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ✅ important: allows cookies (refresh token stored in httpOnly cookie)
});

// 🔹 External API instance
export const ExternalAPI = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// ---------------- TOKEN MANAGEMENT ----------------
let accessToken = localStorage.getItem("accessToken") || null;

// Save access token from response
const saveAccessToken = (res) => {
  const newAccess =
    res.data?.accessToken || res.headers["x-access-token"] || null;

  if (newAccess) {
    accessToken = newAccess;
    localStorage.setItem("accessToken", newAccess);
  }
};

// Clear all tokens
const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

// ---------------- INTERCEPTORS ----------------
// Request Interceptor → attach access token
API.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor → handle access token refresh via cookie
API.interceptors.response.use(
  (res) => {
    saveAccessToken(res); // save updated access token if present
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    // If 401 → try refreshing using refresh token stored in cookie
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/auth/refresh",
          {},
          { withCredentials: true } // ✅ send cookie automatically
        );

        saveAccessToken(res);

        // Retry original request with new access token
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("accessToken")}`;

        return API(originalRequest);
      } catch (err) {
        console.error("❌ Refresh token failed:", err.message);
        clearTokens();
        window.location.href = "/login"; // force logout
      }
    }

    return Promise.reject(error);
  }
);

export default API;
