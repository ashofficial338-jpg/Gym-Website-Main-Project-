import axios from "axios";

// ======================================================
// API CONFIGURATION
// ======================================================

const API = axios.create({
  baseURL: "https://gym-backend-11.onrender.com/api",
  timeout: 30000,

  headers: {
    "Content-Type": "application/json",
  },
});

// ======================================================
// REQUEST INTERCEPTOR
// ======================================================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================

API.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response) {
      console.error(
        "❌ API Error:",
        error.response.status,
        error.response.data
      );

      // Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");

        window.location.href = "/";
      }
    } else if (error.request) {
      console.error(
        "❌ Server not responding:",
        error.message
      );
    } else {
      console.error(
        "❌ Request Error:",
        error.message
      );
    }

    return Promise.reject(error);
  }
);

export default API;