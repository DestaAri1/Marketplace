import React from 'react'
import Modal from '../Modal'

export default function StatusModal({onConfirm, isOpen, onClose, isLoading, product}) {
    const handleConfirm = async () => {
        await onConfirm(true);
    };
  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Change Product Status"
        onConfirm={handleConfirm}
        confirmText={isLoading ? "Processing..." : "Save"}
        confirmClass="bg-green-500 hover:bg-green-700"
    >
        Are you sure wanna change the status of <b>{product?.name}</b> to be <b>Products</b>? Not Archive again?
    </Modal>
  )
}
