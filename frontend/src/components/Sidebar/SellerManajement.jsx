import React, { memo } from "react";
import DropdownButton from "./DropdownButton";
import { Package } from "lucide-react";
import DropdownContent from "./DropdownContent";
import SubNavlink from "./SubNavlink";

// Use memo to prevent unnecessary re-renders
const SellerManajement = memo(function SellerManajement({
  isCollapsed,
  activeDropdown,
  subDropdown,
  toggleDropdown,
  toggleSubDropdown,
}) {
  const isActive = activeDropdown === "product";

  return (
    <li className="dropdown-container">
      <DropdownButton
        title={"Product"}
        icon={Package}
        isCollapsed={isCollapsed}
        isActive={isActive}
        onClick={() => toggleDropdown("product")}
      />

      <DropdownContent isActive={isActive}>
        <SubNavlink
          to="/seller/products"
          icon={Package}
          title="Products"
          isCollapsed={isCollapsed}
          classes={isCollapsed ? "ml-4" : "ml-8"}
        />
      </DropdownContent>
    </li>
  );
});

export default SellerManajement;
