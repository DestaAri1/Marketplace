import { LocateFixed, Plus } from "lucide-react";
import React from "react";

export default function AddressChoose({ onClick, address }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Choose Address</h2>
        <button
          onClick={onClick}
          className="w-6 h-6 bg-blue-600 rounded-md px-[2px]"
        >
          <Plus size={20} color="white" />
        </button>
      </div>

      <div className="space-y-4">
        {address && Array.isArray(address) && address.length > 0 ? (
          address.map((addr, index) => (
            <div
              key={addr.id || index}
              className="flex items-center space-x-4 p-2 border rounded-xl transition-all duration-200"
            >
              <div className={`p-2 rounded-lg`}>
                <LocateFixed className={`w-6 h-6 `} />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">
                    {addr.sender.slice(0, 5) +
                      (addr.sender.length > 5 ? "..." : "")}
                  </h3>
                  <p className="text-xs">+6281155447788</p>
                </div>
                <p className="text-gray-600 text-xs">
                  {[
                    addr.details,
                    addr.village,
                    addr.district,
                    addr.regency,
                    addr.province,
                  ]
                    .join(", ") // Gabungkan jadi satu string
                    .slice(0, 50) +
                    ([
                      addr.details,
                      addr.village,
                      addr.district,
                      addr.regency,
                      addr.province,
                    ].join(", ").length > 50
                      ? "..."
                      : "")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center space-x-4 p-4 border rounded-xl">
            <h3 className="font-medium text-gray-800">No address chosen</h3>
          </div>
        )}
      </div>
    </div>
  );
}
