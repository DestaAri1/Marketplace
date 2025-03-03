import { useRef, useState } from "react";
import { productUserApi } from "../services/productUser";
import { toast } from "react-toastify";

export default function useUserProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const isFetched = useRef(false);
  const fetchPromise = useRef(null);

  const handleApiCall = async (apiFunction, errorMessage) => {
    setIsLoading(true);
    try {
      const response = await apiFunction();
      return response?.data?.data;
    } catch (error) {
      if (!toast.isActive("connection-error")) {
        toast.error(error.message || errorMessage, {
          toastId: "connection-error",
        });
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    if (fetchPromise.current) {
      return fetchPromise.current;
    }

    fetchPromise.current = handleApiCall(
      productUserApi.getAll,
      "Failed to fetch products"
    ).then((data) => {
      if (data) setProducts(data);
      fetchPromise.current = null;
      return data;
    });

    return fetchPromise.current;
  };

  const getOneProduct = (id) =>
    handleApiCall(() => productUserApi.getOne(id), "Failed to fetch product");

  return {
    products,
    loading,
    isFetched,
    fetchProducts,
    getOneProduct,
  };
}
