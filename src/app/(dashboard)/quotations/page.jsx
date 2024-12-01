import React from 'react';
import Link from 'next/link';

const Quotations = () => {
  return (
    <div className="bg-slate-50 rounded-lg p-6 shadow-lg">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Quotations</h1>
      <section className="my-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-600">Quotation List</h2>
          <Link
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
            href="create"
          >
            Create New
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Quotation Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Internet Quotation</td>
                <td className="border border-gray-300 px-4 py-2">Quotation for internet services</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Web Hosting Quotation</td>
                <td className="border border-gray-300 px-4 py-2">Quotation for web hosting services</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Emails Quotation</td>
                <td className="border border-gray-300 px-4 py-2">Quotation for email hosting services</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Quotations;
