import React from "react";
import Modal from "../../Modal";

export default function DeleteAddressModal({onConfirm, isLoading, isOpen, onClose}) {
  const handleConfirm = () => {
    onConfirm()
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Address"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Delete"}
      confirmClass="bg-red-500 hover:bg-red-700"
    >
      <p>Are your sure want to delete this address?</p>
    </Modal>
  );
}
