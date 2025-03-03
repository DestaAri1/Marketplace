// Fungsi untuk mengecek environment variables yang tersedia
export const checkEnvVariables = () => {
  console.log("Checking environment variables...");

  const envVars = {
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
    REACT_APP_CRYPTO_SECRET_KEY: process.env.REACT_APP_CRYPTO_SECRET_KEY
      ? "[TERSEDIA]"
      : "[TIDAK TERSEDIA]",
  };

  console.table(envVars);

  return envVars;
};
