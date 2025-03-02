import React, { useEffect, useState } from "react";
import DashboardTemplate from "../../Dashboard/DashboardTemplate";
import { useModal } from "../../../hooks/useModal";
import ProductTable from "../../../components/Seller/ProductTable";
import useProduct from "../../../hooks/useProduct";
import AddProductModal from "../../../components/Seller/AddProductModal";
import useCategory from "../../../hooks/useCategory";
import StatusModal from "../../../components/Seller/StatusModal";
import UpdateProductModal from "../../../components/Seller/UpdateProductModal";
import DeleteProductModal from "../../../components/Seller/DeleteProductModal";

export default function SellerArchive() {
  const {
    products,
    isFetched,
    isLoading,
    fetchProducts,
    handleCreateProduct,
    handleStatus,
    handleUpdateProduct,
    handelDeleteProduct,
  } = useProduct();

  const { category, fetchCategory } = useCategory();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isFetched.current) {
      fetchProducts(false);
      fetchCategory();
      isFetched.current = true;
    }
  }, [fetchProducts, isFetched, fetchCategory]);

  const createModal = useModal();
  const statusModal = useModal();
  const updateModal = useModal();
  const deleteModal = useModal();

  const handleConfirmCreateProduct = async (data) => {
    if (await handleCreateProduct(data, false)) {
      createModal.closeModal();
      setFormData({}); // Reset form data after successful creation
    }
  };

  const handleConfirmStatus = async () => {
    if (await handleStatus(statusModal.selectedItem.id, true)) {
      statusModal.closeModal();
    }
  };

  const handleConfirmUpdateProduct = async (data) => {
    if (await handleUpdateProduct(updateModal.selectedItem.id, data)) {
      updateModal.closeModal();
    }
  };

  const handleConfirmDeleteProduct = async () => {
    if (await handelDeleteProduct(deleteModal.selectedItem.id)) {
      deleteModal.closeModal();
    }
  };

  return (
    <DashboardTemplate
      title="Products Archive"
      showButton={true}
      buttonTitle="Add Product"
      onButtonClick={createModal.openModal}
    >
      <AddProductModal
        isOpen={createModal.isOpen}
        onClose={() => {
          createModal.closeModal();
          setFormData({}); // Reset form data when closing modal
        }}
        onConfirm={handleConfirmCreateProduct}
        category={category}
        formData={formData}
        setFormData={setFormData}
      />

      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={statusModal.closeModal}
        onConfirm={handleConfirmStatus}
        product={statusModal.selectedItem}
      />

      <UpdateProductModal
        isOpen={updateModal.isOpen}
        onClose={updateModal.closeModal}
        onConfirm={handleConfirmUpdateProduct}
        product={updateModal.selectedItem}
        category={category}
      />

      <DeleteProductModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        onConfirm={handleConfirmDeleteProduct}
        product={deleteModal.selectedItem}
      />

      <ProductTable
        products={products}
        onAdjust={statusModal.openModal}
        onUpdate={updateModal.openModal}
        onDelete={deleteModal.openModal}
      />
    </DashboardTemplate>
  );
}
