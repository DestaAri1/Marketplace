import React from 'react'
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartModal({ isOpen, onClose, user, cart }) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              onClick={() => onClose()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
          {/* Cart content will go here */}
          {!user ? (
            <div className="text-center text-gray-500">
              <p className='mb-5'>Please login first</p>
              <Link className="text-blue-500 border-2 rounded-md px-4 py-1 bg-gray-200 hover:bg-gray-300 hover:text-blue-700" to="/login">
                Login
              </Link>
            </div>
          ) : (
            <div className="text-center text-gray-500">Your cart is empty</div>
          )}
        </div>
      </div>
    </div>
  );
}
