import React, { useState, useEffect } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { encryptId } from "../../utils/crypto";
import { createImageUrl } from "../../utils/ImageUrlHelper";

export default function CartModal({
  isOpen,
  onClose,
  user,
  cart,
  onDeleteItem,
  onConfirm,
  isLoading,
  refreshCart, // Add this prop
}) {
  // Local state to track quantities and selected items
  const [localQuantities, setLocalQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Handle modal opening and closing animations
  useEffect(() => {
    if (isOpen) {
      // When modal opens, refresh cart data
      if (user) {
        refreshCart();
      }

      // First render the component
      setIsRendered(true);
      // Then after a small delay, start the animation
      setTimeout(() => {
        setIsAnimating(true);
      }, 10); // Small delay to ensure DOM is ready
    } else {
      // First start closing animation
      setIsAnimating(false);
      // Then after animation completes, unmount component
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300); // Match duration with CSS transition
      return () => clearTimeout(timer);
    }
  }, [isOpen, user, refreshCart]);

  // Reset local quantities when cart changes
  useEffect(() => {
    const quantities = {};
    const selected = {};
    cart?.forEach((item) => {
      quantities[item.id] = item.quantity;
      selected[item.id] = false; // Initialize all items as unselected
    });
    setLocalQuantities(quantities);
    setSelectedItems(selected);
  }, [cart]);

  const calculateItemTotal = (item) => {
    const quantity = localQuantities[item.id] || item.quantity;
    return item.product_price * quantity;
  };

  const calculateTotal = () => {
    return (
      cart?.reduce((total, item) => {
        // Only include selected items in total
        if (selectedItems[item.id]) {
          return total + calculateItemTotal(item);
        }
        return total;
      }, 0) || 0
    );
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    setLocalQuantities((prev) => ({
      ...prev,
      [item.id]: newQuantity,
    }));
  };

  const handleItemSelect = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const isAnyItemSelected = () => {
    return Object.values(selectedItems).some((selected) => selected);
  };

  const handleDeleteItem = async (itemId) => {
    await onDeleteItem(itemId);
    // No need to manually update state as the parent will refresh the cart
  };

  const handleConfirm = () => {
    const checkoutData = cart
      ?.filter((item) => selectedItems[item.id])
      .map((item) => ({
        id: item.id,
        name: item.product_name,
        quantity: localQuantities[item.id] || item.quantity,
        price: item.product_price,
        image: item.product_image || null,
        total: calculateItemTotal(item),
      }));

    // Encrypt the entire checkout data
    const encryptedData = encryptId(JSON.stringify(checkoutData));

    // Save encrypted data to localStorage
    localStorage.setItem("checkoutData", encryptedData);
    navigate("/check-out");
  };

  // If not rendered at all, don't return anything
  if (!isRendered) {
    return null;
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-50 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 transform ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {!user ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="mb-5">Please login first</p>
                <Link
                  className="text-blue-500 border-2 rounded-md px-4 py-1 bg-gray-200 hover:bg-gray-300 hover:text-blue-700"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Loading cart items...</p>
              </div>
            </div>
          ) : cart?.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {cart?.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg border p-4 shadow-sm"
                    >
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedItems[item.id] || false}
                            onChange={() => handleItemSelect(item.id)}
                            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                        </div>
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={createImageUrl(
                              process.env.REACT_APP_PRODUCT_URL,
                              item?.product_image
                            )}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {item.product_name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                ${item.product_price.toFixed(2)} per item
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-full"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item,
                                    (localQuantities[item.id] ||
                                      item.quantity) - 1
                                  )
                                }
                                className="p-1 rounded-md hover:bg-gray-100 border"
                                disabled={!selectedItems[item.id]}
                              >
                                <Minus size={16} />
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={
                                  localQuantities[item.id] || item.quantity
                                }
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item,
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                disabled={!selectedItems[item.id]}
                                className="w-16 text-center border rounded-md py-1 px-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                              />
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item,
                                    (localQuantities[item.id] ||
                                      item.quantity) + 1
                                  )
                                }
                                className="p-1 rounded-md hover:bg-gray-100 border"
                                disabled={!selectedItems[item.id]}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <p className="font-medium text-blue-600">
                              ${calculateItemTotal(item).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold text-blue-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleConfirm}
                  disabled={!isAnyItemSelected() || isLoading}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    isAnyItemSelected() && !isLoading
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
