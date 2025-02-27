import axios from "axios";
import { getToken } from "./TokenServices";

const API_URL = "http://localhost:3000/api";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add token
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient; // Pastikan export default
