/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from "react";
import MovieCard from "./components/MovieCard";
import MovieDetailModal from "./components/MovieDetailModal";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Cari film
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=fb4ebf49&s=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setMovies(data.Response === "True" ? data.Search : []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }

    setQuery("");
  };

  // Ambil detail film
  const handleDetail = async (imdbID) => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=fb4ebf49&i=${imdbID}`
      );
      const data = await res.json();
      if (data.Response === "True") setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie detail:", error);
      setSelectedMovie(null);
    }
  };

  return (
    <div className="bg-white min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold fs-2" href="#">
            WPU Movie
          </a>
          <span className="navbar-brand fw-bold fs-4">Enjoy Your Movie</span>
        </div>
      </nav>

      {/* Main */}
      <div className="container my-5">
        {/* Search */}
        <div className="d-flex flex-column align-items-center mb-5">
          <h2 className="d-flex justify-content-center align-items-center mb-3 text-dark fw-bold">
            <span role="img" aria-label="clapper" className="me-2">
              🎬
            </span>
            Search For Movie
          </h2>
          <form
            onSubmit={handleSearch}
            className="d-flex"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search Movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>

        {/* Movie Cards */}
        <div className="row">
          {movies.length > 0 ? (
            movies.map((m) => (
              <MovieCard key={m.imdbID} movie={m} onSeeDetail={handleDetail} />
            ))
          ) : (
            <hr className="my-5 border-secondary" style={{ height: "50px" }} />
          )}
        </div>
      </div>

      {/* Modal Detail */}
      <MovieDetailModal movie={selectedMovie} />
    </div>
  );
}
