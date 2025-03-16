import apiClient from "./apiClient";
import handleApiError from "./errorServiceHandler";

export const regionalAddressAPI = {
  getProvince: async () => {
    try {
      const response = await apiClient.get("/regional-address/provinces");
      return response;
    } catch (error) {
      throw error; // Directly throw to propagate
    }
  },

  getRegencies: async (id) => {
    try {
      const response = await apiClient.get(`/regional-address/regencies/${id}`);
      return response;
    } catch (error) {
      throw error; // Directly throw to propagate
    }
  },

  getDistricts: async (id) => {
    try {
      const response = await apiClient.get(`/regional-address/districts/${id}`);
      return response;
    } catch (error) {
      throw error; // Directly throw to propagate
    }
  },

  getVillages: async (id) => {
    try {
      const response = await apiClient.get(`/regional-address/villages/${id}`);
      return response;
    } catch (error) {
      throw error; // Directly throw to propagate
    }
  },
};

export const addressAPI = {
  getAddress: async () => {
    try {
      const response = await apiClient.get("/address");
      return response;
    } catch (error) {
      throw error;
    }
  },

  create: async (payload) => {
    try {
      const response = await apiClient.post("/address", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async(id, payload) => {
    try {
      const response = await apiClient.patch(`/address/${id}`, payload)
      return response
    } catch (error) {
      throw error
    }
  },

  delete: async(id) => {
    try {
      const response = await apiClient.delete(`/address/${id}`)
      return response
    } catch (error) {
      handleApiError(error)
    }
  }
};
