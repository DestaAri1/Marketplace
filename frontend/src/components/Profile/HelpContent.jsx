import React from 'react'

export default function HelpContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Bantuan</h2>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg hover:border-blue-400 transition-colors">
          <h3 className="font-medium mb-2">Cara Mengubah Profil</h3>
          <p className="text-gray-600">
            Panduan langkah demi langkah untuk mengubah informasi profil Anda.
          </p>
          <button className="text-blue-600 hover:underline text-sm mt-2">
            Baca Selengkapnya
          </button>
        </div>

        <div className="p-4 border rounded-lg hover:border-blue-400 transition-colors">
          <h3 className="font-medium mb-2">Kebijakan Pengembalian</h3>
          <p className="text-gray-600">
            Informasi tentang kebijakan pengembalian dan refund.
          </p>
          <button className="text-blue-600 hover:underline text-sm mt-2">
            Baca Selengkapnya
          </button>
        </div>

        <div className="p-4 border rounded-lg hover:border-blue-400 transition-colors">
          <h3 className="font-medium mb-2">FAQ</h3>
          <p className="text-gray-600">
            Pertanyaan yang sering diajukan tentang akun dan pembelian.
          </p>
          <button className="text-blue-600 hover:underline text-sm mt-2">
            Baca Selengkapnya
          </button>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-3">Butuh bantuan lainnya?</h3>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );
}
