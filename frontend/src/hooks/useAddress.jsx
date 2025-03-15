import { useCallback, useRef, useState } from "react";
import { addressAPI } from "../services/addressServices";
import { toast } from "react-toastify";
import { showSuccessToast } from "../utils/Toast";

export default function useAddress() {
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      console.error("[useCart] Error fetching cart:", error);
      isFetched.current = true;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleApiCall = async (apiFunction, successMessage) => {
    setIsLoading(true);
    try {
      const response = await apiFunction();
      if (response?.data?.message) {
        toast.dismiss();
        showSuccessToast(response.data.message || successMessage);
        return true;
      }
      return false;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Operation failed";
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

const handleCreateAddress = async (formData) => {
  // Pastikan status adalah pointer ke boolean dalam format Go
  // Di JavaScript kita tidak bisa membuat pointer, tapi kita bisa mengirim nilai langsung
  const status = Boolean(formData.status);

  const payload = {
    sender: String(formData.sender).trim(),
    recipient: String(formData.receiver).trim(),
    province: String(formData.province).trim(),
    regency: String(formData.regency).trim(),
    district: String(formData.district).trim(),
    village: String(formData.village).trim(),
    details: String(formData.description).trim(),
    status: status,
  };

  // Validasi sesuai dengan aturan Go
  if (payload.province.length !== 2 || !/^\d+$/.test(payload.province)) {
    toast.error("Province must be exactly 2 numeric characters");
    return false;
  }

  if (payload.regency.length !== 4 || !/^\d+$/.test(payload.regency)) {
    toast.error("Regency must be exactly 4 numeric characters");
    return false;
  }

  if (payload.district.length !== 7 || !/^\d+$/.test(payload.district)) {
    toast.error("District must be exactly 7 numeric characters");
    return false;
  }

  if (payload.village.length !== 10 || !/^\d+$/.test(payload.village)) {
    toast.error("Village must be exactly 10 numeric characters");
    return false;
  }

  if (payload.details.length < 5) {
    toast.error("Details must be at least 5 characters");
    return false;
  }

  console.log("Validated payload:", payload);

  // Kirim sebagai satu objek JSON
  const success = await handleApiCall(() => {
    return addressAPI.create(payload);
  });

  if (success) {
    await fetchAddress();
  }

  return success;
};
  return {
    address,
    isFetched,
    isLoading,
    fetchAddress,
    handleCreateAddress,
  };
}
