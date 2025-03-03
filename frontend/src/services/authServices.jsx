import axios from "axios";
import { getToken, setToken, removeToken } from "./TokenServices";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor untuk request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("Request headers:", config.headers); // Temporary debug
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const token = response.data?.data?.token;
    if (token) {
      setToken(token);
    }
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registration = async (username, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    const token = response.data?.data?.token;
    if (token) {
      setToken(token);
    }
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getUser = async () => {
  try {
    const response = await api.get("/auth/getUser");
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 401) {
      removeToken();
    }
    throw error;
  }
};
