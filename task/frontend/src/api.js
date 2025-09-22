import axios from "axios";

// 🔹 Backend API instance
export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// 🔹 External API instance
export const ExternalAPI = axios.create({
  baseURL: process.env.REACT_APP_EXTERNAL_API || "https://jsonplaceholder.typicode.com",
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

// Clear access token and user info
const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

// ---------------- INTERCEPTORS ----------------
// Attach access token to every request
API.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response: save access token or refresh if expired
API.interceptors.response.use(
  (res) => {
    saveAccessToken(res);
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get userId from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) throw new Error("No user found for token refresh");

        // Call refresh endpoint (refresh token is in DB)
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/auth/refresh`,
          { userId: user.id },
          { headers: { "Content-Type": "application/json" } }
        );

        saveAccessToken(res);

        // Retry original request with new access token
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("accessToken")}`;

        return API(originalRequest);
      } catch (err) {
        console.error("❌ Refresh failed:", err.message);
        clearTokens();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
