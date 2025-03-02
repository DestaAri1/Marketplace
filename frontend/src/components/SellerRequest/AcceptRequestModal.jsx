import React from "react";
import Modal from "../Modal";

export default function AcceptRequestModal({
  isLoading,
  onClose,
  onConfirm,
  isOpen,
  user,
}) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Modal
      title={"Accept Request"}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Accept"}
      confirmClass="bg-green-500 hover:bg-green-700"
    >
      Are you sure wanna upgrade <b>{user?.username}</b> to be a Seller?
    </Modal>
  );
}
