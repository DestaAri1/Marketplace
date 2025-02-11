import axios from "axios";
import { getToken } from "./TokenServices";

const API_URL = "http://localhost:3000/api"

export const UpgradeSeller = async() => {
    const token = getToken() 

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.post(`${API_URL}/seller/upgrade`, {},{
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