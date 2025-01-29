import React from 'react'
import useDropdown from '../hooks/useDropdown';
import { showErrorToast } from '../utils/Toast';
import useLoading from '../hooks/useLoading';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function UserDropdown({userName}) {
    const navigate = useNavigate();
    const { isDropdownOpen, toggleDropdown } = useDropdown();
    const { isLoading, setLoading } = useLoading(false);
    const { logout } = useAuth()

    const handleLogout = async () => {
        setLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          window.location.reload();
          logout();
          navigate('/', { state: { message: 'Logout Success!' }});
        } catch (e) {
          showErrorToast(e.message);
        } finally {
          setLoading(false);
        }
      };

    return (
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
                    {userName.length > 15 ? `${userName.substring(0, 15)}...` : userName}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20 transition-all duration-200">
                    <Link href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition">
                        Profile
                    </Link>
                    <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition">
                        Settings
                    </a>
                    <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
                        onClick={handleLogout}
                    >
                        {isLoading ? <LoadingSpinner color="text-gray-900" /> : "Sign Out"}
                    </button>
                </div>
            )}
        </div>
    );
};

