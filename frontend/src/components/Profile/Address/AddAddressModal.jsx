import React, { useEffect } from "react";
import Modal from "../../Modal";
import useAddressFormLogic from "../../../hooks/useAddressFormLogic";
import FormAddress from "./FormAddress";

export default function UpdateAddressModal({
  isOpen,
  onClose,
  address, // Data alamat yang akan diupdate
  isLoading,
  onConfirm,
  formData,
  setFormData,
  errors = {},
}) {
  const {
    provinces,
    regencies,
    districts,
    villages,
    handleChange,
    setLoadedData,
  } = useAddressFormLogic(formData, setFormData, isOpen);

  // Populate form data when modal opens and address data is available
  useEffect(() => {
    if (isOpen && address) {
      // First set the formData with all values at once
      setFormData({
        sender: address.sender || "",
        receiver: address.recipient || "",
        province: address.province_id || "",
        regency: address.regency_id || "",
        district: address.district_id || "",
        village: address.village_id || "",
        description: address.details || "",
        status: address.status || false,
      });

      // Then manually update the loadedData state to trigger the cascading fetches
      setLoadedData({
        provinceId: address.province_id || null,
        regencyId: address.regency_id || null,
        districtId: address.district_id || null,
      });
    }
  }, [isOpen, address, setFormData, setLoadedData]);

  const handleConfirm = (e) => {
    e?.preventDefault?.();
    onConfirm(formData);
  };

  const handleClose = () => {
    setFormData({}); // Reset form data
    setLoadedData({ provinceId: null, regencyId: null, districtId: null });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Update Address"
      onConfirm={handleConfirm}
      confirmText={isLoading ? "Processing..." : "Save"}
      confirmClass="bg-blue-500 hover:bg-blue-700"
      width="max-w-2xl"
    >
      <FormAddress
        formData={formData}
        handleChange={handleChange}
        provinces={provinces}
        districts={districts}
        regencies={regencies}
        villages={villages}
        errors={errors}
      />
    </Modal>
  );
}
