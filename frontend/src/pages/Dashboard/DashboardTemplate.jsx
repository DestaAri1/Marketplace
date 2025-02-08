import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import SideBar from '../../layout/Dashboard/SideBar';
import TopBar from '../../layout/Dashboard/TopBar';

export default function DashboardTemplate({ children, title = "Dashboard" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
  };

  return (
      <div className="min-h-screen bg-gray-50">
          <TopBar 
              user={user} 
              isCollapsed={isCollapsed} 
          />
          <SideBar 
              isCollapsed={isCollapsed}
              toggleCollapse={toggleCollapse}
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