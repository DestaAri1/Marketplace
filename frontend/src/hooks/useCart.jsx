import { useRef, useState, useCallback, useMemo } from "react";
import { cartApi } from "../services/cartServices";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
import { toast } from "react-toastify";

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFetched = useRef(false);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await cartApi.getCart();
      setCart(response.data || []);
      isFetched.current = true;
      return response.data;
    } catch (error) {
      console.error("[useCart] Error fetching cart:", error);
      isFetched.current = true;
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateCart = async (id, quantity) => {
    setIsLoading(true);
    const payload = {
      product_id: parseInt(id, 10),
      quantity: parseInt(quantity, 10),
    };

    try {
      const response = await cartApi.createCart(payload);
      if (response?.data?.message) {
        toast.dismiss();
        showSuccessToast(response?.data?.message || "Cart has been added");

        const newItem = {
          id: response.data.id || Date.now(), // Use returned ID or temporary one
          product_id: payload.product_id,
          product_name: "Loading...", // Will be replaced after fetch
          product_price: 0,
          quantity: payload.quantity,
        };

        setCart((prevCart) => [...prevCart, newItem]);

        // Then fetch the updated cart to get complete data
        await fetchCart();
        return true;
      }
      return false;
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred";
      showErrorToast(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCart = async (cartId) => {
    setIsLoading(true);
    try {
      // Optimistic UI update - remove item immediately
      setCart((prevCart) => prevCart.filter((item) => item.id !== cartId));

      const response = await cartApi.deleteCart(cartId);
      if (response?.data?.message) {
        toast.dismiss();
        showSuccessToast(response.data.message || "Item removed from cart");
        return true;
      }

      // If deletion failed, revert by fetching the cart again
      if (!response?.data?.message) {
        await fetchCart();
      }

      return false;
    } catch (error) {
      // If error, revert by fetching the cart again
      await fetchCart();

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      showErrorToast(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCart = async (cartItems) => {
    setIsLoading(true);
    try {
      // Optionally, you can update the UI optimistically here
      // by matching and updating relevant cart items

      const response = await cartApi.updateCart(cartItems);
      if (response?.data?.message) {
        toast.dismiss();
        showSuccessToast(response.data.message || "Cart has been updated");
        // Refresh cart after updating
        await fetchCart();
        return true;
      }
      return false;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      showErrorToast(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
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
    handleDeleteCart,
    handleUpdateCart,
  };
}
