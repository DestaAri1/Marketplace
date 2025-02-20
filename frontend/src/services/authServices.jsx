import axios from 'axios';
import { getToken, removeToken, setToken } from './TokenServices';

const API_URL = "http://localhost:3000/api/auth";
const headers = { "Content-Type": "application/json", Accept: "application/json" };

const request = async (method, endpoint, data = {}, token) => {
    try {
        const response = await axios({
            method,
            url: `${API_URL}/${endpoint}`,
            data,
            headers: token ? { ...headers, Authorization: `Bearer ${token}` } : headers,
        });
        if (response.data.data.token) setToken(response.data.data.token);
        return response.data.data;
    } catch (error) {
        if (endpoint === 'getUser') removeToken();
        throw error.response?.data || new Error("Network error");
    }
};

export const login = (email, password) => request('post', 'login', { email, password });
export const registration = (username, email, password) => request('post', 'register', { username, email, password });
export const getUser = () => request('get', 'getUser', {}, getToken());