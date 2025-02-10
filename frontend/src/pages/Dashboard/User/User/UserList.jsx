import React, { useEffect, useRef, useState } from 'react'
import DashboardTemplate from '../../DashboardTemplate'
import useAdmin from '../../../../hooks/useAdmin'

export default function UserList() {
  const [user, setUser] = useState([])
  const { GetAllUserHook } = useAdmin()
  const isFetched = useRef(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (!isFetched.current && GetAllUserHook) {
      GetAllUserHook()
      .then((users) => {
        const filteredUsers = users.filter(user => !user.reason);
        setUser(filteredUsers);
      }) // Set user setelah Promise resolved
      .catch((error) => console.error("Error fetching users:", error));
      isFetched.current = true;
      
    }
  }, [GetAllUserHook]);

  const filteredUsers = selectedRole !== null 
  ? user.filter((u) => u.role === selectedRole)
  : user;

  return (
    <DashboardTemplate title='User List'>
      <div className="mb-4 flex gap-2">
        <button
          className={`px-4 py-2 rounded ${selectedRole === null ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedRole(null)}
        >
          Semua
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedRole === 0 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedRole(0)}
        >
          Admin
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedRole === 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedRole(1)}
        >
          Seller
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedRole === 2 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedRole(2)}
        >
          User
        </button>
      </div>

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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        user.role === 1
                          ? "bg-green-500"
                          : user.role === 2
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }`}
                    >
                      {user.role === 0 ? "Admin" : user.role === 1 ? "Seller" : "User"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm">
                      Upgrade
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm ml-2">
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
    </DashboardTemplate>
  )
}
