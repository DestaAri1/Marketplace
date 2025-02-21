import axios from "axios";
import { getToken } from "./TokenServices";

const API_URL = "http://localhost:3000/api";

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

export const sellerProductsApi = {
    getAll: async() => {
        try {
            const response = await apiClient.get('/seller/product')
            return response
        } catch (error) {
            handleApiError(error)
        }
    },

    getOne: async(id) => {
        try {
            const response = await apiClient.get(`/seller/product/${id}`)
            return response
        } catch (error) {
            handleApiError(error)
        }
    },

    create: async(name, stock, price, category_id, status, description) => {
        try {
            // Log the data being sent
            console.log('Sending to API:', {
                name,
                stock,
                price,
                category_id,
                status,
                description
            });

            const response = await apiClient.post('/seller/product', {
                name,
                stock,
                price,
                category_id,
                status,
                description
            });

            return response;
        } catch (error) {
            // Log the full error response
            console.error('API Error Response:', error.response?.data);
            handleApiError(error);
        }
    }
};