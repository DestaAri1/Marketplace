import React, { memo, useEffect, useMemo } from "react";
import TimerToaster from "../../components/TimerToaster";
import Navbar from "../../layout/Main/Navbar";
import useAuth from "../../hooks/useAuth";
import { ShoppingCart } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import CartModal from "../../components/Home/CartModal";
import useCart from "../../hooks/useCart";

const MainTemplate = memo(({ children }) => {
  const { user, isLoading } = useAuth();
  const { cart, isFetched, fetchCart } = useCart();
  const cartModal = useModal();

  useEffect(() => {
    if (user && !isFetched.current) {
      fetchCart();
    }
  }, [user, fetchCart]);

  // Memoize user data untuk mencegah re-render yang tidak perlu
  const memoizedUser = useMemo(() => user, [user]);

  if (isLoading) {
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
      />
    </div>
  );
});

MainTemplate.displayName = "MainTemplate";

export default MainTemplate;
