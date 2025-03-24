import { Package } from 'lucide-react';
import React from 'react'

export default function OrderSummery({checkoutData}) {
  // Hitung total keseluruhan
  const totalAmount =
    checkoutData?.reduce((sum, item) => sum + item.total, 0) || 0;
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Order Summary
        </h2>
        <div className="space-y-6">
          {checkoutData?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-100 pb-6 last:border-0"
            >
              <div className="flex items-center space-x-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                    <Package className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Price: ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-gray-800">
                ${item.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">
              Total Amount:
            </span>
            <span className="text-2xl font-bold text-blue-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
