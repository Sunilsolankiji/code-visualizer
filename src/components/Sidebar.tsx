"use client";

import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Visualizer</h2>
      <nav className="flex flex-col space-y-3">
        <Link href="/dashboard">
          <span className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <i className="fas fa-home"></i> Dashboard
          </span>
        </Link>
        <Link href="/settings">
          <span className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
            <i className="fas fa-cog"></i> Settings
          </span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
