import React from "react";

export default function UserFilter({ selectedStatus, setSelectedStatus }) {
  const filters = [
    { label: "All", value: null },
    { label: "Unprocess", value: 0 },
    { label: "Rejected", value: 1 },
    { label: "Accepted", value: 2 },
  ];

  return (
    <div className="mb-4 flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.label}
          className={`px-4 py-2 rounded ${
            selectedStatus === filter.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedStatus(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
