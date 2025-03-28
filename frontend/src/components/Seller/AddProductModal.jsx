import React, { useState } from "react";
import Modal from "../Modal";
import FormProduct from "./Product/FormProduct";

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
  const [previewImage, setPreviewImage] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Add the file to formData
      setFormData((prev) => ({
        ...prev,
        product_image: file,
      }));

      // Create and set preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("product-image-input").click();
  };

  const handleConfirm = async () => {
    await onConfirm(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
        setPreviewImage("")
      }}
      title="Add Product"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Save"}
      confirmClass="bg-green-500 hover:bg-green-700"
      width="max-w-4xl"
    >
      <FormProduct
        category={category}
        formData={formData}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        setFormData={setFormData}
        triggerFileInput={triggerFileInput}
      />
    </Modal>
  );
}
