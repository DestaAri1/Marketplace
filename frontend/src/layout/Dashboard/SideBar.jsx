import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function SideBar({ isOpen }) {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [subDropdown, setSubDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const toggleSubDropdown = (dropdown) => {
        setSubDropdown(subDropdown === dropdown ? null : dropdown);
    };

    return (
        <div className={`fixed inset-y-0 left-0 bg-blue-800 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <ul className="mt-12">
                    <li className="mb-2">
                        <Link to="#" className="block p-2 hover:bg-blue-700 rounded">Home</Link>
                    </li>
                    <li className="mb-2 relative">
                        <button onClick={() => toggleDropdown('user')} className="flex justify-between items-center w-full text-left p-2 hover:bg-blue-700 rounded">
                            User {activeDropdown === 'user' ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        <div className={`ml-4 bg-blue-700 rounded mt-1 overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === 'user' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <ul>
                                <li className="relative">
                                    <button onClick={() => toggleSubDropdown('seller')} className="flex justify-between items-center w-full text-left p-2 hover:bg-blue-600 rounded">
                                        Seller {subDropdown === 'seller' ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                    <div className={`ml-4 bg-blue-600 rounded mt-1 overflow-hidden transition-all duration-300 ease-in-out ${subDropdown === 'seller' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <ul>
                                            <li>
                                                <Link to="#" className="block p-2 hover:bg-blue-500 rounded">Manage Products</Link>
                                            </li>
                                            <li>
                                                <Link to="#" className="block p-2 hover:bg-blue-500 rounded">Orders</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="relative">
                                    <button onClick={() => toggleSubDropdown('normalUser')} className="flex justify-between items-center w-full text-left p-2 hover:bg-blue-600 rounded">
                                        Normal User {subDropdown === 'normalUser' ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                    <div className={`ml-4 bg-blue-600 rounded mt-1 overflow-hidden transition-all duration-300 ease-in-out ${subDropdown === 'normalUser' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <ul>
                                            <li>
                                                <Link to="#" className="block p-2 hover:bg-blue-500 rounded">Profile</Link>
                                            </li>
                                            <li>
                                                <Link to="#" className="block p-2 hover:bg-blue-500 rounded">Orders</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-2">
                        <Link to="#" className="block p-2 hover:bg-blue-700 rounded">Settings</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
