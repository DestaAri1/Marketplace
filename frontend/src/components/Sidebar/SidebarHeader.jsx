import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import React from 'react'

export default function SidebarHeader({ isCollapsed, toggleCollapse }) {
  return (
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
  )
}
