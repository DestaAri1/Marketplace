import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import { toast } from "react-toastify";

export default function UpdateProductModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
  product,
  category,
}) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (product?.id) {
            // Ensure we're setting all required fields
            setData({
                name: product.name || '',
                stock: product.stock || 0,
                price: product.price || 0,
                category_id: product.category_id || '',
                description: product.description || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleConfirm = async () => {
        // Validate data before submitting
        if (!data.name || !data.stock || !data.price || !data.category_id) {
            toast.error("Please fill in all required fields");
            return;
        }
        await onConfirm(data);
    };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Product"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Save"}
      confirmClass="bg-green-500 hover:bg-green-700"
      width="max-w-4xl"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={data.name || ""}
            onChange={handleChange}
          />
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
                name="category_id"
                value={data.category_id || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-4 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
            <option value="" disabled>
                Select Category
            </option>
            {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                {cat.name}
                </option>
            ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Stock"
            name="stock"
            type="number"
            min="1"
            value={data.stock || ""}
            onChange={handleChange}
          />
          <Input
            label="Price"
            name="price"
            type="number"
            min="1"
            value={data.price || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={data.description || ""}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
    </Modal>
  );
}
