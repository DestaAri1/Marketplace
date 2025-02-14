import { useEffect } from "react";
import { useUserManagement } from "../../../../hooks/useAdminUser";
import { useModal } from "../../../../hooks/useModal";
import DashboardTemplate from "../../DashboardTemplate";
import UserFilters from "../../../../components/UserFilters";
import UserTable from "../../../../components/UserTable";
import RoleModal from "../../../../components/RoleModal";
import DeleteModal from "../../../../components/DeleteModal";

export default function UserList() {
  const {
    users,
    selectedRole,
    setSelectedRole,
    fetchUsers,
    handleRoleUpdate,
    isLoading,
    isFetched,
    handleDeleteUser
  } = useUserManagement();

  const roleModal = useModal();
  const deleteModal = useModal();

  useEffect(() => {
    if (!isFetched.current) {
      fetchUsers();
      isFetched.current = true;
    }
  }, [fetchUsers]);

  const handleConfirmRoleChange = async (newRole) => {
    if (await handleRoleUpdate(roleModal.selectedItem.id, newRole)) {
      roleModal.closeModal();
    }
  };

  const handleConfirmDelete = async () => {
    if (await handleDeleteUser(deleteModal.selectedItem.id)) {
      deleteModal.closeModal();
    }
    // console.log('Deleting user:', deleteModal.selectedItem);
  };

  return (
    <DashboardTemplate title='User List'>
      <UserFilters 
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      <UserTable 
        users={users}
        onRoleChange={roleModal.openModal}
        onDelete={deleteModal.openModal}
      />

      <RoleModal
        isOpen={roleModal.isOpen}
        onClose={roleModal.closeModal}
        user={roleModal.selectedItem}
        onConfirm={handleConfirmRoleChange}
        isLoading={isLoading}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        user={deleteModal.selectedItem}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
      />
    </DashboardTemplate>
  );
}