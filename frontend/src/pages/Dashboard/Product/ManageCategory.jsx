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
    errors,
    clearErrors,
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
    const success = await handleCreateCategory(name);

    if (
      success &&
      success.data &&
      success.data.message === "Validation error"
    ) {
      // Keep modal open if validation error
    } else {
      createModal.closeModal();
    }
  };

  const onUpdateCategory = async (name) => {
    const categoryId = updateModal.selectedItem?.id

    const success = await handleCategoryUpdate(categoryId,name);

    if (
      success &&
      success.data &&
      success.data.message === "Validation error"
    ) {
      // Keep modal open if validation error
    } else {
      updateModal.closeModal();
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
        onClose={() => {
          clearErrors();
          createModal.closeModal();
        }}
        user={createModal.selectedItem}
        onConfirm={handleSubmitCreateCategory}
        errors={errors}
      />

      <UpdateCategoryModal
        isOpen={updateModal.isOpen}
        onClose={() => {
          clearErrors();
          updateModal.closeModal();
        }}
        category={updateModal.selectedItem}
        onConfirm={onUpdateCategory}
        errors={errors}
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
