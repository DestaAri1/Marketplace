import React, { useState } from 'react'
import Modal from '../Modal';
import Input from '../Input';

export default function AddProductModal({
  onConfirm,
  isOpen,
  onClose,
  isLoading,
  category,
  formData,
  setFormData
}) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Keep all values as strings in the form
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name field is required';
    }
    
    if (!formData.stock || parseInt(formData.stock) <= 0) {
      newErrors.stock = 'Stock must be greater than 0';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.category_id) {
      newErrors.category_id = 'Category is required';
    }
    
    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    if (validateForm()) {
      await onConfirm(formData);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Product"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Save"}
      confirmClass="bg-green-500 hover:bg-green-700"
    >
      <div className="space-y-4">
        <div>
          <Input
            label="Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            classes={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <Input
            label="Stock"
            name="stock"
            type="number"
            min="1"
            value={formData.stock || ""}
            onChange={handleChange}
            classes={errors.stock ? 'border-red-500' : ''}
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
          )}
        </div>

        <div>
          <Input
            label="Price"
            name="price"
            type="number"
            min="1"
            value={formData.price || ""}
            onChange={handleChange}
            classes={errors.price ? 'border-red-500' : ''}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category_id"
            value={formData.category_id || ""}
            onChange={handleChange}
            className={`w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.category_id ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select ...</option>
            {category.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
          )}
        </div>

        <div>
          <Input
            label="Description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            classes={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}