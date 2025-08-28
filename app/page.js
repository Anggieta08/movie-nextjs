'use client';
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Keyword:", query);
  };

  return (
    <>
      {/* Navbar biru */}
     <nav className="bg-blue-600 text-white py-3">
  <div className="container mx-auto flex items-center justify-between px-6">
    <h1 className="text-3xl font-bold">WPU Movie</h1>
    <span className="text-3xl font-bold">Enjoy Your Movie</span>
  </div>
</nav>



      {/* Main content */}
      <main className="min-h-screen bg-white flex flex-col items-center justify-start pt-24">
        {/* Judul di tengah atas */}
        <h2 className="text-5xl text-black font-bold mb-8 text-center">
          🎬 Search For Movie
        </h2>

        {/* Form search di bawah judul */}
        <form onSubmit={handleSearch} className="flex w-full max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search Movie..."
            className="flex-1 px-4 py-2 rounded-l text-black bg-gray-200 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </main>
    </>
  );
}
