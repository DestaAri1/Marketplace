import React from "react";

export default function UserFilters({ selectedRole, setSelectedRole }) {
  const filters = [
    { label: "Semua", value: null },
    { label: "Admin", value: 0 },
    { label: "Seller", value: 1 },
    { label: "User", value: 2 },
  ];

  return (
    <div className="mb-4 flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.label}
          className={`px-4 py-2 rounded ${
            selectedRole === filter.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedRole(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
