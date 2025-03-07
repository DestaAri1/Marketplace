import React, { memo, useEffect, useMemo } from "react";
import TimerToaster from "../../components/TimerToaster";
import Navbar from "../../layout/Main/Navbar";
import useAuth from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import useCart from "../../hooks/useCart";
import FloatingCartButton from "../../components/Home/FloatingCartButton";
import CartModal from "../../components/Home/CartModal";

const MainTemplate = memo(({ children, showFloatingCart = true }) => {
  const { user, isLoading: authLoading } = useAuth();
  const {
    cart,
    isFetched,
    fetchCart,
    handleDeleteCart,
    handleUpdateCart,
    isLoading: cartLoading,
  } = useCart();
  const cartModal = useModal();

  useEffect(() => {
    if (user && !isFetched.current) {
      fetchCart();
    }
  }, [user, fetchCart]);

  // Add this effect to refresh cart when modal opens
  useEffect(() => {
    if (cartModal.isOpen && user) {
      fetchCart();
    }
  }, [cartModal.isOpen, user, fetchCart]);

  const handleSubmittedCart = async (data) => {
    console.log(data);

    const success = await handleUpdateCart(data);
    if (success) {
      cartModal.closeModal();
    }
  };

  const handleSubmitDeleteCart = async (data) => {
    await handleDeleteCart(data);
  };

  // Memoize user data to prevent unnecessary re-renders
  const memoizedUser = useMemo(() => user, [user]);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <TimerToaster />
      <Navbar user={memoizedUser} />
      {children}

      {showFloatingCart && (
        <FloatingCartButton onClick={() => cartModal.openModal()} />
      )}

      {/* Cart Modal */}
      <CartModal
        isOpen={cartModal.isOpen}
        onClose={cartModal.closeModal}
        user={user}
        cart={cart}
        onDeleteItem={handleSubmitDeleteCart}
        onConfirm={handleSubmittedCart}
        isLoading={cartLoading}
      />
    </div>
  );
});

MainTemplate.displayName = "MainTemplate";

export default MainTemplate;
