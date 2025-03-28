import React, { useState } from "react";
import Modal from "../Modal";

export default function AddressChooseModal({
  isOpen,
  isLoading,
  onConfirm,
  onClose,
  address,
}) {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
  };

  const handleConfirm = () => {
    if (selectedAddress) {
      onConfirm(selectedAddress);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"Choose your address"}
      confirmText={isLoading ? "Processing..." : "Select"}
      confirmClass={`px-4 py-2 rounded-lg transition-colors ${
        selectedAddress
          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
          : "bg-gray-300 cursor-not-allowed"
      }`}
      onConfirm={handleConfirm}
      width="max-w-2xl"
      text={"Add Address"}
      link={"/profile/address"}
    >
      <div className="space-y-4">
        {address.length > 0 ? (
          address.map((addr, index) => (
            <div
              key={addr.id || index}
              className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                selectedAddress?.id === addr.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-400"
              }`}
              onClick={() => handleSelectAddress(addr)}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{addr.sender}</p>
                  <p className="text-gray-500">{addr.recipient}</p>
                </div>
              </div>
              <p className="mt-2">
                {addr.details}, {addr.village}, {addr.district}, {addr.regency},{" "}
                {addr.province}
              </p>
              <p className="text-gray-500">+62 812 3456 7890</p>
              {addr.status === true && (
                <div className="mt-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                    Main
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2C8.134 2 5 5.134 5 9c0 3.866 4.5 9 7 11.5C14.5 18 19 12.866 19 9c0-3.866-3.134-7-7-7z"
              />
              <circle
                cx="12"
                cy="9"
                r="2.5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            <p className="text-lg font-semibold text-gray-700">
              There's no address
            </p>
            <p className="text-gray-500 text-sm">
              Please add a new address to start.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
