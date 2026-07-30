import axios from "axios";

const API = axios.create({
  // Base URL pointing to the deployed backend API endpoint
  baseURL: "https://gym-backend-8.onrender.com/api", 
});

// Request interceptor to automatically attach the JWT token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;