import React, { useState } from "react";
import Modal from "../Modal";
import Input from "../Input";

export default function AddProductModal({
  onConfirm,
  isOpen,
  onClose,
  isLoading,
  category,
  formData,
  setFormData,
}) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleConfirm = async () => {
    await onConfirm(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Product"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Save"}
      confirmClass="bg-green-500 hover:bg-green-700"
      width="max-w-4xl"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Kolom Pertama */}
        <div className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="category_id"
              value={formData.category_id || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-4 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select ...</option>
              {category.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Kolom Kedua */}
        <div className="space-y-4">
          <Input
            label="Stock"
            name="stock"
            type="number"
            min="1"
            value={formData.stock || ""}
            onChange={handleChange}
          />
          <Input
            label="Price"
            name="price"
            type="number"
            min="1"
            value={formData.price || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Kolom Ketiga: Description */}
      <div className="mt-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
    </Modal>
  );
}
