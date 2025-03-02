import React from "react";

export default function DropdownContent({ isActive, children }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out 
        ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
    >
      <div className="space-y-1 pt-2">{children}</div>
    </div>
  );
}
