import { useRef, useState } from "react";
import useAdmin from "./useAdmin";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
import { toast } from "react-toastify";

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
        console.error('Error changing user role:', error);
        showErrorToast("Failed to change user role");
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
  
    return {
      users: getFilteredUsers(),
      selectedRole,
      setSelectedRole,
      fetchUsers,
      handleRoleUpdate,
      isLoading,
      isFetched
    };
  };