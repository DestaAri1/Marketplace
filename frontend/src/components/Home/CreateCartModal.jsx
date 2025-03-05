import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { Minus, Plus, ShoppingCart } from "lucide-react";

export default function CreateCartModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  product,
}) {
  const [quantity, setQuantity] = useState(1);
  const [localProduct, setLocalProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setLocalProduct(product);
    }
  }, [product]);

  const handleConfirm = async () => {
    if (localProduct) {
      await onConfirm(quantity);
    }
  };

  const incrementQuantity = () => {
    if (quantity < localProduct?.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= localProduct?.stock) {
      setQuantity(value);
    }
  };

  const price = localProduct?.discountPrice || localProduct?.price || 0;
  const total = price * quantity;

  const handleClose = () => {
    onClose();
    // Delay resetting states until after animation
    setTimeout(() => {
      setQuantity(1);
    }, 300); // Adjust timeout based on your modal animation duration
  };

  if (!localProduct) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <div className="flex items-center gap-2 text-indigo-600">
          <ShoppingCart className="w-6 h-6" />
          <span>Add to Cart</span>
        </div>
      }
      confirmText={isLoading ? "Processing..." : "Add to Cart"}
      confirmClass="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
      onConfirm={handleConfirm}
    >
      <div className="p-6">
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={localProduct.image}
              alt={localProduct.product}
              className="w-full h-full object-cover"
            />
            {localProduct.discountPrice && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {Math.round(
                  ((localProduct.price - localProduct.discountPrice) /
                    localProduct.price) *
                    100
                )}
                % OFF
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">
              {localProduct.product}
            </h3>
            <p className="text-gray-500 mt-1">Store: {localProduct.seller}</p>
            <p className="text-gray-500">Stock: {localProduct.stock} items</p>

            <div className="mt-3">
              {localProduct.discountPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through">
                    ${localProduct.price}
                  </span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ${localProduct.discountPrice}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-indigo-600">
                  ${localProduct.price}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mt-6 border-t border-b border-gray-100 py-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-indigo-500 hover:text-indigo-500 disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:text-gray-400 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="1"
                max={localProduct.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={incrementQuantity}
                disabled={quantity >= localProduct.stock}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-indigo-500 hover:text-indigo-500 disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:text-gray-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Total</span>
            <span className="text-2xl font-bold text-indigo-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
