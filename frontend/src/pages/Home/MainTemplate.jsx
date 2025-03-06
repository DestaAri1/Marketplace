import React, { memo, useEffect, useMemo } from "react";
import TimerToaster from "../../components/TimerToaster";
import Navbar from "../../layout/Main/Navbar";
import useAuth from "../../hooks/useAuth";
import { ShoppingCart } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import CartModal from "../../components/Home/CartModal";
import useCart from "../../hooks/useCart";

const MainTemplate = memo(({ children }) => {
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
    const success = await handleUpdateCart(data);
    if (success) {
      cartModal.closeModal();
    }
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

      {/* Floating Cart Button */}
      <button
        onClick={() => cartModal.openModal()}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
      >
        <ShoppingCart size={24} />
      </button>

      {/* Cart Modal */}
      <CartModal
        isOpen={cartModal.isOpen}
        onClose={cartModal.closeModal}
        user={user}
        cart={cart}
        onDeleteItem={handleDeleteCart}
        onConfirm={handleSubmittedCart}
        isLoading={cartLoading}
      />
    </div>
  );
});

MainTemplate.displayName = "MainTemplate";

export default MainTemplate;
