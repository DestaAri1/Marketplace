import apiClient from "./apiClient";
import handleApiError from "./errorServiceHandler";

export const sellerProductsApi = {
  getAll: async () => {
    try {
      const response = await apiClient.get("/seller/product");
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  getOne: async (id) => {
    try {
      const response = await apiClient.get(`/seller/product/${id}`);
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  create: async (name, stock, price, category_id, status, description) => {
    try {
      const response = await apiClient.post("/seller/product", {
        name,
        stock,
        price,
        category_id,
        status,
        description,
      });

      return response;
    } catch (error) {
      // Log the full error response
      console.error("API Error Response:", error.response?.data);
      handleApiError(error);
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(
        `/seller/product/update/status/${id}`,
        {
          status,
        }
      );
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (id, payload) => {
    try {
      const response = await apiClient.patch(
        `/seller/product/update/${id}`,
        payload
      );
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/seller/product/${id}`);
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },
};
