import React, { useEffect, useState } from "react";
import Promotions from "../../../components/Home/Promotions";
import Products from "../../../components/Home/Products";
import useUserProduct from "../../../hooks/useUserProduct";
import { Search } from "lucide-react";
import MainTemplate from "../MainTemplate";
import { useModal } from "../../../hooks/useModal";
import useAuth from "../../../hooks/useAuth";
import CreateCartModal from "../../../components/Home/CreateCartModal";
import useCart from "../../../hooks/useCart";

export default function Home() {
  const { products, loading, isFetched, fetchProducts } = useUserProduct();
  const { handleCreateCart, isLoading } = useCart()
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  // Save scroll position before page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Restore scroll position after page loads
  useEffect(() => {
    const restoreScrollPosition = () => {
      const scrollPosition = localStorage.getItem("scrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        localStorage.removeItem("scrollPosition"); // Clear after restore
      }
    };

    // Wait for content to load before restoring scroll
    if (!loading && products.length > 0) {
      restoreScrollPosition();
    }
  }, [loading, products]);

  useEffect(() => {
    const loadProducts = async () => {
      if (!isFetched.current) {
        await fetchProducts();
        isFetched.current = true;
      }
    };

    // Hanya jalankan jika komponen di-mount pertama kali
    if (!isFetched.current) {
      loadProducts();
    }
  }, [fetchProducts, isFetched]);

  const createCart = useModal();

  const handleSubmitCreateCart = async(data) => {
    if (await handleCreateCart(createCart.selectedItem.id, data)) {
      createCart.closeModal()
    }
  }

  return (
    <MainTemplate>
      <main className="home-main">
        {/* Search Bar */}
        <div className="search-container">
          <div className="relative">
            <input
              type="text"
              className="search-input"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="search-icon" />
          </div>
        </div>

        {/* Promotions Section */}
        <div className="mb-16">
          <Promotions />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Error State */}
        {!loading && products.length === 0 && (
          <div className="no-products">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        )}

        {/* Product List Section */}
        {!loading && products.length > 0 && (
          <div className="products-section">
            <Products
              products={products}
              openModal={createCart.openModal}
              user={user}
            />
          </div>
        )}

        {/* Only render CreateCartModal if user exists */}
        {user && (
          <CreateCartModal
            isOpen={createCart.isOpen}
            onClose={createCart.closeModal}
            product={createCart.selectedItem}
            onConfirm={handleSubmitCreateCart}
            isLoading={isLoading}
          />
        )}
      </main>
    </MainTemplate>
  );
}
