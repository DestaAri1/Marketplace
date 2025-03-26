import React, { useState } from "react";
import DashboardTemplate from "../../Dashboard/DashboardTemplate";
import { Package2, Box, MoreVertical, Check } from "lucide-react";

// Sample data for packages
const initialPackages = [
  {
    id: 1,
    image: "/api/placeholder/200/200",
    category: "Electronics",
    productName: "Wireless Earbuds",
    quantity: 5,
    status: 0, // Pending
  },
  {
    id: 2,
    image: "/api/placeholder/200/200",
    category: "Clothing",
    productName: "Summer T-Shirt",
    quantity: 12,
    status: 1, // Processing
  },
  {
    id: 3,
    image: "/api/placeholder/200/200",
    category: "Home Decor",
    productName: "Ceramic Vase",
    quantity: 3,
    status: 2, // Ready
  },
];

// Function to get status class and text
const getStatus = (status) => {
  switch (status) {
    case 2:
      return { className: "bg-green-100 text-green-800", text: "Ready" };
    case 1:
      return { className: "bg-yellow-100 text-yellow-800", text: "Processing" };
    case 0:
      return { className: "bg-gray-100 text-gray-800", text: "Pending" };
    default:
      return { className: "bg-gray-100 text-gray-800", text: "Unknown" };
  }
};

export default function PackageList() {
  const [packages, setPackages] = useState(initialPackages);
  return (
    <DashboardTemplate title="Package List">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => {
          const statusInfo = getStatus(pkg.status);
          return (
            <div
              key={pkg.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">{pkg.productName}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}
                >
                  {statusInfo.text}
                </span>
              </div>
              {/* Rest of the code remains the same */}
              <div className="p-4 flex space-x-4">
                {/* Product Image */}
                <div className="w-1/3">
                  <img
                    src={pkg.image}
                    alt={pkg.productName}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                </div>
                {/* Product Details */}
                <div className="w-2/3 space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold">{pkg.category}</p>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-md">
                    <Box className="text-blue-600" size={20} />
                    <span className="font-bold">{pkg.quantity} pcs</span>
                  </div>
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
                    onClick={() => {
                      console.log(`Packing ${pkg.productName}`);
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Pack Items
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {packages.length === 0 && (
          <div className="col-span-full text-center py-8 bg-white rounded-lg shadow-md">
            <Package2 className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600">No packages to pack</p>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
}
