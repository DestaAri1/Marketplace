import React, { useState, useEffect } from "react";
import Modal from "./Modal";

export default function DeleteModal({
  isOpen,
  onClose,
  user,
  onConfirm,
  isLoading,
}) {
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  const handleConfirm = () => {
    if (localUser?.id) {
      onConfirm(localUser.id);
    }
  };

  if (!localUser) return null;

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
        Apakah Anda yakin ingin menghapus user {localUser.username}? Tindakan
        ini tidak dapat dibatalkan.
      </p>
    </Modal>
  );
}
