import { useCallback, useRef, useState } from "react";
import { addressAPI } from "../services/addressServices";
import { toast } from "react-toastify";
import { showSuccessToast } from "../utils/Toast";

export default function useAddress() {
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isFetched = useRef(false);

  const fetchAddress = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        data: { data = [] },
      } = await addressAPI.getAddress();
      setAddress(data || []);
      isFetched.current = true;
    } catch (error) {
      console.error("[useAddress] Error fetching addresses:", error);
      isFetched.current = true;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleApiCall = async (apiFunction, successMessage) => {
    setIsLoading(true);
    setErrors({});
    try {
      const response = await apiFunction();
      if (response?.data?.message) {
        showSuccessToast(successMessage);
        await fetchAddress();
        return true;
      }
      return false;
    } catch (error) {
      // console.log(error);
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        return error.response;
      } else {
        const errorMessage =
          error.response?.data?.message || error.message || "Operation failed";
        toast.error(errorMessage);
      }

      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAddress = async (formData) => {
    const status = Boolean(formData.status);
    const payload = {
      sender: String(formData.sender || "").trim(),
      recipient: String(formData.receiver || "").trim(),
      province: String(formData.province || "").trim(),
      regency: String(formData.regency || "").trim(),
      district: String(formData.district || "").trim(),
      village: String(formData.village || "").trim(),
      details: String(formData.description || "").trim(),
      status: status,
    };

    const success = await handleApiCall(
      () => addressAPI.create(payload),
      "sukses lurd"
    );

    if (success) {
      await fetchAddress();
    }

    return success;
  };

  const handleUpdateAddress = async (id, formData) => {
    const status = Boolean(formData.status);
    const payload = {
      sender: String(formData.sender || "").trim(),
      recipient: String(formData.receiver || "").trim(),
      province: String(formData.province || "").trim(),
      regency: String(formData.regency || "").trim(),
      district: String(formData.district || "").trim(),
      village: String(formData.village || "").trim(),
      details: String(formData.description || "").trim(),
      status: status,
    };

    const success = await handleApiCall(
      () => addressAPI.update(id, payload),
      "apdet suksek lur"
    );

    if (success) {
      await fetchAddress();
    }

    return success;
  };

const handleStatusAddress = async (id, status) => {
  // Cari alamat berdasarkan ID
  const selectedAddress = address.find((addr) => addr.id === id);

  if (!selectedAddress) {
    toast.error("Address not found!");
    return false;
  }

  const success = await handleApiCall(
    () => addressAPI.upStatus(id, status),
    `Successfully set ${selectedAddress.sender} as main address` // Menggunakan nama alamat
  );

  if (success) {
    await fetchAddress();
  }

  return success;
};

  const handleDeleteAddress = async (id) => {
    const success = await handleApiCall(
      () => addressAPI.delete(id),
      "hapus gagal lurdd"
    );

    if (success) {
      await fetchAddress();
    }

    return success;
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    address,
    isFetched,
    isLoading,
    errors,
    clearErrors,
    fetchAddress,
    handleCreateAddress,
    handleUpdateAddress,
    handleStatusAddress,
    handleDeleteAddress,
  };
}
