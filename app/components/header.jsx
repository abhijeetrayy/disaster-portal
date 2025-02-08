import React from "react";

function header() {
  return (
    <div>
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6 md:flex-row flex-col">
          <h1 className="text-2xl font-bold">Disaster Data Portal</h1>
          <ul className="flex space-x-6 md:flex-row flex-col text-center md:text-left mt-2 md:mt-0">
            <li>
              <a href="/" className="hover:underline block py-2">
                Home
              </a>
            </li>
            <li>
              <a href="/news" className="hover:underline block py-2">
                News
              </a>
            </li>
            <li>
              <a href="/helpline" className="hover:underline block py-2">
                Helpline
              </a>
            </li>
            <li>
              <a href="/location" className="hover:underline block py-2">
                Location
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline block py-2">
                Contact
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline block py-2">
                Admin
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default header;
