import apiClient from "./apiClient";
import handleApiError from "./errorServiceHandler";

export const regionalAddressAPI = {
  getProvince: async () => {
    try {
      const response = await apiClient.get("/regional-address/provinces");
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  getRegencies: async (id) => {
    try {
      const response = await apiClient.get(`/regional-address/regencies/${id}`)
      return response
    } catch (error) {
      handleApiError(error);
    }
  },

  getDistricts: async(id) => {
    try {
        const response = await apiClient.get(`/regional-address/districts/${id}`)
        return response
    } catch (error) {
        handleApiError(error)
    }
  },

  getVillages: async(id) => {
    try {
        const response = await apiClient.get(`/regional-address/villages/${id}`)
        return response
    } catch (error) {
        handleApiError(error)
    }
  }
};

export const addressAPI = {
  getAddress: async() => {
    try {
      const response = await apiClient.get("/address")
      return response
    } catch (error) {
      handleApiError(error)
    }
  }
}
