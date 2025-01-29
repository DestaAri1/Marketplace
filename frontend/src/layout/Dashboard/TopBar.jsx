import React from 'react'

export default function TopBar({ toggleSidebar }) {
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
      <div className="flex items-center">
        <span className="mr-4">John Doe</span>
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
    );
};
