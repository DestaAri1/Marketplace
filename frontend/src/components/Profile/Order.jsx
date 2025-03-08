import React from 'react'

export default function Order() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Pesanan Saya</h2>
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-gray-500 text-sm">
                Order ID: #ORD123456
              </span>
              <p className="font-medium">10 Maret 2025</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              Selesai
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded">
              <img
                src="/api/placeholder/64/64"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="font-medium">Smartphone XYZ Pro</p>
              <p className="text-gray-500">1 x Rp 5.999.000</p>
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center border-t pt-3">
            <p className="font-medium">Total: Rp 5.999.000</p>
            <button className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-sm">
              Lihat Detail
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-gray-500 text-sm">
                Order ID: #ORD123455
              </span>
              <p className="font-medium">5 Maret 2025</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              Dikirim
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded">
              <img
                src="/api/placeholder/64/64"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="font-medium">Headphone ABC Elite</p>
              <p className="text-gray-500">1 x Rp 1.299.000</p>
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center border-t pt-3">
            <p className="font-medium">Total: Rp 1.299.000</p>
            <button className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-sm">
              Lacak Pesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
