import React, { useMemo } from "react";
import Modal from "../Modal";

export default function StatusModal({
  onConfirm,
  isOpen,
  onClose,
  isLoading,
  product,
}) {
  const isActive = useMemo(() => product?.status === true, [product]);
  const nextStatus = isActive ? "Archive" : "Product";
  const prevStatus = isActive ? "Product" : "Archive";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Product Status"
      onConfirm={onConfirm}
      confirmText={isLoading ? "Processing..." : "Save"}
      confirmClass="bg-green-500 hover:bg-green-700"
    >
      Are you sure you want to change the status of <b>{product?.name}</b> to{" "}
      <b>{nextStatus}</b>? Not {prevStatus} again?
    </Modal>
  );
}
