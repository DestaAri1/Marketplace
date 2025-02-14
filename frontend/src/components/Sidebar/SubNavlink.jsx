import React from 'react'
import { Link } from 'react-router-dom';

export default function SubNavlink({ to, icon, title, isCollapsed, classes }) {
    const Icon = icon;
  return (
    <Link to={to} title={title} className={`flex items-center gap-3 p-2 hover:bg-blue-700/50 rounded-lg text-sm ${classes}`}>
      <Icon size={16} className="flex-shrink-0" />
      <div className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap 
        ${isCollapsed ? 'w-0 opacity-0' : 'w-32 opacity-100'}`}>
        {title}
      </div>
    </Link>
  )
}
