import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import FormCategory from "./FormCategory";

export default function UpdateCategoryModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
  category,
  errors,
}) {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (isOpen && category) {
      setNewName(category.name);
    }
  }, [category, isOpen]);

  const handleConfirm = async () => {
    onConfirm(newName);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Category"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Update"}
      confirmClass="bg-blue-500 hover:bg-blue-700"
    >
      <FormCategory
        errors={errors}
        newName={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
    </Modal>
  );
}
