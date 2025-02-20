import React from 'react'

export default function CategorytTable({categories, onUpdate, onDelete}) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-3">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
          <th className="py-3 px-4 text-left">No</th>
          <th className="py-3 px-4 text-left">Category</th>
          <th className="py-3 px-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <tr key={category.id || index} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{category.name}</td>
              <td className="py-3 px-4 text-center">
                <button 
                  onClick={() => onUpdate(category)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  Update
                </button>
                <button 
                  onClick={() => onDelete(category)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center py-3 px-4">
              Tidak ada data user untuk role ini.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  )
}
