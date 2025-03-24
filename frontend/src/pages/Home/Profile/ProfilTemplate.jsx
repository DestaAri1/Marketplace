import React from "react";
import MainTemplate from "../MainTemplate";
import Sidebar from "../../../components/Profile/Sidebar";
import { ToastContainer } from "react-toastify";

export default function ProfilTemplate({ children }) {
  return (
    <MainTemplate showFloatingCart={false} showTimerToaster={false}>
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-12"></div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="fixed left-50 w-full md:w-64">
            <Sidebar />
          </div>

          <div className="ml-[24%] flex-grow bg-white rounded-lg shadow-md p-6">
            {children}
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
