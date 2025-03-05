import apiClient from "./apiClient";
import handleApiError from "./errorServiceHandler";

export const cartApi = {
    getCart: async () => {
        try {
            const response = await apiClient.get('/cart');
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    createCart: async(payload) => {
        try {
            const response = await apiClient.post('/cart', payload)
            return response
        } catch (error) {
            handleApiError(error)
        }
    }
}
