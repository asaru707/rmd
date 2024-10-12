import React from 'react';
import { SearchIcon, BellIcon, UserCircleIcon } from '@heroicons/react/outline';

const Topbar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Search (full width on mobile) */}
      <div className="relative flex-1 md:flex-none">
        <input
          type="text"
          className="w-full md:w-auto border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-700 focus:outline-none"
          placeholder="Search here..."
        />
        <SearchIcon className="absolute left-3 top-2 w-5 h-5 text-gray-500" />
      </div>

      {/* Right section (icons collapse into smaller sizes on mobile) */}
      <div className="flex items-center space-x-4 ml-4">
        <BellIcon className="w-6 h-6 text-gray-500" />
        <UserCircleIcon className="w-8 h-8 text-gray-500" />
      </div>
    </div>
  );
};

export default Topbar;
