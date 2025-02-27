import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { sellerRequestAPI } from "../services/adminServices"
import { showSuccessToast } from "../utils/Toast"

export default function useRequestSeller() {
    const [ users, setUsers ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ selectedStatus, setSelectedStatus ] = useState(null);
    const isFetched = useRef(false);

    // Apply filter whenever statusFilter change

    const fetchRequestUser = async() => {
        setIsLoading(true)
        try {
            const { data: { data = [] } = {} } = await sellerRequestAPI.getAll() || {}
            setUsers(data)
        } catch (error) {
            toast.error(error.message || "Failed to fetch products");
        } finally {
            setIsLoading(false);
        }
    }

    const getFilteredUsers = () => {
        return selectedStatus !== null 
            ?users.filter((u) => u.status === selectedStatus)
            : users;
    };

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
                const errorMessage = error.response?.data?.message || error.message || "Operation failed";
                toast.error(errorMessage);
                return false;
            } finally {
                setIsLoading(false);
            }
        };

    const handleAcceptRequest = async(id, userId, status) => {
        const payload = {
            user_id: parseInt(userId, 10),
            status: parseInt(status, 10),
        };
        
        const success = await handleApiCall(
            () => sellerRequestAPI.acceptRequest(
                id, payload
            ),
            "Successfully create product"
        );
        
        if (success) {
            await fetchRequestUser(); // Refresh the product list
        }
        
        return success;
    }

    const handleRejectRequest = async(id, userId, status, formData) => {
        const payload = {
            user_id: parseInt(userId, 10),
            status: parseInt(status, 10),
            reason: String(formData).trim()
        };

        const success = await handleApiCall(
            () => sellerRequestAPI.acceptRequest(id,payload)
        )

        if (success) {
            await fetchRequestUser()
        }

        return success
    }
  return {
    users : getFilteredUsers(),
    selectedStatus,
    setSelectedStatus,
    isLoading,
    isFetched,
    fetchRequestUser,
    handleAcceptRequest,
    handleRejectRequest,
  }
}
