import apiClient from "./apiClient";
import handleApiError from "./errorServiceHandler";

// API functions
export const categoryApi = {
  // Get all categories
  getAll: async () => {
    try {
      const response = await apiClient.get("/category");
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  create: async (name) => {
    if (!name?.trim()) {
      throw new Error("Category name is required");
    }
    try {
      const response = await apiClient.post(`/category`, {
        name: name.trim(),
      });
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update category
  update: async (id, name) => {
    if (!name?.trim()) {
      throw new Error("Category name is required");
    }

    try {
      const response = await apiClient.patch(`/category/update/${id}`, {
        name: name.trim(),
      });
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/category/${id}`);
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },
};
