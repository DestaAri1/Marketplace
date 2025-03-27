import {
  Bell,
  CreditCard,
  HelpCircle,
  MapPin,
  Shield,
  User,
  Settings,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { createImageUrl } from "../../utils/ImageUrlHelper";

export default function Sidebar() {
  const { user } = useAuth();
  const menuItems = [
    {
      id: "biodata",
      label: "Biodata",
      icon: <User size={20} />,
      link: "/profile/biodata",
    },
    {
      id: "address",
      label: "Alamat",
      icon: <MapPin size={20} />,
      link: "/profile/address",
    },
    {
      id: "orders",
      label: "Pesanan Saya",
      icon: <CreditCard size={20} />,
      link: "/profile/orders",
    },
    {
      id: "notifications",
      label: "Notifikasi",
      icon: <Bell size={20} />,
      link: "/profile/notifications",
    },
    {
      id: "security",
      label: "Keamanan",
      icon: <Shield size={20} />,
      link: "/profile/security",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      link: "/profile/settings",
    },
    {
      id: "help",
      label: "Bantuan",
      icon: <HelpCircle size={20} />,
      link: "/profile/help",
    },
  ];
  
  const imageUrl = process.env.REACT_APP_PROFILE_PICTURE_URL;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 overflow-y-auto h-[calc(100vh-5.8rem)]">
      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
            <img
              src={createImageUrl(
                process.env.REACT_APP_PROFILE_PICTURE_URL,
                user?.biodata?.image
              )}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-center">{user?.username}</h2>
        <p className="text-gray-500 text-center text-sm">{user?.email}</p>
      </div>

      <nav>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={`${item.link}`}
                className={({ isActive }) =>
                  `w-full flex items-center p-2 rounded-md text-left transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
