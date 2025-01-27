import React, { useEffect, useState } from 'react'

export default function UserDropdown({userName}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.user-dropdown')) {
                closeDropdown();
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="flex items-center space-x-4 relative user-dropdown">
            <button 
                onClick={toggleDropdown}
                className="relative flex items-center space-x-2 border-2 border-white rounded-full focus:outline-none focus:border-gray-300 p-1"
            >
                <img 
                    className="w-8 h-8 object-cover rounded-full" 
                    src="https://via.placeholder.com/40" 
                    alt="User dropdown" 
                />
                <span className="text-gray-800 text-sm font-medium">
                    {userName.length > 10 ? `${userName.substring(0, 10)}...` : userName}
                </span>
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                    <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                </div>
            )}
        </div>
    );
};

