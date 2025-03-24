import React, { useEffect } from "react";
import MainTemplate from "../MainTemplate";
import ProductListSection from "../../../components/Home/ProductListSection";
import useUserProduct from "../../../hooks/useUserProduct";
import CreateCartModal from "../../../components/Home/CreateCartModal";
import useAuth from "../../../hooks/useAuth";
import { useModal } from "../../../hooks/useModal";
import useCart from "../../../hooks/useCart";

export default function Products() {
  const { products, loading, isFetched, fetchProducts } = useUserProduct();
  const { handleCreateCart, isLoading, fetchCart } = useCart();
  const { user } = useAuth();
  const createCart = useModal();

  useEffect(() => {
    const loadProducts = async () => {
      if (!isFetched.current) {
        await fetchProducts();
        isFetched.current = true;
      }
    };

    if (!isFetched.current) {
      loadProducts();
    }
  }, [fetchProducts, isFetched]);

  console.log(products);

  const handleSubmitCreateCart = async (quantity) => {
    const result = await handleCreateCart(createCart.selectedItem.id, quantity);
    if (result) {
      createCart.closeModal();
    }
  };

  const handleOpenModal = (item) => {
    createCart.openModal(item);
  };
  return (
    <MainTemplate>
      <main className="home-main">
        <ProductListSection
          loading={loading}
          products={products}
          openModal={handleOpenModal}
          user={user}
        />

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
