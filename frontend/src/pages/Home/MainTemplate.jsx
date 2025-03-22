import React, { lazy, memo, Suspense, useEffect, useMemo } from "react";
import TimerToaster from "../../components/TimerToaster";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Navbar from "../../layout/Main/Navbar";
import FloatingCartButton from "../../components/Home/FloatingCartButton";
import Fallback from "../../components/Fallback";
import { useModal } from "../../hooks/useModal";

const CartModal = lazy(() => import("../../components/Home/CartModal"));

const MainTemplate = memo(
  ({ children, showFloatingCart = true, showTimerToaster = true }) => {
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

    // Only fetch cart when needed and user exists
    useEffect(() => {
      if (user && !isFetched.current && cartModal.isOpen) {
        fetchCart();
      }
    }, [user, fetchCart, cartModal.isOpen, isFetched]);

    const handleSubmittedCart = async (data) => {
      const success = await handleUpdateCart(data);
      if (success) {
        cartModal.closeModal();
      }
    };

    const handleSubmitDeleteCart = async (data) => {
      await handleDeleteCart(data);
    };

    // Memoize user to prevent unnecessary re-renders
    const memoizedUser = useMemo(() => user, [user]);

    if (authLoading) {
      return <Fallback />;
    }

    return (
      <div className="home-container">
        {showTimerToaster && <TimerToaster />}
        <Navbar user={memoizedUser} />
        {children}

        {showFloatingCart && (
          <FloatingCartButton onClick={cartModal.openModal} />
        )}

        {cartModal.isOpen && (
          <Suspense fallback={<Fallback />}>
            <CartModal
              isOpen={cartModal.isOpen}
              onClose={cartModal.closeModal}
              user={user}
              cart={cart}
              onDeleteItem={handleSubmitDeleteCart}
              onConfirm={handleSubmittedCart}
              isLoading={cartLoading}
            />
          </Suspense>
        )}
      </div>
    );
  }
);

MainTemplate.displayName = "MainTemplate";

export default MainTemplate;
