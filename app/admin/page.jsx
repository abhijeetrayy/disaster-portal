'use client'
import { useState } from "react";

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
          <li className="mb-2 p-2 hover:bg-gray-700 cursor-pointer">Home</li>
          <li className="mb-2 p-2 hover:bg-gray-700 cursor-pointer">Create News</li>
          <li className="mb-2 p-2 hover:bg-gray-700 cursor-pointer">Edit News</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Admin Details Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Admin Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Admin Name" className="border p-2 rounded" />
          <input type="text" placeholder="Authority" className="border p-2 rounded" />
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="text" placeholder="Contact Number" className="border p-2 rounded" />
        </div>
      </section>
      
      {/* Create News Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Create News</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Name" className="border p-2 rounded" />
          <input type="text" placeholder="Authority" className="border p-2 rounded" />
          <input type="text" placeholder="Tehsil" className="border p-2 rounded" />
          <input type="text" placeholder="Heading" className="border p-2 rounded" />
          <textarea placeholder="Update Text" className="border p-2 rounded col-span-2"></textarea>
          <input type="datetime-local" className="border p-2 rounded" defaultValue={new Date().toISOString().slice(0, 16)} />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </section>
      
      {/* Edited News Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Edited News</h2>
        {newsData.length > 0 ? (
          newsData.map((news, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <p className="text-sm text-gray-600">Edited On: {news.dateTime}</p>
              <h3 className="text-lg font-bold">{news.heading}</h3>
              <p className="text-gray-700">{news.updateText}</p>
              <p className="text-sm text-gray-500">By {news.name}, {news.authority}</p>
            </div>
          ))
        ) : (
          <p>No edited news available.</p>
        )}
        </section>
        

        

        
      </main>
    </div>
  );
}
