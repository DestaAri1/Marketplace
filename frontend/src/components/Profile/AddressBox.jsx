import React from "react";
import Button from "../Button";

export default function AddressBox({ onClick }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Alamat Saya</h2>
        <Button
          type={"button"}
          classes={
            "bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-sm"
          }
          base=""
          name={"Add Address"}
          onClick={onClick}
        />
      </div>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Rumah</p>
              <p className="text-gray-500">John Doe</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:underline text-sm">
                Edit
              </button>
              <button className="text-red-600 hover:underline text-sm">
                Hapus
              </button>
            </div>
          </div>
          <p className="mt-2">
            Jl. Jendral Sudirman No. 123, Kota Jakarta Pusat, DKI Jakarta, 10220
          </p>
          <p className="text-gray-500">+62 812 3456 7890</p>
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
              Utama
            </span>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Kantor</p>
              <p className="text-gray-500">John Doe</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:underline text-sm">
                Edit
              </button>
              <button className="text-red-600 hover:underline text-sm">
                Hapus
              </button>
            </div>
          </div>
          <p className="mt-2">
            Jl. Gatot Subroto Kav. 45-46, Kota Jakarta Selatan, DKI Jakarta,
            12950
          </p>
          <p className="text-gray-500">+62 812 3456 7890</p>
        </div>
      </div>
    </div>
  );
}
