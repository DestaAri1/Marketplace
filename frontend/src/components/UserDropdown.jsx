import React from "react";
import { showErrorToast } from "../utils/Toast";
import useLoading from "../hooks/useLoading";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import useSeller from "../hooks/useSeller";

export default function UserDropdown({
  isDropdownOpen,
  role,
  status,
  onStatusChange,
}) {
  const navigate = useNavigate();
  const { isLoading, setLoading } = useLoading(false);
  const { logout } = useAuth();
  const { UpgradeSellerHook } = useSeller();

  const location = useLocation();
  const isSellerOrAdminRoute =
    location.pathname.startsWith("/seller/") ||
    location.pathname.startsWith("/admin/");

  const handleLogout = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
      logout();
      navigate("/", { state: { message: "Logout Success!" } });
    } catch (e) {
      showErrorToast(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UpgradeSellerHook();
      if (response && onStatusChange) {
        onStatusChange(); // Memanggil callback untuk memperbarui status di Navbar
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute text-left right-0 top-12 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20 transition-all duration-200">
          {(role === 0 || role === 1) && (
            <Link
              to={
                isSellerOrAdminRoute
                  ? "/"
                  : role === 0
                  ? "/admin/dashboard"
                  : "/seller/dashboard"
              }
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
            >
              {isSellerOrAdminRoute ? "Home" : "Dashboard"}
            </Link>
          )}
          <Link
            to={"/profile/biodata"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
          >
            Profile
          </Link>
          {role === 2 && (
            <form
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
              onSubmit={handleSubmit}
            >
              <button type="submit" disabled={!!status?.message}>
                Upgrade to Seller {status?.message}
              </button>
            </form>
          )}
          <Link
            to={"/profile/setting"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
          >
            Settings
          </Link>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
            onClick={handleLogout}
          >
            {isLoading ? <LoadingSpinner color="text-gray-900" /> : "Sign Out"}
          </button>
        </div>
      )}
    </>
  );
}
