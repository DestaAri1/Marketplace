import React from 'react'
import UserDropdown from '../../components/UserDropdown'

export default function Navbar({user}) {
  return (
    <header className="fixed top-0 left-0 w-full bg-indigo-600 text-white py-4 shadow-md z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
            {/* Navbar Left */}
            <div className="flex w-[186px] items-center space-x-4">
                <span className="text-lg font-bold">Marketplace</span>
            </div>

            {/* Navbar Center */}
            <nav className="space-x-6 border-2">
                <a href="#promotions" className="hover:underline">Promotions</a>
                <a href="#products" className="hover:underline">Products</a>
                <a href="#contact" className="hover:underline">Contact</a>
            </nav>

            {/* Navbar Right */}
            {user !== null ? <UserDropdown userName={user.username}/> : "dasds"}
            
        </div>
    </header>
  )
}
