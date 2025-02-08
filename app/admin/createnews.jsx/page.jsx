"use client";
import { useState } from "react";

export default function CreateNews() {
  const [newsData, setNewsData] = useState({
    name: "",
    authority: "",
    tehsil: "",
    heading: "",
    updateText: "",
    dateTime: new Date().toISOString().slice(0, 16),
  });

  return (
    <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create News</h2>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Name" className="border p-2 rounded" />
        <input
          type="text"
          placeholder="Authority"
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Tehsil"
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Heading"
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Update Text"
          className="border p-2 rounded col-span-2"
        ></textarea>
        <input
          type="datetime-local"
          className="border p-2 rounded"
          defaultValue={newsData.dateTime}
        />
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </section>
  );
}
