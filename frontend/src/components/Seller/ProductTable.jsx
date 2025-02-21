import React from 'react'

export default function ProductTable({onAdjust, onDelete, onUpdate, products}) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-3">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
          <th className="py-3 px-4 text-left">No</th>
          <th className="py-3 px-4 text-left">Name</th>
          <th className="py-3 px-4 text-left">Stock</th>
          <th className="py-3 px-4 text-left">Price</th>
          <th className="py-3 px-4 text-left">Category</th>
          <th className="py-3 px-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product, index) => (
            <tr key={product.id || index} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4">{product.stock}</td>
              <td className="py-3 px-4">${product.price}</td>
              <td className="py-3 px-4">{product.category}</td>
              <td className="py-3 px-4 text-center">
                <button 
                  onClick={() => onAdjust(product)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm mr-2"
                >
                  Status
                </button>
                <button 
                  onClick={() => onUpdate(product)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  Update
                </button>
                <button 
                  onClick={() => onDelete(product)}
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
              Tidak ada data.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  )
}
