import React from 'react'
import DropdownButton from './DropdownButton'
import { Package, ArchiveRestore} from 'lucide-react';
import DropdownContent from './DropdownContent';
import SubNavlink from './SubNavlink';

export default function SellerManajement({ isCollapsed, activeDropdown, subDropdown, toggleDropdown, toggleSubDropdown }) {
  return (
    <li>
        <DropdownButton
            title={"Product"}
            icon={Package}
            isCollapsed={isCollapsed}
            isActive={activeDropdown === 'user'}
            onClick={() => toggleDropdown('user')}
          />

            <DropdownContent isActive={activeDropdown === 'user'}>
                <SubNavlink
                to="/seller/archive-product"
                icon={ArchiveRestore}
                title="Archive"
                isCollapsed={isCollapsed}
                classes={isCollapsed ? 'ml-4' : "ml-8"}
                />
                <SubNavlink
                to="/seller/products"
                icon={Package}
                title="Products"
                isCollapsed={isCollapsed}
                classes={isCollapsed ? 'ml-4' : "ml-8"}
                />
            </DropdownContent>
        
    </li>
      
  )
}
