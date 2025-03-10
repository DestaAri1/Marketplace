import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import Input from "../../Input";
import Select from "../../Select";
import useAddressFormLogic from "../../../hooks/useAddressFormLogic";

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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Input
            type={"text"}
            name={"sender"}
            value={formData.sender || ""}
            placeholder={"Input the sender name"}
            label={"Sender"}
            onChange={handleChange}
          />
          <Select
            label={"Province"}
            onChange={handleChange}
            value={formData.province || ""}
            name={"province"}
            item={provinces.length > 0 ? provinces : []}
          />
          <Select
            label={"District"}
            onChange={handleChange}
            value={formData.district || ""}
            name={"district"}
            item={districts || []}
          />
        </div>
        <div className="space-y-4">
          <Input
            type={"text"}
            name={"receiver"}
            value={formData.receiver || ""}
            placeholder={"Input the receiver name"}
            label={"Receiver"}
            onChange={handleChange}
          />
          <Select
            label={"Regency"}
            onChange={handleChange}
            value={formData.regency || ""}
            name={"regency"}
            item={regencies || []}
          />
          <Select
            label={"Village"}
            onChange={handleChange}
            value={formData.village || ""}
            name={"village"}
            item={villages || []}
          />
        </div>
        <div className="mt-4 col-span-2">
          <label
            htmlFor="Detail"
            className="block text-sm font-medium text-gray-700"
          >
            Detail Address
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
      </div>
    </Modal>
  );
}
