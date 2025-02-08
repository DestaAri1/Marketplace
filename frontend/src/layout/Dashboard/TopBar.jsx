import React from 'react';
import { User } from 'lucide-react';
import UserDropdown from '../../components/UserDropdown';
import useDropdown from '../../hooks/useDropdown';

export default function TopBar({ user, isCollapsed }) {
  const { isDropdownOpen, toggleDropdown } = useDropdown();
  const { username = "Guest", role = "2" } = user || {};

  return (
      <header className={`fixed top-0 right-0 bg-white border-b z-20 transition-all duration-300
          ${isCollapsed ? 'left-16' : 'left-64'}`}>
          <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-1 max-w-xl">
                      <input
                          type="text"
                          placeholder="Search..."
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                   placeholder-gray-400"
                      />
                  </div>
              </div>
              <div className="relative user-dropdown w-[186px]">
                    {/* Profile Button */}
                    <button
                        onClick={toggleDropdown}
                        className="relative flex items-center space-x-3 border-2 border-gray-200 hover:border-blue-500 rounded-full focus:outline-none transition-all duration-200 p-1"
                    >
                        {/* Profile Image with Border */}
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User size={30} className="text-gray-600" />
                        </div>

                        {/* User Name */}
                        <span className="text-sm font-medium text-left truncate w-[120px]">
                            {username.length > 15 ? `${username.substring(0, 15)}...` : username}
                        </span>
                    </button>
                    <UserDropdown isDropdownOpen={isDropdownOpen} role={role}/>
                </div>
          </div>
      </header>
  );
}