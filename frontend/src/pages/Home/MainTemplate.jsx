import React, {
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
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
    const [isCartLoaded, setIsCartLoaded] = useState(false);

    // Fetch cart when user exists, regardless of modal state
    useEffect(() => {
      localStorage.setItem("userRole", user?.role);
      localStorage.removeItem("subDropdown");
      localStorage.removeItem("activeDropdown");

      if (user && !isFetched.current) {
        fetchCart().then(() => {
          setIsCartLoaded(true);
        });
      }
    }, [user, fetchCart, isFetched]);

    const handleSubmittedCart = async (data) => {
      const success = await handleUpdateCart(data);
      if (success) {
        await fetchCart();
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
      <div className="home-container min-h-screen pt-16 md:pt-0">
        {showTimerToaster && <TimerToaster />}
        <Navbar user={memoizedUser} />

        {/* Adjust main content padding for mobile/desktop */}
        <main className="px-4 md:px-6 lg:px-8">{children}</main>

        {showFloatingCart && (
          <FloatingCartButton
            onClick={cartModal.openModal}
            disabled={!user || (user && !isCartLoaded)}
            className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8"
          />
        )}

        <Suspense fallback={<Fallback />}>
          <CartModal
            isOpen={cartModal.isOpen}
            onClose={cartModal.closeModal}
            user={user}
            cart={cart}
            onDeleteItem={handleSubmitDeleteCart}
            onConfirm={handleSubmittedCart}
            isLoading={cartLoading}
            refreshCart={fetchCart}
          />
        </Suspense>
      </div>
    );
  }
);

MainTemplate.displayName = "MainTemplate";

export default MainTemplate;
