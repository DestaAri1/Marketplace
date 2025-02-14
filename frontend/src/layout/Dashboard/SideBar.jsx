import React, { useState } from 'react';
import { Home, Settings } from 'lucide-react';
import SidebarHeader from '../../components/Sidebar/SidebarHeader';
import Navlink from '../../components/Sidebar/Navlink';
import UserManajementComponent from '../../components/Sidebar/UserManajementComponent';
import SellerManajement from '../../components/Sidebar/SellerManajement';

export default function SideBar({ isCollapsed, toggleCollapse, user }) {
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
      
      <SidebarHeader isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <li>
            <Navlink
              to={user?.role === 0 ? "/dashboard" : "/seller/dashboard"}
              icon={Home}
              title="Home"
              isCollapsed={isCollapsed}
            />
          </li>

          {user?.role === 0 ? 
            <UserManajementComponent
              isCollapsed={isCollapsed}
              activeDropdown={activeDropdown}
              subDropdown={subDropdown}
              toggleDropdown={toggleDropdown}
              toggleSubDropdown={toggleSubDropdown}
            /> : <SellerManajement
                    isCollapsed={isCollapsed}
                    activeDropdown={activeDropdown}
                    subDropdown={subDropdown}
                    toggleDropdown={toggleDropdown}
                    toggleSubDropdown={toggleSubDropdown}
                  />
          
          }


          <li>
            <Navlink
              to="/settings"
              icon={Settings}
              title="Settings"
              isCollapsed={isCollapsed}
            />
          </li>
        </ul>
      </nav>
    </aside>
    );
}
