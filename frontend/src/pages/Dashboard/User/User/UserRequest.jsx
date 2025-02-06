import React, { useEffect, useRef, useState } from "react";
import DashboardTemplate from "../../DashboardTemplate";
import useAdmin from "../../../../hooks/useAdmin";

export default function UserRequest() {
  const [user, setUser] = useState([]);
  const { GetAllUserHook } = useAdmin();
  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current && GetAllUserHook) {
      GetAllUserHook()
      .then((users) => setUser(users)) // Set user setelah Promise resolved
      .catch((error) => console.error("Error fetching users:", error));
      isFetched.current = true;
    }
  }, [GetAllUserHook]);

  return (
    <DashboardTemplate>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="py-3 px-4 text-left">No</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.length > 0 ? (
              user.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        user.status === 1 ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3 px-4">
                  Tidak ada data user
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardTemplate>
  );
}
