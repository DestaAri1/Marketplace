import React, { useMemo, useState, useEffect } from "react";
import Modal from "../Modal";

export default function StatusModal({
  onConfirm,
  isOpen,
  onClose,
  isLoading,
  product,
}) {
  const [localProduct, setLocalProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setLocalProduct(product);
    }
  }, [product]);

  const isActive = useMemo(() => localProduct?.status === true, [localProduct]);
  const nextStatus = isActive ? "Archive" : "Product";
  const prevStatus = isActive ? "Product" : "Archive";

  const handleClose = () => {
    onClose();
  };

  if (!localProduct) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Change Product Status"
      onConfirm={onConfirm}
      confirmText={isLoading ? "Processing..." : "Save"}
      confirmClass="bg-green-500 hover:bg-green-700"
    >
      Are you sure you want to change the status of <b>{localProduct.name}</b>{" "}
      to <b>{nextStatus}</b>? Not {prevStatus} again?
    </Modal>
  );
}
