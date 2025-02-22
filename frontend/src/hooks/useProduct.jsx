import { useRef, useState } from "react";
import { sellerProductsApi } from '../services/productSeller';
import { toast } from "react-toastify";
import { showSuccessToast } from "../utils/Toast";

export default function useProduct() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState(false);
    const isFetched = useRef(false);

    const handleApiCall = async (apiFunction, successMessage) => {
        setIsLoading(true);
        try {
            const response = await apiFunction();
            if (response?.data?.message) {
                toast.dismiss();
                showSuccessToast(response.data.message || successMessage);
                await fetchProducts();
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

    const fetchProducts = async (filterStatus = statusFilter) => {
        setIsLoading(true);
        try {
            const { data: { data = [] } = {} } = await sellerProductsApi.getAll() || {};
            setProducts(data.filter(product => product.status === filterStatus));
        } catch (error) {
            toast.error(error.message || "Failed to fetch products");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProduct = async (formData, status) => {
        const payload = {
            name: String(formData.name).trim(),
            stock: parseInt(formData.stock, 10),
            price: parseFloat(formData.price),
            category_id: parseInt(formData.category_id, 10),
            description: String(formData.description).trim()
        };

        return handleApiCall(
            () => sellerProductsApi.create(
                payload.name,
                payload.stock,
                payload.price,
                payload.category_id,
                status,
                payload.description
            ),
            "Successfully create product"
        );
    };

    const handleStatus = (id, status) => 
        handleApiCall(
            () => sellerProductsApi.updateStatus(id, status),
            "Successfully change status"
        );

    const handleUpdateProduct = (id, formData) => {
        const payload = {
            name: String(formData.name).trim(),
            stock: parseInt(formData.stock, 10),
            price: parseFloat(formData.price),
            category_id: parseInt(formData.category_id, 10),
            description: String(formData.description).trim()
        };

        return handleApiCall(
            () => sellerProductsApi.update(id, payload),
            "Successfully update product"
        );
    };

    const handelDeleteProduct = (id) => {
        return handleApiCall(
            ()=> sellerProductsApi.delete(id),
            "Successfully delete product"
        )
    }

    return {
        products,
        isFetched,
        isLoading,
        fetchProducts,
        statusFilter,
        setStatusFilter,
        handleCreateProduct,
        handleStatus,
        handleUpdateProduct,
        handelDeleteProduct
    };
}