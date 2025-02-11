import axios from "axios";
import { getToken } from "./TokenServices";
const API_URL = "http://localhost:3000/api"

export const GetAllUserRequest = async() => {
    const token = getToken() 

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.get(`${API_URL}/admin/seller/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        return response.data.data;
      } catch (error) {
        // removeToken();
        throw error;
    }
}

export const GetAllUser = async() => {
  const token = getToken() 

  if (!token) {
      throw new Error('No token found');
  }

  try {
      const response = await axios.get(`${API_URL}/admin/user/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data.data;
    } catch (error) {
      // removeToken();
      throw error;
  }
}

export const AdjustRoleUser = async(user_id, role) => {
  const token = getToken() 

  if (!token) {
      throw new Error('No token found');
  }

  try {
    const response = await axios.post(`${API_URL}/admin/user/upgrade_user`, {
        user_id, role
    }, {
        headers: {
            "Content-Type" : "application/json",
            Accept:"application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    return response;
} catch (error) {
    if (error.response) {
        throw error.response.data;
    }
    throw new Error("Network error");
}
}