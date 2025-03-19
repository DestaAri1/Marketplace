import React from 'react'
import { Link } from 'react-router-dom';

export default function SecurityContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Keamanan</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Password</h3>
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-gray-500 text-sm">
                  Terakhir diubah 30 hari yang lalu
                </p>
              </div>
              <Link to={'/profile/security/change-password'} className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                Ubah Password
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Verifikasi Dua Faktor</h3>
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Verifikasi SMS</p>
                <p className="text-gray-500 text-sm">
                  Aktifkan untuk keamanan tambahan
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Riwayat Login</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perangkat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lokasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waktu
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    Chrome di Windows
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jakarta, Indonesia
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    8 Maret 2025, 10:30
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    Safari di iPhone
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jakarta, Indonesia
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    7 Maret 2025, 19:15
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
