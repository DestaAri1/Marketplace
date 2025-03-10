import apiClient from "./apiClient";
import handleApiError from "./errorServiceHandler";

export const addressAPI = {
  getProvince: async () => {
    try {
      const response = await apiClient.get("/address/provinces");
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  getRegencies: async (id) => {
    try {
      const response = await apiClient.get(`/address/regencies/${id}`)
      return response
    } catch (error) {
      handleApiError(error);
    }
  },

  getDistricts: async(id) => {
    try {
        const response = await apiClient.get(`/address/districts/${id}`)
        return response
    } catch (error) {
        handleApiError(error)
    }
  },

  getVillages: async(id) => {
    try {
        const response = await apiClient.get(`/address/villages/${id}`)
        return response
    } catch (error) {
        handleApiError(error)
    }
  }
};
