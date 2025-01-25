import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = "http://localhost:3000/api"; 

export const getToken = () => {
    return Cookies.get('token') || localStorage.getItem('token')
}

export const setToken = (token) => {
    Cookies.set('token', token, {
        expires: 1,
        path:'/',
        sameSite:'Strict',
        secure: process.env.NODE_ENV === 'production' // Use secure flag in production
    })
    localStorage.setItem('token', token);
}

export const removeToken = () => {
    Cookies.remove('token', { path: '/' });
    localStorage.removeItem('token');
}

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
