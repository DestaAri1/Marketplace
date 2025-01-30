import React from 'react'
import useDropdown from '../../hooks/useDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import UserDropdown from '../../components/UserDropdown';

export default function TopBar({ toggleSidebar, user }) {
    const { isDropdownOpen, toggleDropdown } = useDropdown()
    const { username = "Guest", role = "2" } = user || {};
  
    return (
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative user-dropdown">
            <button
                onClick={toggleDropdown}
                className="relative flex items-center space-x-3 border-2 border-gray-300 hover:border-blue-800 rounded-full focus:outline-none transition-all duration-200 p-1"
            >
                {/* Profile Image with Border */}
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-800 p-0.5 overflow-hidden">
                    <FontAwesomeIcon icon={faUser} className="w-full h-full" />
                </div>

                {/* User Name */}
                <span className="text-sm font-medium text-left truncate w-[120px] hover:text-blue-800">
                    {username.length > 15 ? `${username.substring(0, 15)}...` : username}
                </span>
                <UserDropdown isDropdownOpen={isDropdownOpen} role={role}/>
            </button>
        </div>
      </div>
    );
};
