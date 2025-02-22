import React, { useEffect, useState } from 'react'

export default function Modal({ isOpen, onClose, title, children, onConfirm, confirmText, confirmClass, width = "max-w-md" }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (isOpen) {
        setIsVisible(true);
      } else {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);
  
    if (!isVisible && !isOpen) return null;
  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-50 flex items-center justify-center
        ${isOpen ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0'}
      `}
    >
      <div 
        className={`bg-white rounded-lg p-6 w-full ${width} transform transition-all duration-300 ease-in-out
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4'}
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        <div className="mb-6">
          {children}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded transition-colors duration-200 ${confirmClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
