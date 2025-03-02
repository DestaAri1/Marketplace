import { useRef, useState } from "react";
import { productUserApi } from "../services/productUser";
import { toast } from "react-toastify";

export default function useUserProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const isFetched = useRef(false);


  const handleApiCall = async (apiFunction, errorMessage) => {
    setIsLoading(true);
    try {
      const response = await apiFunction();
      return response?.data?.data;
    } catch (error) {
      toast.error(error.message || errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = () => handleApiCall(
    productUserApi.getAll,
    "Failed to fetch products"
  ).then(data => data && setProducts(data));

  const getOneProduct = (id) => handleApiCall(
    () => productUserApi.getOne(id), 
    "Failed to fetch product"
  );

  return {
    products,
    loading,
    isFetched,
    fetchProducts,
    getOneProduct,
  };
}
