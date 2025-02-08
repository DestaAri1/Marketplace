import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Home, Settings, Package, ShoppingCart, Users, FileText, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function SideBar({ isCollapsed, toggleCollapse }) {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [subDropdown, setSubDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const toggleSubDropdown = (dropdown) => {
        setSubDropdown(subDropdown === dropdown ? null : dropdown);
    };

    return (
        <aside className={`fixed inset-y-0 left-0 bg-gradient-to-b from-blue-900 to-blue-800 text-white 
            ${isCollapsed ? 'w-20' : 'w-64'} 
            transition-all duration-300 ease-in-out z-30 flex flex-col`}>
            
            <div className="p-4 border-b border-blue-700 flex justify-between items-center">
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-40 opacity-100'}`}>
                    <h1 className="text-2xl lg:my-[2px] xl:my-[1.5px] font-bold text-white whitespace-nowrap">Dashboard</h1>
                </div>
                <button 
                    onClick={toggleCollapse}
                    className="p-1 hover:bg-blue-700/50 rounded-lg transition-colors flex-shrink-0">
                    {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                    <li>
                        <Link to="/dashboard" 
                            className="flex items-center gap-3 p-3 hover:bg-blue-700/50 rounded-lg transition-colors text-sm"
                            title="Home">
                            <Home size={20} className="flex-shrink-0" />
                            <div className={`pl-[6px] transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap 
                                ${isCollapsed ? 'w-0 opacity-0' : 'w-40 opacity-100'}`}>
                                Home
                            </div>
                        </Link>
                    </li>

                    <li>
                        <button 
                            onClick={() => toggleDropdown('user')} 
                            className="flex items-center justify-between w-full p-3 hover:bg-blue-700/50 rounded-lg transition-colors group text-sm"
                            title="User Management">
                            <div className="flex items-center gap-3">
                                <Users size={20} className="flex-shrink-0" />
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
                                    ${isCollapsed ? 'w-0 opacity-0' : 'w-32 opacity-100'}`}>
                                    User Management
                                </div>
                            </div>
                            <ChevronDown size={16} className={`flex-shrink-0 transition-transform duration-300 
                                ${activeDropdown === 'user' ? 'rotate-180' : ''} 
                                ${isCollapsed ? 'hidden' : 'block'}`} />
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out 
                            ${activeDropdown === 'user' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="space-y-1 pt-2">
                                <button 
                                    onClick={() => toggleSubDropdown('seller')} 
                                    className={`flex items-center justify-between w-full p-2 hover:bg-blue-700/50 rounded-lg transition-colors 
                                        ${isCollapsed ? 'px-2' : 'px-6'} text-sm`}>
                                    <div className="flex items-center gap-3">
                                        <Package size={18} className="flex-shrink-0" />
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap 
                                            ${isCollapsed ? 'w-0 opacity-0' : 'w-24 opacity-100'}`}>
                                            Seller
                                        </div>
                                    </div>
                                    <ChevronDown size={16} className={`flex-shrink-0 transition-transform duration-300 
                                        ${subDropdown === 'seller' ? 'rotate-180' : ''} 
                                        ${isCollapsed ? 'hidden' : 'block'}`} />
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out 
                                    ${subDropdown === 'seller' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                                    ${isCollapsed ? 'pl-2' : 'pl-8'}`}>
                                    <Link to="/manage-products" className="flex items-center gap-3 p-2 hover:bg-blue-700/50 rounded-lg text-sm">
                                        <Package size={16} className="flex-shrink-0" />
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap 
                                            ${isCollapsed ? 'w-0 opacity-0' : 'w-32 opacity-100'}`}>
                                            Manage Products
                                        </div>
                                    </Link>
                                    <Link to="/orders" className="flex items-center gap-3 p-2 hover:bg-blue-700/50 rounded-lg text-sm">
                                        <ShoppingCart size={16} className="flex-shrink-0" />
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap 
                                            ${isCollapsed ? 'w-0 opacity-0' : 'w-32 opacity-100'}`}>
                                            Orders
                                        </div>
                                    </Link>
                                </div>

                                <button 
                                    onClick={() => toggleSubDropdown('normalUser')} 
                                    className={`flex items-center justify-between w-full p-2 hover:bg-blue-700/50 rounded-lg transition-colors 
                                        ${isCollapsed ? 'px-2' : 'px-6'} text-sm`}>
                                    <div className="flex items-center gap-3">
                                        <Users size={18} className="flex-shrink-0" />
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap 
                                            ${isCollapsed ? 'w-0 opacity-0' : 'w-24 opacity-100'}`}>
                                            Normal User
                                        </div>
                                    </div>
                                    <ChevronDown size={16} className={`flex-shrink-0 transition-transform duration-300 
                                        ${subDropdown === 'normalUser' ? 'rotate-180' : ''} 
                                        ${isCollapsed ? 'hidden' : 'block'}`} />
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out 
                                    ${subDropdown === 'normalUser' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                                    ${isCollapsed ? 'pl-2' : 'pl-8'}`}>
                                    <Link to="/user-list" className="flex items-center gap-3 p-2 hover:bg-blue-700/50 rounded-lg text-sm">
                                        <Users size={16} className="flex-shrink-0" />
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap 
                                            ${isCollapsed ? 'w-0 opacity-0' : 'w-32 opacity-100'}`}>
                                            User List
                                        </div>
                                    </Link>
                                    <Link to="/dashboard/user_request" className="flex items-center gap-3 p-2 hover:bg-blue-700/50 rounded-lg text-sm">
                                        <FileText size={16} className="flex-shrink-0" />
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap 
                                            ${isCollapsed ? 'w-0 opacity-0' : 'w-32 opacity-100'}`}>
                                            Requests
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <Link to="/settings" 
                            className="flex items-center gap-3 p-3 hover:bg-blue-700/50 rounded-lg transition-colors text-sm"
                            title="Settings">
                            <Settings size={20} className="flex-shrink-0" />
                            <div className={`pl-2 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
                                ${isCollapsed ? 'w-0 opacity-0' : 'w-40 opacity-100'}`}>
                                Settings
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
