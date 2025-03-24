import React from 'react'

export default function ErrorCOState({error, navigate}) {
  return (
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
  );
}
