import { fetchRecentDocuments } from "@/app/lib/actions/documents";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

const DashboardHome = async () => {
  const recentDocuments = await fetchRecentDocuments();
  return (
    <main className="flex flex-col h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <Link href="/dashboard/profile">
              <UserCircleIcon className="h-12 w-12 rotate-[15deg]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">
              {/* Recent Uploads */}
            </h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">45</p>
          </div>

          {/* Recent Documents */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Documents
            </h2>
            <ul className="space-y-2">
              {recentDocuments.map((document) => (
                <li key={document.id} className="flex justify-between">
                  <span>{document.title}</span>
                  <span className="text-gray-500">3 days ago</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Quick Actions
            </h2>

            <Link
              href="/dashboard/documents/new-document"
              className="block text-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add New Document
            </Link>

            <Link
              href="/dashboard/documents"
              className="block w-full text-center mt-2 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
            >
              View All Documents
            </Link>
          </div>
        </div>
      </main>
    </main>
  );
};

export default DashboardHome;
