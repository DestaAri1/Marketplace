import React from "react";

export default function UserTable({ users, onRoleChange, onDelete }) {
  const getRoleClass = (role) => {
    switch (role) {
      case 1:
        return "bg-green-500";
      case 2:
        return "bg-blue-500";
      default:
        return "bg-red-500";
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 0:
        return "Admin";
      case 1:
        return "Seller";
      case 2:
        return "User";
      default:
        return "";
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
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id || index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getRoleClass(
                      user.role
                    )}`}
                  >
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onRoleChange(user)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Change Role
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-3 px-4">
                Tidak ada data user untuk role ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
