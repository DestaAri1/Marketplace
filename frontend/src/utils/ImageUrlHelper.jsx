// Utility function to create safe image URL
export const createImageUrl = (baseUrl, imagePath) => {
  // If no image path, return default
  if (!imagePath) return "/default-profile.jpg";

  // Remove leading slash from imagePath if it exists
  const cleanImagePath = imagePath.startsWith("/")
    ? imagePath.slice(1)
    : imagePath;

  // Ensure baseUrl ends with a slash
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

  return `${cleanBaseUrl}${cleanImagePath}`;
};
