import React, { lazy, Suspense, useEffect, useState } from "react";
import Fallback from "../../../components/Fallback";
import { useModal } from "../../../hooks/useModal";
import useAddress from "../../../hooks/useAddress";
const ProfilTemplate = lazy(() => import("./ProfilTemplate"));
const AddressBox = lazy(() => import("../../../components/Profile/AddressBox"));
const AddAddressModal = lazy(() =>
  import("../../../components/Profile/Address/AddAddressModal")
);

export default function Address() {
  const [formData, setFormData] = useState([]);
  const { address, isFetched, isLoading, fetchAddress, handleCreateAddress } = useAddress();
  const createModal = useModal();

  useEffect(() => {
    if (!isFetched.current) {
      fetchAddress();
      isFetched.current = true;
    }
  }, [isFetched]);

  const handleSubmitCreateAddress = async (data) => {
    // console.log(data);
    
    if (await handleCreateAddress(data)) {   
      createModal.closeModal()
    }
  };
  return (
    <Suspense fallback={<Fallback />}>
      <ProfilTemplate>
        <AddressBox onClick={createModal.openModal} address={address}/>

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
