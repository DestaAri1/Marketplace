import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  // Add this to prevent the removalReason error
  onClose: () => {},
  // Optional: Add this if you want to ensure cleanup
  onOpen: () => {},
};

export const showSuccessToast = (message) => {
  // Clear any existing toasts before showing new one
  toast.dismiss();
  return toast.success(message, toastConfig);
};

export const showErrorToast = (message) => {
  // Clear any existing toasts before showing new one
  toast.dismiss();
  return toast.error(message, toastConfig);
};
