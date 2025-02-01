import React from 'react'
import { showErrorToast } from '../utils/Toast';
import useLoading from '../hooks/useLoading';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

export default function UserDropdown({isDropdownOpen, role}) {
    const navigate = useNavigate();
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
        <>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute text-left right-0 top-12 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20 transition-all duration-200">
                    {role === 0 && 
                        <Link to={'/dashboard'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition">
                            Dashboard
                        </Link>
                    }
                    <Link href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition">
                        Profile
                    </Link>
                    <Link href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition">
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
};

