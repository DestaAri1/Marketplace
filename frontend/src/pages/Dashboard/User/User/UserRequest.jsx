import React, { useEffect } from "react";
import DashboardTemplate from "../../DashboardTemplate";
import UserList from "../../../../components/SellerRequest/UserList";
import useRequestSeller from "../../../../hooks/useRequestSeller";
import UserFileter from "../../../../components/SellerRequest/UserFileter";
import { useModal } from "../../../../hooks/useModal";
import AcceptRequestModal from "../../../../components/SellerRequest/AcceptRequestModal";
import RejectRequestModal from "../../../../components/SellerRequest/RejectRequestModal";

export default function UserRequest() {
  const {
    users,
    isFetched,
    isLoading,
    fetchRequestUser,
    selectedStatus,
    setSelectedStatus,
    handleAcceptRequest,
    handleRejectRequest
  } = useRequestSeller()

  useEffect(() => {
    if(!isFetched.current) {
      fetchRequestUser()
      isFetched.current = true
    }
  },[fetchRequestUser,isFetched])

  const acceptModal = useModal()
  const rejectModal = useModal()

  const handleConfirmAcceptRequest = async() => {
    if (await handleAcceptRequest(acceptModal.selectedItem.id, acceptModal.selectedItem.user_id, 2)) {
      acceptModal.closeModal()
    }
  }

  const pass = rejectModal.selectedItem
  const handleConfirmRejectRequest = async(data) => {
    if (await handleRejectRequest(pass.id, pass.user_id, 1, data)) {
      rejectModal.closeModal()
    } 
  }
  
  return (
    <DashboardTemplate title="List Request">
      <UserFileter 
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <UserList
        user={users}
        onUpdate={acceptModal.openModal}
        onDelete={rejectModal.openModal}
      />

      <AcceptRequestModal
        user={acceptModal.selectedItem}
        isOpen={acceptModal.isOpen}
        onClose={acceptModal.closeModal}
        isLoading={isLoading}
        onConfirm={handleConfirmAcceptRequest}
      />

      <RejectRequestModal
        isLoading={isLoading}
        isOpen={rejectModal.isOpen}
        onClose={rejectModal.closeModal}
        user={rejectModal.selectedItem}
        onConfirm={handleConfirmRejectRequest}
      />
    </DashboardTemplate>
  );
}
