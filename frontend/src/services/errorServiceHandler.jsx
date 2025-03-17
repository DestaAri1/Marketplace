export const handleApiError = (error) => { 
  if (error.response.data.message !== "Validation error") {
    throw new Error(error.response.data.message || "Server error");
  } 
  throw error
};

export default handleApiError; // Pastikan export default
