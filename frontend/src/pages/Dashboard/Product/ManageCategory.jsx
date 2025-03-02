import React, { useEffect } from "react";
import DashboardTemplate from "../DashboardTemplate";
import CategorytTable from "../../../components/ManageCategory/CategorytTable";
import { useModal } from "../../../hooks/useModal";
import AddCategoryModal from "../../../components/ManageCategory/AddCategoryModal";
import useCategory from "../../../hooks/useCategory";
import DeleteCatModal from "../../../components/ManageCategory/DeleteCatModal";
import UpdateCategoryModal from "../../../components/ManageCategory/UpdateCategoryModal";

export default function ManageCategory() {
  const {
    category,
    fetchCategory,
    isFetched,
    handleCategoryUpdate,
    handleCreateCategory,
    handleDeleteCategory,
  } = useCategory();

  useEffect(() => {
    if (!isFetched.current) {
      fetchCategory();
      isFetched.current = true;
    }
  }, [fetchCategory, isFetched]);

  const createModal = useModal();
  const updateModal = useModal();
  const deleteModal = useModal();

  const handleSubmitCreateCategory = async (name) => {
    try {
      const result = await handleCreateCategory(name);
      if (result) {
        createModal.closeModal();
        await fetchCategory(); // Refresh data
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const onUpdateCategory = async (name) => {
    try {
      const result = await handleCategoryUpdate(
        updateModal.selectedItem.id,
        name
      );
      if (result) {
        updateModal.closeModal();
        await fetchCategory();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleSubmitDeleteCategory = async () => {
    try {
      const result = await handleDeleteCategory(deleteModal.selectedItem.id);
      if (result) {
        deleteModal.closeModal();
        await fetchCategory();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <DashboardTemplate
      title="Manage Category"
      showButton={true}
      buttonTitle="Add Category"
      onButtonClick={createModal.openModal}
    >
      <CategorytTable
        categories={category}
        onUpdate={updateModal.openModal}
        onDelete={deleteModal.openModal}
      />

      <AddCategoryModal
        isOpen={createModal.isOpen}
        onClose={createModal.closeModal}
        user={createModal.selectedItem}
        onConfirm={handleSubmitCreateCategory}
      />

      <UpdateCategoryModal
        isOpen={updateModal.isOpen}
        onClose={updateModal.closeModal}
        category={updateModal.selectedItem}
        onConfirm={onUpdateCategory} // Pass the renamed function
      />

      <DeleteCatModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        category={deleteModal.selectedItem}
        onConfirm={handleSubmitDeleteCategory}
      />
    </DashboardTemplate>
  );
}
