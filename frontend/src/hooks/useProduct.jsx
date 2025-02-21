import { useRef, useState } from "react";
import { sellerProductsApi } from '../services/productSeller';
import { toast } from "react-toastify";
import { showSuccessToast } from "../utils/Toast";

export default function useProduct() {
    const [products, setProducts] = useState([]);
    const isFetched = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState(false);

    const fetchProducts = async (filterStatus = statusFilter) => {
        setIsLoading(true);
        try {
            const fetchedProducts = await sellerProductsApi.getAll();
            const productsData = fetchedProducts?.data?.data || [];
            const filteredProducts = productsData.filter(product => product.status === filterStatus);
            setProducts(filteredProducts);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error(error.message || "Failed to fetch products");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProduct = async (formData) => {
        setIsLoading(true);
        try {
            // Log data before processing
            console.log('Raw form data:', formData);

            // Ensure proper type conversion
            const name = String(formData.name).trim();
            const stock = parseInt(formData.stock, 10);
            const price = parseFloat(formData.price);
            const category_id = parseInt(formData.category_id, 10);
            const description = String(formData.description).trim();

            // Log processed data
            console.log('Processed data:', {
                name,
                stock,
                price,
                category_id,
                description
            });

            // Call API
            const response = await sellerProductsApi.create(
                name,
                stock,
                price,
                category_id,
                false, // status
                description
            );

            if (response?.data?.message) {
                toast.dismiss();
                showSuccessToast(response.data.message || "Successfully create product");
                await fetchProducts();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error creating product:", error);
            // Show more detailed error message
            const errorMessage = error.response?.data?.message || error.message || "Failed to create product";
            toast.error(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        products,
        isFetched,
        isLoading,
        fetchProducts,
        statusFilter,
        setStatusFilter,
        handleCreateProduct
    };
}