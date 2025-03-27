import React from "react";
import Input from "../../Input";

export default function FormProduct({
  handleChange,
  triggerFileInput,
  previewImage,
  setPreviewImage,
  formData,
  setFormData,
  handleImageChange,
  category
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Image Upload Column */}
      <div className="col-span-1 flex flex-col items-center">
        <input
          type="file"
          id="product-image-input"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <div
          className="w-full h-64 border-2 border-dashed border-gray-300 flex items-center justify-center relative"
          onClick={triggerFileInput}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="Product Preview"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <p className="text-gray-500 cursor-pointer hover:text-gray-700">
              Click to upload product image
            </p>
          )}
        </div>
        {previewImage && (
          <button
            type="button"
            className="text-red-500 hover:text-red-700 text-sm"
            onClick={() => {
              setPreviewImage(null);
              setFormData((prev) => {
                const { product_image, ...rest } = prev;
                return rest;
              });
              // Reset file input
              const fileInput = document.getElementById("product-image-input");
              if (fileInput) fileInput.value = "";
            }}
          >
            Remove Image
          </button>
        )}
      </div>

      {/* Existing Form Columns */}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {/* Kolom Pertama */}
        <div className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <div className="w-full">
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
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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
            value={formData.stock || ""}
            onChange={handleChange}
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={formData.price || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Kolom Ketiga: Description */}
      <div className="col-span-3 mt-4">
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
    </div>
  );
}
