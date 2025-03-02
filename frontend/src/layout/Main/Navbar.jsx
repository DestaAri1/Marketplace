import React, { useEffect, useCallback } from "react";
import UserDropdown from "../../components/UserDropdown";
import { Link } from "react-router-dom";
import useDropdown from "../../hooks/useDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useSeller from "../../hooks/useSeller";

export default function Navbar({ user }) {
  const { isDropdownOpen, toggleDropdown } = useDropdown();
  const { username = "Guest", role = "User" } = user || {};

  const { status, fetchStatus } = useSeller();

  // Hapus penggunaan state dataFetched karena tidak diperlukan lagi

  // Fungsi untuk memperbarui status
  const refreshStatus = useCallback(() => {
    if (user?.role === 2) {
      fetchStatus();
    }
  }, [user, fetchStatus]);

  // Panggil fetchStatus saat komponen dimuat jika user adalah buyer
  useEffect(() => {
    if (user?.role === 2) {
      fetchStatus();
    }
  }, [user, fetchStatus]);

  return (
    <header className="fixed top-0 left-0 w-full bg-indigo-600 text-white py-4 shadow-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Navbar Left */}
        <div className="flex w-[186px] items-center space-x-4">
          <span className="text-base font-bold">Marketplace</span>
        </div>

        {/* Navbar Center */}
        <nav className="space-x-6">
          <a href="#promotions" className="hover:underline">
            Promotions
          </a>
          <a href="#products" className="hover:underline">
            Products
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>

        {/* Navbar Right */}
        {user !== null ? (
          <>
            <div className="relative user-dropdown w-[186px]">
              {/* Profile Button */}
              <button
                onClick={toggleDropdown}
                className="relative flex items-center space-x-3 border-2 border-gray-300 hover:border-green-500 rounded-full focus:outline-none transition-all duration-200 p-1"
              >
                {/* Profile Image with Border */}
                <div className="w-10 h-10 rounded-full border-2 border-white hover:border-green-500 p-0.5 overflow-hidden">
                  <FontAwesomeIcon icon={faUser} className="w-full h-full" />
                </div>

                {/* User Name */}
                <span className="text-sm font-medium text-left truncate w-[120px] text-white hover:text-purple-500">
                  {username.length > 15
                    ? `${username.substring(0, 15)}...`
                    : username}
                </span>
              </button>
              <UserDropdown
                isDropdownOpen={isDropdownOpen}
                role={role}
                status={status}
                onStatusChange={refreshStatus}
              />
            </div>
          </>
        ) : (
          <Link
            className="w-[186px] rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white hover:text-slate-600 hover:bg-slate-200 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            to={"/login"}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
