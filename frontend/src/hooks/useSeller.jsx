import { toast } from 'react-toastify';
import { requestToBeSellerApi } from '../services/sellerServices';
import { showSuccessToast } from '../utils/Toast';
import { useState } from 'react';

export default function useSeller() {
  const [status, setStatus] = useState(null); // Changed from array to null as it seems to be an object
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchStatus = async() => {
    setIsLoading(true);
    try {
      const response = await requestToBeSellerApi.getStatus();
      setStatus(response?.data || {});
    } catch (error) {
      toast.error(error.message || "Failed to fetch status");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleApiCall = async (apiFunction, successMessage) => {
    setIsLoading(true);
    try {
      const response = await apiFunction();
      console.log("API response:", response); // Log the response
      
      if (response?.data) {
        toast.dismiss();
        const message = response.data.message || successMessage;
        console.log("Success message:", message); // Log the success message
        showSuccessToast(message);
        return true;
      }
      return false;
    } catch (error) {
      console.error("API call error:", error); // Log any errors
      const errorMessage = error.response?.data?.message || error.message || "Operation failed";
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const UpgradeSellerHook = async() => {
    const success = await handleApiCall(
      () => requestToBeSellerApi.upgrade(),
      "Successfully requesting"
    );
    
    if (success) {
      await fetchStatus();
    }
    
    return success;
  };

  return {
    isLoading,
    status,
    UpgradeSellerHook,
    fetchStatus // Added to export
  };
}