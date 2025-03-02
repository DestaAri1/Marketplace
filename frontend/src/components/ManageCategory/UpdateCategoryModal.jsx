import React, { useState, useEffect } from "react";
import Modal from "../Modal";

export default function UpdateCategoryModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
  category,
}) {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (category?.name) {
      setNewName(category.name);
    }
  }, [category]);

  const handleConfirm = async () => {
    try {
      setError("");
      if (!newName || newName.trim() === "") {
        setError("Category name is required");
        return;
      }
      await onConfirm(newName.trim());
      onClose();
    } catch (error) {
      setError(error.message);
    }
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
      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter category name"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </Modal>
  );
}
