// src/api.js
import axios from "axios";

// Local backend API
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// External API
const ExternalAPI = axios.create({
  baseURL: process.env.REACT_APP_EXTERNAL_API || "https://jsonplaceholder.typicode.com", // example
});

export { API, ExternalAPI }; // ✅ named exports
