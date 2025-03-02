import React from "react";
import { Link } from "react-router-dom";

export default function Navlink({ to, icon, title, isCollapsed }) {
  const Icon = icon;
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 hover:bg-blue-700/50 rounded-lg transition-colors text-sm"
      title={title}
    >
      <Icon size={20} className="flex-shrink-0" />
      <div
        className={`pl-[6px] transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap 
        ${isCollapsed ? "w-0 opacity-0" : "w-40 opacity-100"}`}
      >
        {title}
      </div>
    </Link>
  );
}
