import React, { useEffect, useRef, useState } from 'react'
import DashboardTemplate from '../../DashboardTemplate'
import useAdmin from '../../../../hooks/useAdmin'
import Modal from '../../../../components/Modal'

export default function UserList() {
  const [users, setUsers] = useState([])
  const { GetAllUserHook, AdjustRoleUserHook } = useAdmin()
  const isFetched = useRef(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await GetAllUserHook();
      const filteredUsers = fetchedUsers.filter(user => !user.reason);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (!isFetched.current && GetAllUserHook) {
      fetchUsers();
      isFetched.current = true;
    }
  }, [GetAllUserHook]);

  const filteredUsers = selectedRole !== null 
    ? users.filter((u) => u.role === selectedRole)
    : users;

  const roleOptions = [
    { value: 0, label: 'Admin' },
    { value: 1, label: 'Seller' },
    { value: 2, label: 'User' }
  ];

  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setNewRole(user.role); // Set current role as default
    setIsRoleModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleConfirmRoleChange = async () => {
    if (!selectedUser || newRole === selectedUser.role) return;
    
    setIsLoading(true);
    try {
      await AdjustRoleUserHook(selectedUser.id, newRole);
      await fetchUsers();
      console.log('User role updated successfully');
    } catch (error) {
      console.error('Error changing user role:', error);
    } finally {
      setIsLoading(false);
      setIsRoleModalOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    // Add your delete logic here
    console.log('Deleting user:', selectedUser);
    setIsDeleteOpen(false);
  };

  const getRoleChangeText = () => {
    if (!selectedUser || newRole === null) return '';
    const fromRole = roleOptions.find(r => r.value === selectedUser.role)?.label;
    const toRole = roleOptions.find(r => r.value === newRole)?.label;
    return `dari ${fromRole} menjadi ${toRole}`;
  };

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
                <tr key={user.id || index} className="border-b hover:bg-gray-100">
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
                    <button 
                      onClick={() => handleRoleChange(user)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm">
                      Change Role
                    </button>
                    <button 
                      onClick={() => handleDelete(user)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm ml-2">
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

      {/* Modal Role Change */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        title="Ubah Role User"
        onConfirm={handleConfirmRoleChange}
        confirmText={isLoading ? "Processing..." : "Simpan"}
        confirmClass="bg-yellow-500 hover:bg-yellow-700"
      >
        <div className="space-y-4">
          <p>Pilih role baru untuk user {selectedUser?.username}:</p>
          <select
            value={newRole || ''}
            onChange={(e) => setNewRole(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
          >
            {roleOptions.map((role) => (
              <option 
                key={role.value} 
                value={role.value}
                disabled={role.value === selectedUser?.role}
              >
                {role.label}
              </option>
            ))}
          </select>
          {newRole !== selectedUser?.role && (
            <p className="text-sm text-gray-600">
              Anda akan mengubah role user {selectedUser?.username} {getRoleChangeText()}
            </p>
          )}
        </div>
      </Modal>

      {/* Modal Delete */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Hapus User"
        onConfirm={handleConfirmDelete}
        confirmText="Hapus"
        confirmClass="bg-red-500 hover:bg-red-700"
      >
        <p>
          Apakah Anda yakin ingin menghapus user {selectedUser?.username}?
          Tindakan ini tidak dapat dibatalkan.
        </p>
      </Modal>
    </DashboardTemplate>
  )
}