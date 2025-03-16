import React, { lazy, Suspense, useEffect, useState } from "react";
import Fallback from "../../../components/Fallback";
import { useModal } from "../../../hooks/useModal";
import useAddress from "../../../hooks/useAddress";
import DeleteAddressModal from "../../../components/Profile/Address/DeleteAddressModal";

const ProfilTemplate = lazy(() => import("./ProfilTemplate"));
const AddressBox = lazy(() => import("../../../components/Profile/AddressBox"));
const AddAddressModal = lazy(() =>
  import("../../../components/Profile/Address/AddAddressModal")
);
const UpdateAddressModal = lazy(() =>
  import("../../../components/Profile/Address/UpdateAddressModal")
);

export default function Address() {
  const [formData, setFormData] = useState({});
  const {
    address,
    isFetched,
    isLoading,
    errors,
    clearErrors,
    fetchAddress,
    handleCreateAddress,
    handleUpdateAddress,
    handleDeleteAddress,
  } = useAddress();

  const createModal = useModal();
  const updateModal = useModal();
  const deleteModal = useModal();

  useEffect(() => {
    if (!isFetched.current) {
      fetchAddress();
      isFetched.current = true;
    }
  }, [isFetched, fetchAddress]);

  const handleSubmitCreateAddress = async (data) => {
    const success = await handleCreateAddress(data);
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

  // Handle update address submission
  const handleSubmitUpdateAddress = async (data) => {
    // Assuming addressId is in the selectedItem
    const addressId = updateModal.selectedItem?.id;
    if (addressId) {
      const success = await handleUpdateAddress(addressId, data);
      if (
        success &&
        success.data &&
        success.data.message === "Validation error"
      ) {
        // Keep modal open if validation error
      } else {
        updateModal.closeModal();
      }
    }
  };

  const handleSubmitDeleteAddress = async() => {
    if (await handleDeleteAddress(deleteModal.selectedItem.id)) {
      deleteModal.closeModal()
    }
  }

  const handleCloseModal = () => {
    clearErrors();
    if (createModal.isOpen === true) {
      createModal.closeModal();
    }
  };

  return (
    <Suspense fallback={<Fallback />}>
      <ProfilTemplate>
        <AddressBox
          onClick={createModal.openModal}
          address={address}
          onUpdate={updateModal.openModal}
          onDelete={deleteModal.openModal}
        />

        <AddAddressModal
          isOpen={createModal.isOpen}
          onClose={handleCloseModal}
          onConfirm={handleSubmitCreateAddress}
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          errors={errors}
        />

        <UpdateAddressModal
          isOpen={updateModal.isOpen}
          onClose={() => {
            clearErrors();
            updateModal.closeModal();
          }}
          address={updateModal.selectedItem}
          onConfirm={handleSubmitUpdateAddress}
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          errors={errors}
        />

        <DeleteAddressModal
          isLoading={isLoading}
          onClose={deleteModal.closeModal}
          isOpen={deleteModal.isOpen}
          onConfirm={handleSubmitDeleteAddress}
        />
      </ProfilTemplate>
    </Suspense>
  );
}
