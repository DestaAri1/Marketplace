// MainTemplate.jsx
import React, { lazy, memo, Suspense, useEffect, useMemo } from "react";
import TimerToaster from "../../components/TimerToaster";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Navbar from "../../layout/Main/Navbar"; // Tidak di-lazy load
import FloatingCartButton from "../../components/Home/FloatingCartButton"; // Tidak di-lazy load
import Fallback from "../../components/Fallback"; // Komponen fallback yang lebih baik
import { useModal } from "../../hooks/useModal";
import { ToastContainer } from "react-toastify";

const CartModal = lazy(() => import("../../components/Home/CartModal"));

const MainTemplate = memo(({ children, showFloatingCart = true, showTimerToaster = true}) => {
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

  const handleSubmitDeleteCart = async (data) => {
    await handleDeleteCart(data);
  };

  const memoizedUser = useMemo(() => user, [user]);

  if (authLoading) {
    return <Fallback />;
  }

  return (
    <div className="home-container">
      {showTimerToaster && <TimerToaster />}
      {/* <ToastContainer/> */}
      <Navbar user={memoizedUser} />
      {children}

      {showFloatingCart && <FloatingCartButton onClick={cartModal.openModal} />}

      <Suspense>
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
    </div>
  );
});

MainTemplate.displayName = "MainTemplate";

export default MainTemplate;
