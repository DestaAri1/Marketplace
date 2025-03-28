import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { toast } from "react-toastify";
import FormProduct from "./Product/FormProduct";

export default function UpdateProductModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
  product,
  category,
}) {
  const [data, setData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (product?.id) {
      // Ensure we're setting all required fields
      setData({
        name: product.name || "",
        stock: product.stock || 0,
        price: product.price || 0,
        category_id: product.category_id || "",
        description: product.description || "",
        image: product.image || "",
      });

      // Reset preview image when a new product is selected
      setPreviewImage(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Add the file to formData
      setData((prev) => ({
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
      <FormProduct
        category={category}
        formData={data}
        setFormData={setData}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        triggerFileInput={triggerFileInput}
      />
    </Modal>
  );
}
