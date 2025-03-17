import React from "react";

export default function AddressList({ address, onClick, onUpdate, onDelete, onStatus }) {
  return (
    <div className="space-y-4">
      {address.length > 0 ? (
        address.map((address, index) => (
          <div
            key={address.id || index}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{address.sender}</p>
                <p className="text-gray-500">{address.recipient}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onUpdate(address)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                {address.status === false && (
                  <button
                    onClick={() => onStatus(address)}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Set as main
                  </button>
                )}
                <button
                  onClick={() => onDelete(address)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2">
              {address.details}, {address.village}, {address.district},{" "}
              {address.regency}, {address.province}
            </p>
            <p className="text-gray-500">+62 812 3456 7890</p>
            {address.status === true && (
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
          {/* Ikon lokasi dari Heroicons */}
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
          <button
            onClick={onClick}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add address
          </button>
        </div>
      )}
    </div>
  );
}
