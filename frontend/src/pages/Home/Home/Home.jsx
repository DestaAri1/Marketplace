import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import TimerToaster from '../../../components/TimerToaster';
import Navbar from '../../../layout/Main/Navbar';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const {user} = useAuth()

    const products = [
        { name: "Product 1", store: "Store A", price: 100, discountPrice: 80, image: "https://via.placeholder.com/150" },
        { name: "Product 2", store: "Store B", price: 150, image: "https://via.placeholder.com/150" },
        { name: "Product 3", store: "Store C", price: 200, discountPrice: 180, image: "https://via.placeholder.com/150" },
    ];

  return (
    <div className="min-h-screen bg-gray-50">
        <TimerToaster/>
        <Navbar user={user}/>

        <main className="container mx-auto px-32 py-20">
            {/* Search Bar */}
            <div className="mb-8">
                <input
                    type="text"
                    className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Promotions Section */}
            <section id="promotions" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">🔥 Hot Promotions</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-6 bg-yellow-100 rounded-lg shadow-lg flex items-center space-x-4">
                        <img src="https://via.placeholder.com/100" alt="Promo 1" className="w-24 h-24 rounded-lg" />
                        <div>
                            <h3 className="text-xl font-bold">Special Promo 1</h3>
                            <p className="text-gray-600">Don't miss this deal!</p>
                        </div>
                    </div>
                    <div className="p-6 bg-yellow-100 rounded-lg shadow-lg flex items-center space-x-4">
                        <img src="https://via.placeholder.com/100" alt="Promo 2" className="w-24 h-24 rounded-lg" />
                        <div>
                            <h3 className="text-xl font-bold">Special Promo 2</h3>
                            <p className="text-gray-600">Limited time offer!</p>
                        </div>
                    </div>
                    <div className="p-6 bg-yellow-100 rounded-lg shadow-lg flex items-center space-x-4">
                        <img src="https://via.placeholder.com/100" alt="Promo 3" className="w-24 h-24 rounded-lg" />
                        <div>
                            <h3 className="text-xl font-bold">Exclusive Deal</h3>
                            <p className="text-gray-600">Shop now and save big!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product List Section */}
            <section id="products">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">🛍️ Product List</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {products.map((product, index) => (
                        <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">Store: {product.store}</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {product.discountPrice ? (
                                    <>
                                        <span className="line-through text-gray-400 mr-2">${product.price}</span>
                                        <span className="text-red-500">${product.discountPrice}</span>
                                    </>
                                ) : (
                                    <>${product.price}</>
                                )}
                            </p>
                            <button className="mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    </div>
  )
}
