import React, { useState } from "react";
import MainTemplate from "../MainTemplate";
import {
  User,
  Home,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
} from "lucide-react";
import Biodata from "../../../components/Profile/Biodata";
import Address from "../../../components/Profile/Address";
import Order from "../../../components/Profile/Order";
import Notification from "../../../components/Profile/Notification";
import Security from "../../../components/Profile/Security";
import Help from "../../../components/Profile/Help";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("biodata");

  const menuItems = [
    { id: "biodata", label: "Biodata", icon: <User size={20} /> },
    { id: "address", label: "Alamat", icon: <MapPin size={20} /> },
    { id: "orders", label: "Pesanan Saya", icon: <CreditCard size={20} /> },
    { id: "notifications", label: "Notifikasi", icon: <Bell size={20} /> },
    { id: "security", label: "Keamanan", icon: <Shield size={20} /> },
    { id: "help", label: "Bantuan", icon: <HelpCircle size={20} /> },
  ];

  // Data Notifikasi dengan Icon
  const notifications = [
    {
      icon: <CreditCard size={20} className="text-blue-600" />,
      bgColor: "bg-blue-100",
      title: "Pembayaran Berhasil",
      message: "Pembayaran untuk pesanan #ORD123456 telah berhasil.",
      time: "1 jam yang lalu",
    },
    {
      icon: <Home size={20} className="text-green-600" />,
      bgColor: "bg-green-100",
      title: "Pesanan Dikirim",
      message: "Pesanan #ORD123455 sedang dalam perjalanan.",
      time: "5 jam yang lalu",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "biodata":
        return <Biodata />;
      case "address":
        return <Address />;
      case "orders":
        return <Order />;
      case "notifications":
        return <Notification notifications={notifications} />;
      case "security":
        return <Security />;
      case "help":
        return <Help />;
      default:
        return <Biodata />;
    }
  };

  return (
    <MainTemplate>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Profil Saya</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                  <img
                    src="/api/placeholder/96/96"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-lg font-semibold text-center">John Doe</h2>
              <p className="text-gray-500 text-center text-sm">
                john.doe@example.com
              </p>
            </div>

            <nav>
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center p-3 rounded-md text-left transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-grow bg-white rounded-lg shadow-md p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
