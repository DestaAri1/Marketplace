import { toast } from "react-toastify";
import { requestToBeSellerApi } from "../services/sellerServices";
import { showSuccessToast } from "../utils/Toast";
import { useState, useCallback } from "react";

export default function useSeller() {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await requestToBeSellerApi.getStatus();
      setStatus(response?.data || {});
      return response?.data;
    } catch (error) {
      toast.error(error.message || "Failed to fetch status");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const UpgradeSellerHook = async () => {
    setIsLoading(true);
    try {
      const response = await requestToBeSellerApi.upgrade();

      if (response?.data) {
        const message = response.data.message || "Successfully requesting";
        showSuccessToast(message);

        // Update status dari response
        setStatus(response.data.status || {});

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

  return {
    isLoading,
    status,
    setStatus,
    UpgradeSellerHook,
    fetchStatus,
  };
}
