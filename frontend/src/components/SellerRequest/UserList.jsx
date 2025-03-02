import React from "react";

export default function UserList({ user, onUpdate, onDelete }) {
  // Function to get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Unprocess";
      case 1:
        return "Rejected";
      case 2:
        return "Accepted";
      default:
        return "Unknown";
    }
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "bg-yellow-500"; // Unprocess
      case 1:
        return "bg-red-500"; // Rejected
      case 2:
        return "bg-green-500"; // Accepted
      default:
        return "bg-gray-500"; // Unknown
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
            <th className="py-3 px-4 text-left">No</th>
            <th className="py-3 px-4 text-left">Username</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {user && user.length > 0 ? (
            user.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {getStatusLabel(user.status)}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  {user?.status === 0 && (
                    <>
                      <button
                        onClick={() => onUpdate && onUpdate(user)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(user)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm ml-2"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-3 px-4">
                Tidak ada data user
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
