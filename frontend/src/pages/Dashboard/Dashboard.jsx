import React, { useState } from 'react'
import TopBar from '../../layout/Dashboard/TopBar';
import SideBar from '../../layout/Dashboard/SideBar';

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
    <div className="min-h-screen bg-gray-100">
      <TopBar toggleSidebar={toggleSidebar} />
      <SideBar isOpen={isSidebarOpen} />
      <div className={`pt-20 pl-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <p className="mt-4">This is a simple dashboard layout with a sidebar and top bar.</p>
      </div>
    </div>
  )
}
