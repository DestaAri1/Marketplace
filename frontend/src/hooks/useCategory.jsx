import { useRef, useState } from "react";
import { categoryApi } from "../services/categoryServices";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
import { toast } from "react-toastify";

export default function useCategory() {
  const [category, setCategory] = useState([]);
  const [errors, setErrors] = useState([]);
  const isFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategory = async () => {
    try {
      const fetchedCategory = await categoryApi.getAll();
      setCategory(fetchedCategory.data.data);
    } catch (error) {
      showErrorToast(error)
    }
  };

  const handleApiCall = async (apiFunction, successMessage) => {
    setIsLoading(true);
    setErrors({});
    try {
      const response = await apiFunction();
      if (response?.data?.message) {
        showSuccessToast(response.data.message || successMessage);
        await fetchCategory();
        return true;
      }
      return false;
    } catch (error) {
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

  const handleCreateCategory = async (name) => {
    const success = handleApiCall(
      () => categoryApi.create(name),
      "sukses lurd"
    );

    if (success) {
      await fetchCategory();
    }

    return success;
  };

  const handleCategoryUpdate = async (id, name) => {
    const success = handleApiCall(
      () => categoryApi.update(id,name),
      "sukses lurd"
    );

    if (success) {
      await fetchCategory();
    }

    return success;
  };

  const handleDeleteCategory = async (id) => {
    const success = handleApiCall(() => categoryApi.delete(id), "muehehehe")

    if (success) {
      await fetchCategory()
    }

    return success
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    isLoading,
    category,
    fetchCategory,
    isFetched,
    handleCreateCategory,
    handleCategoryUpdate,
    handleDeleteCategory,
    errors,
    clearErrors,
  };
}
