import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import TopBar from '../../layout/Dashboard/TopBar';
import SideBar from '../../layout/Dashboard/SideBar';
import useAuth from '../../hooks/useAuth';

export default function SellerDashboardTemplate({ children, title = "Dashboard" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <ToastContainer/>
        <TopBar 
            user={user} 
            isCollapsed={isCollapsed} 
        />
        <SideBar 
            isCollapsed={isCollapsed}
            toggleCollapse={toggleCollapse}
            user={user}
        />      
          <main className={`transition-all duration-300 ease-in-out
              ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
              <div className="p-6 pt-20">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h1>
                  {children}
              </div>
          </main>
      </div>
  );
}
