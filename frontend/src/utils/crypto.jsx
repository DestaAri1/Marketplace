import CryptoJS from "crypto-js";

// Mengambil secret key dari environment variable
const SECRET_KEY = process.env.REACT_APP_CRYPTO_SECRET_KEY;

// Memastikan secret key tersedia
if (!SECRET_KEY) {
  console.error(
    "REACT_APP_CRYPTO_SECRET_KEY is not defined in environment variables.",
    "Available env variables:",
    process.env
  );
  throw new Error("Encryption key is not configured properly.");
}

export const encryptId = (id) => {
  try {
    if (!id) return "";

    // Pastikan id adalah string
    const stringId = id.toString();

    // Enkripsi dengan secret key
    const encrypted = CryptoJS.AES.encrypt(stringId, SECRET_KEY).toString();

    // Buat URL safe dengan encoding
    const urlSafeEncrypted = encodeURIComponent(encrypted);

    return urlSafeEncrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    // Dalam kasus error, kembalikan id asli
    return id;
  }
};

export const decryptId = (encryptedId) => {
  try {
    if (!encryptedId) return "";

    // Decode URL safe string
    const decodedId = decodeURIComponent(encryptedId);

    // Dekripsi
    const bytes = CryptoJS.AES.decrypt(decodedId, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      throw new Error("Failed to decrypt ID");
    }

    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    // Dalam kasus error, kembalikan encrypted id
    return encryptedId;
  }
};
