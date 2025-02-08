
import React from "react";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";

const DisasterDataPortal = () => {
  const newsArticles = [
    {
      title: "Severe Floods in Southern India",
      date: "February 6, 2025",
      summary:
        "Heavy rainfall has led to severe flooding in several southern regions of India, with many areas submerged.",
    },
    {
      title: "Earthquake Hits Northeast Region",
      date: "February 5, 2025",
      summary:
        "A 6.7 magnitude earthquake has struck the northeast, causing significant damage and loss of life.",
    },
    {
      title: "Cyclone Alert for Eastern Coast",
      date: "February 4, 2025",
      summary:
        "A powerful cyclone is expected to hit the eastern coast by this weekend, evacuation measures are being planned.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="container mx-auto p-6">
        <section className="flex flex-col gap-2 bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold">Real-time Disaster Alerts</h2>
          <p>
            Live updates on ongoing disasters with severity levels and affected
            areas.
          </p>
          <Link href={`/news/${'lkdsfjak;s'}`} className="ml-2 w-fit p-2 flex flex-row  items-center border border-red-500 rounded-md shadow-sm hover:border-opacity-30">
            <span className="flex justify-center items-center  rounded-full text-red-500 border ">
              <GoDotFill />
            </span>
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid,
              ipsum!
            </span>
          </Link>
          <Link href={`/news/${'lkdsfjak;s'}`} className="ml-2 w-fit p-2 flex flex-row  items-center border border-yellow-500 rounded-md shadow-sm hover:border-opacity-30">
            <span className="flex justify-center items-center  rounded-full text-yellow-500 border ">
              <GoDotFill />
            </span>
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid,
              ipsum!
            </span>
          </Link>
          <Link href={`/news/${'lkdsfjak;s'}`} className="ml-2 w-fit p-2 flex flex-row  items-center border border-blue-500 rounded-md shadow-sm hover:border-opacity-30">
            <span className="flex justify-center items-center  rounded-full text-blue-500 border ">
              <GoDotFill />
            </span>
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid,
              ipsum!
            </span>
          </Link>
        </section>
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold">Interactive Disaster Map</h2>
          <p>Map showing disaster-prone areas and live disaster reports.</p>
        </section>
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <Link href={"/news"} className="text-xl font-semibold my-2 hover:underline">News</Link>
          <ul className="ml-3 space-y-4">
            {newsArticles.map((article, index) => (
              <li key={index} className="border-b pb-4">
                <Link href={`/news/${article.title}`} className="text-lg font-semibold hover:underline">{article.title}</Link>

                <p className="text-sm text-gray-600"><span className="text-blue-500">
                    <span>Editor: </span> Aditya Yadav
                    </span>
                     {" "}| {article.date}</p>
                <p>{article.summary}</p>
              </li>
            ))}
          </ul>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Disaster Statistics</h3>
            <p>Graph-based analysis of past disasters.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Relief & Resources</h3>
            <p>Information on emergency contacts and rescue operations.</p>
          </div>
        </div>
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold">Community Reports</h2>
          <p>User-submitted disaster reports and relief collaboration.</p>
        </section>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-6">
        <p>&copy; 2025 Disaster Data Portal | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default DisasterDataPortal;
