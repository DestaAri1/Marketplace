import React from 'react'
import DropdownButton from './DropdownButton'
import { Package, ShoppingCart, Users, FileText, List} from 'lucide-react';
import DropdownContent from './DropdownContent';
import SubDropdownButton from './SubDropdownButton';
import SubDropdownContent from './SubDropdownContent';
import SubNavlink from './SubNavlink';

export default function UserManajementComponent({ isCollapsed, activeDropdown, subDropdown, toggleDropdown, toggleSubDropdown }) {
  return (
    <li>
      <DropdownButton
        title={"Management"}
        icon={Users}
        isCollapsed={isCollapsed}
        isActive={activeDropdown === 'user'}
        onClick={() => toggleDropdown('user')}
      />

      <DropdownContent isActive={activeDropdown === 'user'}>
        <SubDropdownButton
          title="Product"
          icon={Package}
          isCollapsed={isCollapsed}
          isActive={subDropdown === 'seller'}
          onClick={() => toggleSubDropdown('seller')}
        />

        <SubDropdownContent isActive={subDropdown === 'seller'} isCollapsed={isCollapsed}>
          <SubNavlink
            to="/dashboard/manage-category"
            icon={List}
            title="Manage Category"
            isCollapsed={isCollapsed}
          />
          <SubNavlink
            to="/orders"
            icon={ShoppingCart}
            title="Orders"
            isCollapsed={isCollapsed}
          />
        </SubDropdownContent>

        <SubDropdownButton
          title="Normal User"
          icon={Users}
          isCollapsed={isCollapsed}
          isActive={subDropdown === 'normalUser'}
          onClick={() => toggleSubDropdown('normalUser')}
        />

        <SubDropdownContent isActive={subDropdown === 'normalUser'} isCollapsed={isCollapsed}>
          <SubNavlink
            to="/dashboard/user-list"
            icon={Users}
            title="User List"
            isCollapsed={isCollapsed}
          />
          <SubNavlink
            to="/dashboard/user_request"
            icon={FileText}
            title="Requests"
            isCollapsed={isCollapsed}
          />
        </SubDropdownContent>
      </DropdownContent>
    </li>
  )
}
