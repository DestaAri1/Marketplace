import React from "react";
import { createImageUrl } from "../../utils/ImageUrlHelper";

export default function ProductTable({
  onAdjust,
  onDelete,
  onUpdate,
  products,
}) {
  return (
    <div className="space-y-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="w-20 h-20 rounded-md overflow-hidden">
                <img
                  src={createImageUrl(
                    process.env.REACT_APP_PRODUCT_URL,
                    product?.image
                  )}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {product.category} • Stock: {product.stock}
                </p>
                <p className="text-base font-bold text-blue-600">
                  ${product.price}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => onAdjust(product)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Status
              </button>

              <button
                onClick={() => onUpdate(product)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Update
              </button>

              <button
                onClick={() => onDelete(product)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No products available</p>
        </div>
      )}
    </div>
  );
}
