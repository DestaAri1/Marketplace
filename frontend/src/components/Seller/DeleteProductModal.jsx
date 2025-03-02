import React from "react";
import Modal from "../Modal";

export default function DeleteProductModal({
  onConfirm,
  isOpen,
  onClose,
  isLoading,
  product,
}) {
  const handleConfirm = async () => {
    await onConfirm();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Product Status"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Delete"}
      confirmClass="bg-red-500 hover:bg-red-700"
    >
      Are you sure wanna delete <b>{product?.name}</b>? This action makes the
      data truly lost?
    </Modal>
  );
}
