import axios from "axios";
import { getToken } from "./TokenServices";

const API_URL = "http://localhost:3000/api"

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
  }
});

// Request interceptor to add token
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (!token) {
      throw new Error('No token found');
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Error handler helper
const handleApiError = (error) => {
  if (error.response) {
      throw new Error(error.response.data.message || 'Server error');
  } else if (error.request) {
      if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out - please try again');
      }
      throw new Error('Network error - please check your connection');
  }
  throw new Error('Error processing request');
};

export const requestToBeSellerApi = {
  upgrade: async() => {
    try {
      const response = await apiClient.post('/user/upgrade',{})
      return response
    } catch (error) {
      handleApiError(error)
    }
  },

  getStatus: async() => {
    try {
      const response = await apiClient.get('/user/upgrade/status')
      return response
    } catch (error) {
      handleApiError(error)
    }
  }
}