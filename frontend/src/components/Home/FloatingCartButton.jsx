import React from "react";
import { ShoppingCart } from "lucide-react";

const FloatingCartButton = ({ onClick, disabled=false }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
    >
      <ShoppingCart size={24} />
    </button>
  );
};

export default FloatingCartButton;
