import React, { lazy, Suspense, useState } from "react";
import Fallback from "../../../components/Fallback";
import { useModal } from "../../../hooks/useModal";
const ProfilTemplate = lazy(() => import("./ProfilTemplate"));
const AddressBox = lazy(() => import("../../../components/Profile/AddressBox"));
const AddAddressModal = lazy(() => import("../../../components/Profile/Address/AddAddressModal"))

export default function Address() {
  const [ formData, setFormData ] = useState([])
  const createModal = useModal()

  const handleSubmitCreateAddress = async(data) => {
    console.log(data);
  }
  return (
    <Suspense fallback={<Fallback/>}>
      <ProfilTemplate>
        <AddressBox onClick={createModal.openModal}/>

        <AddAddressModal
        isOpen={createModal.isOpen}
        onClose={createModal.closeModal}
        onConfirm={handleSubmitCreateAddress}
        formData={formData}
        setFormData={setFormData}
        />
      </ProfilTemplate>
    </Suspense>
  );
}
