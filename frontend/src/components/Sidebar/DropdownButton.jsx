import { ChevronDown } from 'lucide-react';
import React from 'react'

export default function DropdownButton({ title, icon, isCollapsed, isActive, onClick }) {
    const Icon = icon;
  return (
    <button 
      onClick={onClick} 
      className="flex items-center text-left justify-between w-full p-3 hover:bg-blue-700/50 rounded-lg transition-colors group text-sm"
      title={title}>
      <div className="flex items-center gap-3">
        <Icon size={20} className="flex-shrink-0" />
        <div className={`transition-all duration-300 pl-2 ease-in-out overflow-hidden whitespace-nowrap
          ${isCollapsed ? 'w-0 opacity-0' : 'w-32 opacity-100'}`}>
          {title}
        </div>
      </div>
      <ChevronDown size={16} className={`flex-shrink-0 transition-transform duration-300 
        ${isActive ? 'rotate-180' : ''} 
        ${isCollapsed ? 'hidden' : 'block'}`} />
    </button>
  )
}
