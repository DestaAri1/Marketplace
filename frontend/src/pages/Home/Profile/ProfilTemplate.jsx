import React from "react";
import MainTemplate from "../MainTemplate";
import Sidebar from "../../../components/Profile/Sidebar";

export default function ProfilTemplate({ children }) {
  return (
    <MainTemplate showFloatingCart={false}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Profil Saya</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-grow bg-white rounded-lg shadow-md p-6">
            {children}
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
