import { useRef, useState, useCallback, useMemo } from "react";
import { cartApi } from "../services/cartServices";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
import { toast } from "react-toastify";

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false)
  const isFetched = useRef(false);

  const fetchCart = useCallback(async () => {
    if (isFetched.current) return;

    try {
      const response = await cartApi.getCart();
      setCart(response.data || []);
      isFetched.current = true;
    } catch (error) {
      console.error("[useCart] Error fetching cart:", error);
      isFetched.current = true; // Set to true even on error to prevent retries
    }
  }, []);

  const handleCreateCart = async (id, quantity) => {
    setIsLoading(true)
    const payload = {
      product_id: parseInt(id, 10),
      quantity: parseInt(quantity,10)
    };

    try {
      const response = await cartApi.createCart(payload);
      console.log(response);
      
      if (response?.data?.message) {
        toast.dismiss();
        showSuccessToast(response.data.message || "Cart has been added");
        return true;
      }
      return false
    } catch (error) {
      console.log(error);
      
      showErrorToast(error || "Failed create a cart");
      return false
    } finally {
      setIsLoading(false)
    }
  };

  // Memoize cart value to prevent unnecessary re-renders
  const memoizedCart = useMemo(() => cart, [cart]);

  return {
    cart: memoizedCart,
    isFetched,
    isLoading,
    fetchCart,
    handleCreateCart,
  };
}
