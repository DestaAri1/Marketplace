import React, { useState } from 'react'
import Modal from '../Modal'

export default function AddCategoryModal({isOpen, onClose, onConfirm, isLoading }) {
  const [newName, setNewName] = useState('');
  const handleConfirm = () => {
      onConfirm(newName);
      setNewName('')
    };
  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Add Category"
        onConfirm={handleConfirm}
        confirmText={isLoading ? "Processing..." : "Save"}
        confirmClass="bg-green-500 hover:bg-green-700"
    >
        <input 
          type="text"
          className="w-full p-2 border rounded-md"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter category name"
        />
        
    </Modal>
  )
}
