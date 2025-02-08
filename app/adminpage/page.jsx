"use client";
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

  const [selectedSection, setSelectedSection] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);

  // Mock data for the editor's profile and past news records
  const [editorProfile, setEditorProfile] = useState({
    name: "Aditya Yadav",
    authority: "Chief Editor",
    background: "Masters in Journalism",
    organization: "NDTV",
    pastNews: [
      {
        id: 1,
        title: "Breaking News: Maha Kumbh Mela Stampede (Uttar Pradesh, India)",
        date: "2025-01-30",
        updateText: "",
      },
      {
        id: 2,
        title: "Cyclone Fengal (Puducherry, Chennai)",
        date: "2024-11-01",
        updateText: "",
      },
      {
        id: 3,
        title: "Vadodara Floods (Vadodara, Gujarat)",
        date: "2023-08-10",
        updateText: "",
      },
      {
        id: 4,
        title: "2024 Wayanad Landslides (Kerala, India)",
        date: "2023-06-20",
        updateText: "",
      },
    ],
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (news) => {
    setSelectedNews(news);
    setNewsData({
      ...news,
      dateTime: new Date().toISOString().slice(0, 16),
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedNews = editorProfile.pastNews.map((news) =>
      news.id === selectedNews.id
        ? { ...news, ...newsData, date: new Date().toISOString().slice(0, 10) }
        : news
    );
    setEditorProfile({ ...editorProfile, pastNews: updatedNews });
    setSelectedNews(null);
    setNewsData({
      name: "",
      authority: "",
      tehsil: "",
      heading: "",
      updateText: "",
      dateTime: new Date().toISOString().slice(0, 16),
    });
  };

  const filteredNews = editorProfile.pastNews.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <ul>
          <li
            className={`mb-2 p-2 hover:bg-gray-700 cursor-pointer ${
              selectedSection === "Home" ? "bg-gray-700" : ""
            }`}
            onClick={() => setSelectedSection("Home")}
          >
            Home
          </li>
          <li
            className={`mb-2 p-2 hover:bg-gray-700 cursor-pointer ${
              selectedSection === "Create News" ? "bg-gray-700" : ""
            }`}
            onClick={() => setSelectedSection("Create News")}
          >
            Create News
          </li>
          <li
            className={`mb-2 p-2 hover:bg-gray-700 cursor-pointer ${
              selectedSection === "Edit News" ? "bg-gray-700" : ""
            }`}
            onClick={() => setSelectedSection("Edit News")}
          >
            Edit News
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col ">
        {selectedSection === "Home" && (
          <div className="w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-4 ">Home</h1>
            <div className="mb-4 ">
              <h2 className="text-xl font-bold">Editor Profile</h2>
              <p>
                <strong>Name:</strong> {editorProfile.name}
              </p>
              <p>
                <strong>Authority:</strong> {editorProfile.authority}
              </p>
              <p>
                <strong>Background:</strong> {editorProfile.background}
              </p>
              <p>
                <strong>Organization:</strong> {editorProfile.organization}
              </p>
            </div>
            <div className="h-1 bg-black my-4"></div> {/* Black bar */}
            <div>
              <h2 className="text-xl font-bold text-center">
                Past News Records
              </h2>
              <div className="h-px bg-black my-2"></div> {/* Thin black line */}
              <ul>
                {editorProfile.pastNews.map((news) => (
                  <li key={news.id} className="mb-2">
                    <p className="font-bold">
                      <strong>Title:</strong> {news.title}
                    </p>
                    <p>
                      <strong>Date:</strong> {news.date}
                    </p>
                    <p>
                      <strong>Update Text:</strong> {news.updateText}
                    </p>
                    <div className="h-px bg-black my-2"></div>{" "}
                    {/* Thin black line */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {selectedSection === "Create News" && (
          <div className="w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Create News</h1>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newsData.name}
                  onChange={(e) =>
                    setNewsData({ ...newsData, name: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="authority"
                >
                  Authority
                </label>
                <input
                  type="text"
                  id="authority"
                  value={newsData.authority}
                  onChange={(e) =>
                    setNewsData({ ...newsData, authority: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tehsil"
                >
                  Tehsil
                </label>
                <input
                  type="text"
                  id="tehsil"
                  value={newsData.tehsil}
                  onChange={(e) =>
                    setNewsData({ ...newsData, tehsil: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="heading"
                >
                  Heading
                </label>
                <input
                  type="text"
                  id="heading"
                  value={newsData.heading}
                  onChange={(e) =>
                    setNewsData({ ...newsData, heading: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="updateText"
                >
                  Update Text
                </label>
                <textarea
                  id="updateText"
                  value={newsData.updateText}
                  onChange={(e) =>
                    setNewsData({ ...newsData, updateText: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="dateTime"
                >
                  Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="dateTime"
                  value={newsData.dateTime}
                  onChange={(e) =>
                    setNewsData({ ...newsData, dateTime: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {selectedSection === "Edit News" && (
          <div className="w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Edit News</h1>
            <input
              type="text"
              placeholder="Search news by title"
              value={searchQuery}
              onChange={handleSearch}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <ul>
              {filteredNews.map((news) => (
                <li key={news.id} className="mb-2">
                  <p className="font-bold">
                    <strong>Title:</strong> {news.title}
                  </p>
                  <p>
                    <strong>Date:</strong> {news.date}
                  </p>
                  <button
                    onClick={() => handleEdit(news)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Edit
                  </button>
                  {selectedNews && selectedNews.id === news.id && (
                    <form onSubmit={handleUpdate} className="mt-4">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="heading"
                        >
                          Heading
                        </label>
                        <input
                          type="text"
                          id="heading"
                          value={newsData.heading}
                          onChange={(e) =>
                            setNewsData({
                              ...newsData,
                              heading: e.target.value,
                            })
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="updateText"
                        >
                          Update Text
                        </label>
                        <textarea
                          id="updateText"
                          value={newsData.updateText}
                          onChange={(e) =>
                            setNewsData({
                              ...newsData,
                              updateText: e.target.value,
                            })
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="dateTime"
                        >
                          Date and Time
                        </label>
                        <input
                          type="datetime-local"
                          id="dateTime"
                          value={newsData.dateTime}
                          onChange={(e) =>
                            setNewsData({
                              ...newsData,
                              dateTime: e.target.value,
                            })
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Update
                      </button>
                    </form>
                  )}
                  <div className="h-px bg-black my-2"></div>{" "}
                  {/* Thin black line */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
