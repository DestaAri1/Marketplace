import React, { useEffect, useState } from "react";
import Modal from "../Modal";

export default function DeleteCatModal({
  isOpen,
  onClose,
  isLoading,
  onConfirm,
  category,
}) {
  const [localCategory, setLocalCategory] = useState(null);
  const handleConfirm = () => {
    if (category?.id) {
      onConfirm(category.id);
    }
  };

  useEffect(() => {
    if (category) {
      setLocalCategory(category);
    }
  }, [category]);

  if (!localCategory) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Category"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Hapus"}
      confirmClass="bg-red-500 hover:bg-red-700"
    >
      <p>
        Are you sure you want to delete the category <b>{localCategory.name}</b>?
        This action cannot be undone.
      </p>
    </Modal>
  );
}
