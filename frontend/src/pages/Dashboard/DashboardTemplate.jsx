import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import SideBar from '../../layout/Dashboard/SideBar';
import TopBar from '../../layout/Dashboard/TopBar';
import { ToastContainer } from 'react-toastify';

export default function DashboardTemplate({
  children,
  title = "Dashboard",
  showButton = false,
  buttonTitle = "Action",
  onButtonClick
}) {
  // Track if component has been hydrated
  const isHydrated = useRef(false);
  
  // Get the stored value only once during initialization
  const storedValue = useRef(localStorage.getItem('sidebarCollapsed'));
  
  // Initialize with the stored value or default to false
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (storedValue.current) {
      try {
        return JSON.parse(storedValue.current);
      } catch (e) {
        return false;
      }
    }
    return false;
  });
  
  const { user } = useAuth();
  
  // Only update localStorage after initial render
  useEffect(() => {
    if (!isHydrated.current) {
      isHydrated.current = true;
      return;
    }
    
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);
  
  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <TopBar user={user} isCollapsed={isCollapsed} />
      <SideBar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} user={user} />
      
      <main className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
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