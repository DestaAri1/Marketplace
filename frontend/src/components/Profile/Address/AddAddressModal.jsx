import React from "react";
import Modal from "../../Modal";
import Input from "../../Input";
import Select from "../../Select";
import useAddressFormLogic from "../../../hooks/useAddressFormLogic";
import FormAddress from "./FormAddress";

export default function AddAddressModal({
  isOpen,
  onClose,
  isLoading,
  onConfirm,
  formData,
  setFormData,
}) {
  const {
    provinces,
    regencies,
    districts,
    villages,
    handleChange,
    setLoadedData,
  } = useAddressFormLogic(formData, setFormData, isOpen);

  const handleConfirm = () => {
    onConfirm(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setFormData({}); // Reset to empty object
        setLoadedData({ provinceId: null, regencyId: null, districtId: null });
      }}
      title="Add Address"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Save"}
      confirmClass="bg-green-500 hover:bg-green-700"
      width="max-w-2xl"
    >
      <FormAddress 
        formData={formData}
        handleChange={handleChange}
        provinces={provinces}
        districts={districts}
        regencies={regencies}
        villages={villages}
      />
    </Modal>
  );
}
