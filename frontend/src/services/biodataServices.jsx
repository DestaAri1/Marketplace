import apiClient from "./apiClient";
import handleApiError from "./errorServiceHandler";

export const biodataAPI = {
  updateBio: async (id, payload) => {
    try {
      // Create a custom config for this specific request instead of modifying the global interceptor
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Use the config in this specific request
      const response = await apiClient.patch(`/biodata/${id}`, payload, config);
      return response;
    } catch (error) {
        console.log(error);
        
      handleApiError(error);
    }
  },
};
