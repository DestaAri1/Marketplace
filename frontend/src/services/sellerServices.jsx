import apiClient from "./apiClient";
import handleApiError from "./errorServiceHandler";

export const requestToBeSellerApi = {
  upgrade: async () => {
    try {
      const response = await apiClient.post("/user/upgrade", {});
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  getStatus: async () => {
    try {
      const response = await apiClient.get("/user/upgrade/status");
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },
};
