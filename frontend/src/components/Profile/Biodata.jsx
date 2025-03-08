import React from 'react'

export default function Biodata() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Biodata</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Lahir
            </label>
            <input
              type="text"
              value="12 Januari 1990"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value="john.doe@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon
            </label>
            <input
              type="tel"
              value="+62 812 3456 7890"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Kelamin
            </label>
            <input
              type="text"
              value="Laki-laki"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
        </div>
        <div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Edit Biodata
          </button>
        </div>
      </div>
    </div>
  );
}
