'use client'
import { useState } from "react";

import Link from "next/link";

export default function AdminPage() {
  const [newsData, setNewsData] = useState({
    name: "",
    authority: "",
    tehsil: "",
    heading: "",
    updateText: "",
    dateTime: new Date().toISOString().slice(0, 16),
  });



  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <ul>
          <Link href={"/"} className="mb-2 p-2 hover:bg-gray-700 cursor-pointer">Home</Link>
          <Link href={"/"} className="mb-2 p-2 hover:bg-gray-700 cursor-pointer">News Broadcast</Link>
          <Link 
            className="mb-2 p-2 hover:bg-gray-700 cursor-pointer" 
            href={"/adminpage/editnews"}
           >
            Edit News
          </Link>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto relative">
        <a href="/contact" className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-lg">Adminpage</a>
      </main>
    </div>
  );
}

export function EditNews() {
  return (
    <div className="p-6">
      {/* Search & Edit News Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Search & Edit News</h2>
        <div className="flex gap-2 mb-4">
          <input type="text" placeholder="Search News" className="border p-2 rounded w-full" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        </div>
        <input type="text" placeholder="Tehsil" className="border p-2 rounded w-full mb-4" />
        <textarea placeholder="Edit News" className="border p-2 rounded w-full h-40"></textarea>
      </section>

      {/* Update & Submit Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Update News</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Name" className="border p-2 rounded" />
          <input type="text" placeholder="Authority" className="border p-2 rounded" />
        </div>
        <div className="mt-4 flex gap-2">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </section>
    </div>
  );
}
