import { useRef, useState } from "react";
import useAdmin from "./useAdmin";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
import { toast } from "react-toastify";
import { DeleteUserByAdmin } from "../services/adminServices";

export const useUserManagement = () => {
    const [users, setUsers] = useState([]);
    const { GetAllUserHook, AdjustRoleUserHook } = useAdmin();
    const isFetched = useRef(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await GetAllUserHook();
        const filteredUsers = fetchedUsers.filter(user => !user.reason);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    const handleRoleUpdate = async (userId, newRole) => {
      setIsLoading(true);
      try {
        const response = await AdjustRoleUserHook(userId, newRole);
        
        if (response?.data?.message) {
          // Ensure we clear any existing toasts before showing new one
          toast.dismiss();
          showSuccessToast("Successfully adjust user role");
          await fetchUsers();
          return true;
        }
        return false;
      } catch (error) {
        showErrorToast(error.message);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
  
    const getFilteredUsers = () => {
      return selectedRole !== null 
        ? users.filter((u) => u.role === selectedRole)
        : users;
    };

    const handleDeleteUser = async(userId) => {
      setIsLoading(true);
      try {
        const response = await DeleteUserByAdmin(userId);
        
        if (response?.data?.message) {
          // Ensure we clear any existing toasts before showing new one
          toast.dismiss();
          showSuccessToast(response.data.message);
          await fetchUsers();
          return true;
        }
        return false;
      } catch (error) {
        showErrorToast(error.message);
        return false;
      } finally {
        setIsLoading(false);
      }
    }
  
    return {
      users: getFilteredUsers(),
      selectedRole,
      setSelectedRole,
      fetchUsers,
      handleRoleUpdate,
      isLoading,
      isFetched,
      handleDeleteUser
    };
  };