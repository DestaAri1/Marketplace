import axios from 'axios';
import { getToken, removeToken, setToken } from './TokenServices';
const API_URL = "http://localhost:3000/api"

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email, password
        }, {
            headers: {
                "Content-Type" : "application/json",
                Accept:"application/json"
            }
        })

        const { token } = response.data.data;
        setToken(token);

        return response;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw new Error("Network error");
    }
}

export const registration = async(username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            username, email, password
        }, {
            headers: {
                "Content-Type" : "application/json",
                Accept:"application/json"
            }
        })

        const { token } = response.data.data;
        setToken(token);

        return response;
    } catch (error) {
        if (error.response) {   
            throw error.response.data;
        }
        throw new Error("Network error");
    }
}

export const getUser = async() => {
    const token = getToken()

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.get(`${API_URL}/auth/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        return response.data.data;
      } catch (error) {
        removeToken();
        throw error;
    }
}
