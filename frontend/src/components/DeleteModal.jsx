import React from 'react'
import Modal from './Modal';

export default function DeleteModal({ isOpen, onClose, user, onConfirm, isLoading }) {
  const handleConfirm = () => {
    if (user?.id) {
      onConfirm(user.id);
    }
  };
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Hapus User"
        onConfirm={handleConfirm}
        confirmText={isLoading ? "Processing..." : "Hapus"}
        confirmClass="bg-red-500 hover:bg-red-700"
      >
        <p>
          Apakah Anda yakin ingin menghapus user {user?.username}?
          Tindakan ini tidak dapat dibatalkan.
        </p>
      </Modal>
    );
  };
