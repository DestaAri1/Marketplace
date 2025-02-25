import { useRef, useState, useEffect } from "react";
import { sellerProductsApi } from '../services/productSeller';
import { toast } from "react-toastify";
import { showSuccessToast } from "../utils/Toast";

export default function useProduct() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState(true); // Default showing active products
    const [allProducts, setAllProducts] = useState([]); 
    const isFetched = useRef(false);
    
    // Apply filter whenever statusFilter changes
    useEffect(() => {
        if (allProducts.length > 0) {
            setProducts(allProducts.filter(product => product.status === statusFilter));
        }
    }, [statusFilter, allProducts]);
    
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
    
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const { data: { data = [] } = {} } = await sellerProductsApi.getAll() || {};
            setAllProducts(data);
            // Let the useEffect handle filtering
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
        
        const success = await handleApiCall(
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
        
        if (success) {
            await fetchProducts(); // Refresh the product list
        }
        
        return success;
    };
    
    const handleStatus = async (id, newStatus) => {
        const success = await handleApiCall(
            () => sellerProductsApi.updateStatus(id, newStatus),
            "Successfully change status"
        );
        
        if (success) {
            // Update the local state immediately
            setAllProducts(prevProducts => 
                prevProducts.map(product => 
                    product.id === id ? { ...product, status: newStatus } : product
                )
            );
        }
        
        return success;
    };
    
    const handleUpdateProduct = async (id, formData) => {
        const payload = {
            name: String(formData.name).trim(),
            stock: parseInt(formData.stock, 10),
            price: parseFloat(formData.price),
            category_id: parseInt(formData.category_id, 10),
            description: String(formData.description).trim()
        };
        
        const success = await handleApiCall(
            () => sellerProductsApi.update(id, payload),
            "Successfully update product"
        );
        
        if (success) {
            await fetchProducts(); // Refresh products after update
        }
        
        return success;
    };
    
    const handelDeleteProduct = async (id) => {
        const success = await handleApiCall(
            () => sellerProductsApi.delete(id),
            "Successfully delete product"
        );
        
        if (success) {
            await fetchProducts(); // Refresh products after delete
        }
        
        return success;
    };
    
    return {
        products,
        allProducts,
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