import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showSuccessToast } from "../utils/Toast";
import { ToastContainer } from "react-toastify";

export default function TimerToaster() {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;

  useEffect(() => {
    // Jika ada pesan dalam location state
    if (message) {
      // Tampilkan toast
      showSuccessToast(message);

      // Hapus message dari location state setelah 2 detik
      const timer = setTimeout(() => {
        navigate(location.pathname, {
          replace: true,
          state: {}, // Reset state
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, navigate, location.pathname]);

  return <ToastContainer />;
}
