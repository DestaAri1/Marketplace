import React, { useState } from "react";
import Modal from "../Modal";
import FormCategory from "./FormCategory";

export default function AddCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  errors = {},
}) {
  const [newName, setNewName] = useState("");
  const handleConfirm = () => {
    onConfirm(newName);
    setNewName("");
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Category"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Save"}
      confirmClass="bg-green-500 hover:bg-green-700"
    >
      <FormCategory
        newName={newName}
        onChange={(e) => setNewName(e.target.value)}
        errors={errors}
      />
    </Modal>
  );
}
