import React, { useEffect, useState } from "react";
import Promotions from "../../../components/Home/Promotions";
import ProductListSection from "../../../components/Home/ProductListSection";
import useUserProduct from "../../../hooks/useUserProduct";
import MainTemplate from "../MainTemplate";
import { useModal } from "../../../hooks/useModal";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import SearchBar from "../../../components/Home/SearchBar";
import CreateCartModal from "../../../components/Home/CreateCartModal";

export default function Home() {
  const { products, loading, isFetched, fetchProducts } = useUserProduct();
  const { handleCreateCart, isLoading, fetchCart } = useCart();
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

  const handleSubmitCreateCart = async (data) => {
    if (await handleCreateCart(createCart.selectedItem.id, data)) {
      createCart.closeModal();
      await fetchCart();
    }
  };

  return (
    <MainTemplate>
      <main className="home-main">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Promotions Section */}
        <div className="mb-16">
          <Promotions />
        </div>

        <ProductListSection
          loading={loading}
          products={products}
          openModal={createCart.openModal}
          user={user}
        />

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
