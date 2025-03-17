import React from 'react'
import Modal from '../../Modal'

export default function StatusAddressModal({isOpen, onClose, onConfirm, isLoading}) {
    const handleConfirm = () => {
        onConfirm()
    }
  return (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title="Set Address"
          onConfirm={handleConfirm}
          confirmText={isLoading ? "Processing..." : "Set as main"}
          confirmClass="bg-green-500 hover:bg-green-700"
        >
          <p>Are your sure want set this address as a main address?</p>
        </Modal>
  )
}
