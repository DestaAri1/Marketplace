export const handleApiError = (error) => {
    if (error.response) {
      throw new Error(error.response.data.message || "Server error");
    } else if (error.request) {
      if (error.code === "ECONNABORTED") {
        throw new Error("Request timed out - please try again");
      }
      throw new Error("Network error - please check your connection");
    }
    throw new Error("Error processing request");
};
  
export default handleApiError; // Pastikan export default
  