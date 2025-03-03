import apiClient from "./apiClient";

export const productUserApi = {
  getAll: async () => {
    try {
      const response = await apiClient.get("/product");
      return response;
    } catch (error) {
      throw error;
    }
  },

  getOne: async (id) => {
    try {
      const response = await apiClient.get(`/product/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
