import React from 'react'
import { Link } from 'react-router-dom';

export default function SideBar({ isOpen }) {
    return (
    <div className={`fixed inset-y-0 left-0 bg-blue-800 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ul className="mt-12">
          <li className="mb-2">
            <Link href="#" className="block p-2 hover:bg-blue-700 rounded">Home</Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block p-2 hover:bg-blue-700 rounded">Profile</Link>
          </li>
          <li className="mb-2">
            <Link href="#" className="block p-2 hover:bg-blue-700 rounded">Settings</Link>
          </li>
        </ul>
      </div>
    </div>
      );
    }
