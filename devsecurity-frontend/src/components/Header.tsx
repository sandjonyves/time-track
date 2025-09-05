
import { LogOut } from 'lucide-react';
import React from 'react'

const Header: React.FC<{ totalEntries: number, handleLogout: () => void }> = ({ totalEntries, handleLogout }) => (
  <header className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">TimeTracker</h1>
        <p className="text-gray-600">Track your time efficiently</p>
      </div>
      <div className="text-sm text-gray-500">
        Total entries: {totalEntries}
      </div>
      <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
      </button>
    </div>
  </header>
);

export default Header;