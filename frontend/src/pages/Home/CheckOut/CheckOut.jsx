import React, { Suspense, useEffect, useState } from "react";
import { decryptId } from "../../../utils/crypto";
import MainTemplate from "../MainTemplate";
import { useNavigate } from "react-router-dom";
import Fallback from "../../../components/Fallback";
import OrderSummery from "../../../components/CheckOut/OrderSummery";
import ErrorCOState from "../../../components/CheckOut/ErrorCOState";
import PaymentCO from "../../../components/CheckOut/PaymentCO";
import AddressChoose from "../../../components/CheckOut/AddressChoose";

export default function CheckOut() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simpan data checkout dalam state
  const [checkoutData, setCheckoutData] = useState(null);

  // Load data pada mount
  useEffect(() => {
    try {
      const encryptedCheckoutData = localStorage.getItem("checkoutData");

      if (!encryptedCheckoutData) {
        setError("No checkout data found");
        setIsLoading(false);
        return;
      }

      const decryptedData = decryptId(encryptedCheckoutData);

      const parsedData = JSON.parse(decryptedData);

      setCheckoutData(parsedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  // // Clear checkout data when component unmounts
  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem("checkoutData");
  //   };
  // }, []);

  // // Redirect to home if no checkout data - with delay for debugging
  // useEffect(() => {
  //   if (!isLoading && !checkoutData) {
  //     const timer = setTimeout(() => {
  //       navigate("/");
  //     }, 3000); // 3 second delay for debugging

  //     return () => clearTimeout(timer);
  //   }
  // }, [checkoutData, navigate, isLoading]);

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
        <ErrorCOState error={error} navigate={navigate} />
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
      <Suspense fallback={<Fallback />}>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="mt-[5rem]"></div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Summary */}
                <OrderSummery
                  checkoutData={checkoutData}
                  OrderSummery={OrderSummery}
                />

                <div className="lg:col-span-1">
                  {/* Choose Address */}
                  <AddressChoose/>
                  {/* Payment Method */}
                  <PaymentCO />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </MainTemplate>
  );
}
