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
        showSuccessToast(response.data.message || "Cart has been added");
        // Refresh cart after adding
        await fetchCart();
        return true;
      }
      return false;
    } catch (error) {
      showErrorToast(error || "Failed create a cart");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCart = async (cartId) => {
    setIsLoading(true);
    try {
      const response = await cartApi.deleteCart(cartId);
      if (response?.data?.message) {
        toast.dismiss();
        showSuccessToast(response.data.message || "Item removed from cart");
        // Update cart state by removing the deleted item
        setCart((prevCart) => prevCart.filter((item) => item.id !== cartId));
        return true;
      }
      return false;
    } catch (error) {
      showErrorToast(error || "Failed to remove item from cart");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Add update cart function
  const handleUpdateCart = async (cartItems) => {
    setIsLoading(true);
    try {
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
      showErrorToast(error || "Failed to update cart");
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