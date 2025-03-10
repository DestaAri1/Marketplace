import React, { useEffect, useState } from "react";
import { decryptId } from "../../../utils/crypto";
import MainTemplate from "../MainTemplate";
import { CheckCircle2, CreditCard, Package, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simpan data checkout dalam state
  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState(null);

  // Load data pada mount
  useEffect(() => {
    try {
      const encryptedCheckoutData = localStorage.getItem("checkoutData");
      console.log("Encrypted checkout data:", encryptedCheckoutData);

      if (!encryptedCheckoutData) {
        console.log("Tidak ada data checkout di localStorage");
        setError("No checkout data found");
        setIsLoading(false);
        return;
      }

      const decryptedData = decryptId(encryptedCheckoutData);
      console.log("Decrypted data:", decryptedData);

      const parsedData = JSON.parse(decryptedData);
      console.log("Parsed checkout data:", parsedData);

      setCheckoutData(parsedData);
      setIsLoading(false);
    } catch (err) {
      console.error("Error loading checkout data:", err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  // Clear checkout data when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem("checkoutData");
    };
  }, []);

  // Redirect to home if no checkout data - with delay for debugging
  useEffect(() => {
    if (!isLoading && !checkoutData) {
      console.log("No checkout data, redirecting in 5 seconds...");
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000); // 5 second delay for debugging

      return () => clearTimeout(timer);
    }
  }, [checkoutData, navigate, isLoading]);

  // Hitung total keseluruhan
  const totalAmount =
    checkoutData?.reduce((sum, item) => sum + item.total, 0) || 0;

  // Render loading state
  if (isLoading) {
    return (
      <MainTemplate showFloatingCart={false}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Loading checkout data...
            </h2>
          </div>
        </div>
      </MainTemplate>
    );
  }

  // Render error state
  if (error) {
    return (
      <MainTemplate showFloatingCart={false}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              Error Loading Checkout
            </h2>
            <p>{error}</p>
            <p className="mt-4">Redirecting to home page in a few seconds...</p>
            <button
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => navigate("/")}
            >
              Return to Home
            </button>
          </div>
        </div>
      </MainTemplate>
    );
  }

  // Render empty checkout data state
  if (!checkoutData || checkoutData.length === 0) {
    return (
      <MainTemplate showFloatingCart={false}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p>There are no items in your checkout.</p>
            <p className="mt-4">Redirecting to home page in a few seconds...</p>
            <button
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => navigate("/")}
            >
              Return to Home
            </button>
          </div>
        </div>
      </MainTemplate>
    );
  }

  return (
    <MainTemplate showFloatingCart={false}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Secure Checkout</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
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
                            <h3 className="font-medium text-gray-800">
                              {item.name}
                            </h3>
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

              {/* Payment Method */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                  <h2 className="text-xl font-semibold mb-6 text-gray-800">
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
                          selectedCheckOut === "credit"
                            ? "bg-blue-100"
                            : "bg-gray-100"
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
                        <h3 className="font-medium text-gray-800">
                          Credit Card
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Pay with your credit card
                        </p>
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
                          selectedCheckOut === "cod"
                            ? "bg-green-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <Truck
                          className={`w-6 h-6 ${
                            selectedCheckOut === "cod"
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Cash on Delivery
                        </h3>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
