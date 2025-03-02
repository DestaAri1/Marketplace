import React, { useState, useEffect, useRef } from "react";
import { Home, Settings } from "lucide-react";
import SidebarHeader from "../../components/Sidebar/SidebarHeader";
import Navlink from "../../components/Sidebar/Navlink";
import UserManajementComponent from "../../components/Sidebar/UserManajementComponent";
import SellerManajement from "../../components/Sidebar/SellerManajement";

export default function SideBar({ isCollapsed, toggleCollapse, user }) {
  // Use refs to track if initial hydration has occurred
  const isHydrated = useRef(false);

  // Initialize with default values
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [subDropdown, setSubDropdown] = useState(null);

  // Use ref to track if we should render the dropdown components
  const [shouldRender, setShouldRender] = useState(false);

  // Load saved state on first render only
  useEffect(() => {
    if (!isHydrated.current) {
      const storedActiveDropdown = localStorage.getItem("activeDropdown");
      const storedSubDropdown = localStorage.getItem("subDropdown");

      // Set states all at once to avoid partial updates
      if (storedActiveDropdown && storedActiveDropdown !== "") {
        setActiveDropdown(storedActiveDropdown);
      }

      if (storedSubDropdown && storedSubDropdown !== "") {
        setSubDropdown(storedSubDropdown);
      }

      // Mark as hydrated
      isHydrated.current = true;

      // Allow rendering after hydration
      setShouldRender(true);
    }
  }, []);

  // Save dropdown states to localStorage when they change
  useEffect(() => {
    if (isHydrated.current) {
      if (activeDropdown !== null) {
        localStorage.setItem("activeDropdown", activeDropdown);
      } else {
        localStorage.removeItem("activeDropdown");
      }
    }
  }, [activeDropdown]);

  useEffect(() => {
    if (isHydrated.current) {
      if (subDropdown !== null) {
        localStorage.setItem("subDropdown", subDropdown);
      } else {
        localStorage.removeItem("subDropdown");
      }
    }
  }, [subDropdown]);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);

    // If closing the active dropdown, also close any open subdropdown
    if (activeDropdown === dropdown) {
      setSubDropdown(null);
    }
  };

  const toggleSubDropdown = (dropdown) => {
    setSubDropdown(subDropdown === dropdown ? null : dropdown);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-gradient-to-b from-blue-900 to-blue-800 text-white
      ${isCollapsed ? "w-20" : "w-64"}
      transition-all duration-300 ease-in-out z-30 flex flex-col`}
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <li>
            <Navlink
              to={user?.role === 0 ? "/dashboard" : "/seller/dashboard"}
              icon={Home}
              title="Home"
              isCollapsed={isCollapsed}
            />
          </li>

          {shouldRender &&
            (user?.role === 0 ? (
              <UserManajementComponent
                isCollapsed={isCollapsed}
                activeDropdown={activeDropdown}
                subDropdown={subDropdown}
                toggleDropdown={toggleDropdown}
                toggleSubDropdown={toggleSubDropdown}
              />
            ) : (
              <SellerManajement
                isCollapsed={isCollapsed}
                activeDropdown={activeDropdown}
                subDropdown={subDropdown}
                toggleDropdown={toggleDropdown}
                toggleSubDropdown={toggleSubDropdown}
              />
            ))}

          <li>
            <Navlink
              to="/settings"
              icon={Settings}
              title="Settings"
              isCollapsed={isCollapsed}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
}
