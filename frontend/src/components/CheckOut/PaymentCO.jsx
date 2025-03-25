import { CreditCard, Truck } from "lucide-react";
import React, { useState } from "react";

export default function PaymentCO() {
  const [selectedCheckOut, setSelectedCheckOut] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sticky top-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Payment Method
      </h2>
      <div className="space-y-4">
        <div
          className={`flex items-center space-x-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
            selectedCheckOut === "credit"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-blue-300"
          }`}
          onClick={() => setSelectedCheckOut("credit")}
        >
          <div
            className={`p-2 rounded-lg ${
              selectedCheckOut === "credit" ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <CreditCard
              className={`w-6 h-6 ${
                selectedCheckOut === "credit"
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Virtual Account</h3>
            <p className="text-gray-600 text-sm">Pay with your virtual account</p>
          </div>
        </div>
        <div
          className={`flex items-center space-x-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
            selectedCheckOut === "cod"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:border-green-300"
          }`}
          onClick={() => setSelectedCheckOut("cod")}
        >
          <div
            className={`p-2 rounded-lg ${
              selectedCheckOut === "cod" ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <Truck
              className={`w-6 h-6 ${
                selectedCheckOut === "cod" ? "text-green-600" : "text-gray-600"
              }`}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Cash on Delivery</h3>
            <p className="text-gray-600 text-sm">
              Pay when you receive the order
            </p>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        className={`w-full mt-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
          selectedCheckOut
            ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!selectedCheckOut}
      >
        Place Order
      </button>
    </div>
  );
}
