import React, { useState } from "react";
import Modal from "./Modal";

export default function RoleModal({
  isOpen,
  onClose,
  user,
  onConfirm,
  isLoading,
}) {
  const [newRole, setNewRole] = useState(user?.role || null);

  const roleOptions = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Seller" },
    { value: 2, label: "User" },
  ];

  const getRoleChangeText = () => {
    if (!user || newRole === null) return "";
    const fromRole = roleOptions.find((r) => r.value === user.role)?.label;
    const toRole = roleOptions.find((r) => r.value === newRole)?.label;
    return `dari ${fromRole} menjadi ${toRole}`;
  };

  const handleConfirm = () => {
    onConfirm(newRole);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ubah Role User"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Simpan"}
      confirmClass="bg-yellow-500 hover:bg-yellow-700"
    >
      <div className="space-y-4">
        <p>Pilih role baru untuk user {user?.username}:</p>
        <select
          value={newRole || ""}
          onChange={(e) => setNewRole(Number(e.target.value))}
          className="w-full p-2 border rounded-md"
        >
          {roleOptions.map((role) => (
            <option
              key={role.value}
              value={role.value}
              disabled={role.value === user?.role}
            >
              {role.label}
            </option>
          ))}
        </select>
        {newRole !== user?.role && (
          <p className="text-sm text-gray-600">
            Anda akan mengubah role user {user?.username} {getRoleChangeText()}
          </p>
        )}
      </div>
    </Modal>
  );
}
