import React, { useState, useEffect } from "react";
import Modal from "../Modal";

export default function DeleteProductModal({
  onConfirm,
  isOpen,
  onClose,
  isLoading,
  product,
}) {
  const [localProduct, setLocalProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setLocalProduct(product);
    }
  }, [product]);

  const handleClose = () => {
    onClose();
  };

  if (!localProduct) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Product"
      onConfirm={onConfirm}
      confirmText={isLoading ? "Processing..." : "Delete"}
      confirmClass="bg-red-500 hover:bg-red-700"
    >
      Are you sure you want to delete <b>{localProduct.name}</b>? This action
      cannot be undone.
    </Modal>
  );
}
