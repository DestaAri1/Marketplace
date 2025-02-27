import React, { useState } from 'react'
import Modal from '../Modal'

export default function RejectRequestModal({isLoading, onClose, onConfirm, isOpen, user}) {
    const [formData, setFormData] = useState([])
    
    const handleConfirm = async () => {
        await onConfirm(formData);
    };
    return (
        <Modal
            title={"Reject Request"}
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleConfirm}
            confirmText={isLoading ? "Processing..." : "Reject"}
            confirmClass="bg-red-500 hover:bg-red-700"
        >
            Are you sure wanna reject <b>{user?.username}</b> to be a seller?
            <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Reason
                </label>
                <textarea
                    name="reason"
                    value={formData || ""}
                    onChange={(e)=>setFormData(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
            </div>
        </Modal>
    )
}
