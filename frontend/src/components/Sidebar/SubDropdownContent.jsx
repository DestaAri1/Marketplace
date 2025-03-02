import React from "react";

export default function SubDropdownContent({
  isActive,
  isCollapsed,
  children,
}) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out 
        ${isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        ${isCollapsed ? "pl-2" : "pl-8"}`}
    >
      {children}
    </div>
  );
}
