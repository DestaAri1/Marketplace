import { useState } from "react";
import { biodataAPI } from "../services/biodataServices";
import { showSuccessToast } from "../utils/Toast";
import useAuth from "./useAuth";

export default function useBiodata() {
  const { fetchUser, setUser } = useAuth(); // Pastikan setUser diekspos dari useAuth
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateBiodata = async (id, formData) => {
    setIsLoading(true);

    // Create FormData object for file upload
    const payload = new FormData();

    // Add all form data to payload
    if (formData.username) payload.append("username", formData.username);
    if (formData.email) payload.append("email", formData.email);
    if (formData.birthday) payload.append("birthday", formData.birthday);
    if (formData.phone_number)
      payload.append("phoneNumber", formData.phone_number);

    if (formData.gender) {
      const genderValue =
        typeof formData.gender === "string"
          ? formData.gender === "Laki-Laki"
            ? 1
            : 2
          : formData.gender;
      payload.append("gender", genderValue);
    }

    if (formData.profile_image && formData.profile_image instanceof File) {
      payload.append("image", formData.profile_image);
    }

    try {
      const response = await biodataAPI.updateBio(id, payload);
      console.log(response);
      

      if (response?.data?.message) {
        // Dapatkan data user terbaru
        const updatedUser = await fetchUser(true);

        if (updatedUser) {
          // Manual update untuk memastikan perubahan terlihat segera
          setUser((prevUser) => {
            // Buat salinan user baru dengan data yang diperbarui
            return {
              ...prevUser,
              username: formData.username || prevUser.username,
              biodata: {
                ...prevUser.biodata,
                birthday: formData.birthday || prevUser.biodata?.birthday,
                phone_number:
                  formData.phone_number || prevUser.biodata?.phone_number,
                gender: formData.gender || prevUser.biodata?.gender,
                // Jika ada file image baru, gunakan URL sementara
                image: formData.profile_image
                  ? prevUser.biodata?.image || "" // Tetap gunakan yang lama sampai refresh
                  : prevUser.biodata?.image,
              },
            };
          });
        }

        showSuccessToast(
          response.data?.message || "Biodata updated successfully"
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating biodata:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpdateBiodata,
    isLoading,
  };
}
