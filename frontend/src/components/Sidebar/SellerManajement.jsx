import React, { memo } from "react";
import DropdownButton from "./DropdownButton";
import { BadgePercent, List, Megaphone, Package } from "lucide-react";
import DropdownContent from "./DropdownContent";
import SubNavlink from "./SubNavlink";
import Navlink from "./Navlink";

// Use memo to prevent unnecessary re-renders
const SellerManajement = memo(function SellerManajement({
  isCollapsed,
  activeDropdown,
  subDropdown,
  toggleDropdown,
  toggleSubDropdown,
}) {
  const isActive = activeDropdown === "product";
  const isActivePromotion = activeDropdown === "promotion";

  return (
    <li className="dropdown-container">
      <Navlink
        to="/seller/sale"
        icon={List}
        title="Sale"
        isCollapsed={isCollapsed}
      />

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

      <DropdownButton
        title={"Promotion"}
        icon={Megaphone}
        isCollapsed={isCollapsed}
        isActive={activeDropdown === "promotion"}
        onClick={() => toggleDropdown("promotion")}
      />

      <DropdownContent isActive={isActivePromotion}>
        <SubNavlink
          to="/seller/discount"
          icon={BadgePercent}
          title="Discount"
          isCollapsed={isCollapsed}
          classes={isCollapsed ? "ml-4" : "ml-8"}
        />
      </DropdownContent>
    </li>
  );
});

export default SellerManajement;
