"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { handleLogout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            href="/blogs/list"
            className="text-white text-lg font-semibold hover:text-indigo-400"
          >
            Blog List
          </Link>
          <Link
            href="/blogs/create"
            className="text-white text-lg font-semibold hover:text-indigo-400"
          >
            Add Blog
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="text-white text-lg font-semibold hover:text-indigo-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
