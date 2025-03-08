import React from "react";

export default function Notification({ notifications }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Notifikasi</h2>
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div key={index} className="p-4 border-b hover:bg-gray-50 transition">
            <div className="flex">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${notification.bgColor}`}
              >
                {notification.icon}
              </div>
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-gray-600 text-sm">{notification.message}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
