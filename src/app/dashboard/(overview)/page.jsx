import React from "react";

const DashboardHome = () => {
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
            <span>👤</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Documents
            </h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">
              Recent Uploads
            </h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">45</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">
              Pending Reviews
            </h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">8</p>
          </div>

          {/* Recent Documents */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Documents
            </h2>
            <ul className="space-y-2">
              <li className="flex justify-between border-b pb-2">
                <span>Invoice_123.pdf</span>
                <span className="text-gray-500">2 hours ago</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Contract_April.pdf</span>
                <span className="text-gray-500">1 day ago</span>
              </li>
              <li className="flex justify-between">
                <span>Quotation_456.pdf</span>
                <span className="text-gray-500">3 days ago</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Quick Actions
            </h2>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Add New Document
            </button>
            <button className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition">
              View All Documents
            </button>
          </div>
        </div>
      </main>
    </main>
  );
};

export default DashboardHome;
