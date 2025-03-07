import React from "react";
import Products from "./Products";

export default function ProductListSection({ loading, products, openModal, user }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <p className="text-gray-600 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="products-section">
      <Products products={products} openModal={openModal} user={user} />
    </div>
  );
};
