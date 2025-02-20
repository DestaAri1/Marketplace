import axios from 'axios';
import { getToken, removeToken, setToken } from './TokenServices';

const API_URL = "http://localhost:3000/api/auth";
const config = { headers: { "Content-Type": "application/json", Accept: "application/json" } };

const handleRequest = async (url, data) => {
    try {
        const response = await axios.post(`${API_URL}/${url}`, data, config);
        setToken(response.data.data.token);
        return response;
    } catch (error) {
        throw error.response?.data || new Error("Network error");
    }
};

export const login = (email, password) => handleRequest("login", { email, password });
export const registration = (username, email, password) => handleRequest("register", { username, email, password });

export const getUser = async () => {
    const token = getToken();
    if (!token) throw new Error('No token found');
    
    try {
        const response = await axios.get(`${API_URL}/getUser`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data.data;
    } catch (error) {
        removeToken();
        throw error;
    }
};