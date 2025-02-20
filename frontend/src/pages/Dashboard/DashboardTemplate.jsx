import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import SideBar from '../../layout/Dashboard/SideBar';
import TopBar from '../../layout/Dashboard/TopBar';
import { ToastContainer } from 'react-toastify';

export default function DashboardTemplate({ 
  children, 
  title = "Dashboard", 
  showButton = false, // Props untuk mengontrol visibilitas tombol
  buttonTitle = "Action", // Props untuk teks tombol
  onButtonClick // Props untuk aksi tombol
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <TopBar user={user} isCollapsed={isCollapsed} />
      <SideBar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} user={user} />

      <main className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 pt-20">
          {/* Container untuk title dan tombol */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

            {/* Tombol muncul hanya jika `showButton` bernilai true */}
            {showButton && (
              <button 
                onClick={onButtonClick} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              >
                {buttonTitle}
              </button>
            )}
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}