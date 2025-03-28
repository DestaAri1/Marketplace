import React, { useEffect, useState } from "react";
import UserDropdown from "../../components/UserDropdown";
import { Link, NavLink } from "react-router-dom";
import useDropdown from "../../hooks/useDropdown";
import useSeller from "../../hooks/useSeller";

export default function Navbar({ user }) {
  const { isDropdownOpen, toggleDropdown } = useDropdown();
  const { status, fetchStatus } = useSeller();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      key: 1,
      label: "Home",
      link: "/",
    },
    {
      key: 2,
      label: "Products",
      link: "/products",
    },
  ];

  const imageUrl = process.env.REACT_APP_PROFILE_PICTURE_URL;

  // Only fetch seller status once when the component mounts if user is a seller
  useEffect(() => {
    if (user?.role === 2) {
      fetchStatus();
    }
  }, [user?.id, user?.username, user?.biodata, fetchStatus]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-indigo-600 text-white py-2 shadow-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Mobile Menu Toggle (Only visible on mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Navbar Left - Logo */}
        <div className="flex items-center space-x-4">
          <span className="text-base font-bold">Marketplace</span>
        </div>

        {/* Navbar Center - Navigation Links */}
        <nav
          className={`
          absolute top-full left-0 w-full bg-indigo-600 
          md:static md:w-auto md:bg-transparent
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "block" : "hidden"}
          md:block
        `}
        >
          <div className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
            {menuItems.map((item) => (
              <NavLink
                key={item.key}
                to={`${item.link}`}
                className={({ isActive }) => `
                  block py-2 md:py-0 
                  ${isActive ? `font-bold` : ``}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Navbar Right - User Section */}
        <div className="flex items-center">
          {user !== null ? (
            <div className="relative user-dropdown">
              {/* Profile Button */}
              <button
                onClick={toggleDropdown}
                className="relative flex items-center space-x-3 border-2 border-gray-300 hover:border-green-500 rounded-full focus:outline-none transition-all duration-200 p-1"
              >
                {/* Profile Image with Border */}
                <div className="w-10 h-10 rounded-full border-2 border-white hover:border-green-500 p-0.5 overflow-hidden">
                  <img
                    src={imageUrl + (user?.biodata?.image || "")}
                    alt={user?.username || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* User Name - Hidden on mobile */}
                <span className="hidden md:block text-sm font-medium text-left truncate w-[120px] text-white hover:text-purple-500">
                  {user?.username
                    ? user.username.length > 15
                      ? `${user.username.substring(0, 15)}...`
                      : user.username
                    : "Guest"}
                </span>
              </button>
              <UserDropdown
                isDropdownOpen={isDropdownOpen}
                role={user?.role}
                status={status}
                onStatusChange={fetchStatus}
              />
            </div>
          ) : (
            <Link
              className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white hover:text-slate-600 hover:bg-slate-200 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              to={"/login"}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
