import axios from "axios";

// Backend API instance
export const API = axios.create({
  baseURL: "http://localhost:5000", // backend server
  headers: { "Content-Type": "application/json" },
});

// External API instance
export const ExternalAPI = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Token Management
let accessToken = localStorage.getItem("accessToken") || null;
let refreshToken = localStorage.getItem("refreshToken") || null;

// Save tokens from response
const saveTokens = (res) => {
  const newAccess =
    res.data?.accessToken || res.headers["x-access-token"] || null;
  const newRefresh =
    res.data?.refreshToken || res.headers["x-refresh-token"] || null;

  if (newAccess) {
    accessToken = newAccess;
    localStorage.setItem("accessToken", newAccess);
  }
  if (newRefresh) {
    refreshToken = newRefresh;
    localStorage.setItem("refreshToken", newRefresh);
  }
};

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
  (res) => {
    // Always save updated tokens if present
    saveTokens(res);
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 with refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post("http://localhost:5000/auth/refresh", {
          refreshToken,
        });

        // Save fresh tokens
        saveTokens(res);

        // Retry original request with new access token
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("accessToken")}`;

        return API(originalRequest);
      } catch (err) {
        console.error("❌ Refresh token failed", err);

        // Clear storage and tokens
        accessToken = null;
        refreshToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);

export default API;
