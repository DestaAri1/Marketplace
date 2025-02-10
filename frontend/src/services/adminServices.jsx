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