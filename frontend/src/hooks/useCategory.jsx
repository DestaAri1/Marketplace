import { useRef, useState } from 'react';
import { categoryApi } from '../services/categoryServices';
import { showErrorToast, showSuccessToast } from '../utils/Toast';
import { toast } from 'react-toastify';

export default function useCategory() {
    const [category, setCategory] = useState([]);
    const isFetched = useRef(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategory = async() => {
        try {
            const fetchedCategory = await categoryApi.getAll();
            setCategory(fetchedCategory.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleCreateCategory = async(name) => {
        setIsLoading(true)
        try {
            const response = await categoryApi.create(name)
            if (response?.data?.message) {
                toast.dismiss();
                showSuccessToast( response.data.message || "Successfully create category");
                await fetchCategory();
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

    const handleCategoryUpdate = async(id, name) => {
        setIsLoading(true);
        try {
            const response = await categoryApi.update(id, name);
            if (response?.data?.message) {
                toast.dismiss();
                showSuccessToast("Successfully updated category");
                await fetchCategory();
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

    const handleDeleteCategory = async(id) => {
        setIsLoading(true);
        try {
            const response = await categoryApi.delete(id);
            if (response?.data?.message) {
                toast.dismiss();
                showSuccessToast( response.data.message || "Successfully delete category");
                await fetchCategory();
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
        isLoading,
        category,
        fetchCategory,
        isFetched,
        handleCreateCategory,
        handleCategoryUpdate,
        handleDeleteCategory
    };
}