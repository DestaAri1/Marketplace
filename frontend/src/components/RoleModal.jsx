import React, { useState, useEffect } from "react";
import Modal from "./Modal";

export default function RoleModal({
  isOpen,
  onClose,
  user,
  onConfirm,
  isLoading,
}) {
  const [localUser, setLocalUser] = useState(null);
  const [newRole, setNewRole] = useState(null);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
      setNewRole(user.role);
    }
  }, [user]);

  const roleOptions = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Seller" },
    { value: 2, label: "User" },
  ];

  const getRoleChangeText = () => {
    if (!localUser || newRole === null) return "";
    const fromRole = roleOptions.find((r) => r.value === localUser.role)?.label;
    const toRole = roleOptions.find((r) => r.value === newRole)?.label;
    return `dari ${fromRole} menjadi ${toRole}`;
  };

  const handleConfirm = () => {
    onConfirm(newRole);
  };

  if (!localUser) return null;

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
        <p>Pilih role baru untuk user {localUser.username}:</p>
        <select
          value={newRole || ""}
          onChange={(e) => setNewRole(Number(e.target.value))}
          className="w-full p-2 border rounded-md"
        >
          {roleOptions.map((role) => (
            <option
              key={role.value}
              value={role.value}
              disabled={role.value === localUser.role}
            >
              {role.label}
            </option>
          ))}
        </select>
        {newRole !== localUser.role && (
          <p className="text-sm text-gray-600">
            Anda akan mengubah role user {localUser.username}{" "}
            {getRoleChangeText()}
          </p>
        )}
      </div>
    </Modal>
  );
}
