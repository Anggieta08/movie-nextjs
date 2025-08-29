/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=2876ddb3&s=${query}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }

    // ✅ kosongkan input setelah pencarian
    setQuery("");
  };

  return (
    <>
      {/* Navbar Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold fs-2" href="#">
            WPU Movie
          </a>
          <span className="navbar-brand fw-bold fs-3">Enjoy Your Movie</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container my-5">
        <h2 className="text-center mb-4">🎬 Search For Movie</h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
          <input
            type="text"
            className="form-control me-2"
            style={{ maxWidth: "400px" }}
            placeholder="Search Movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {/* Movie Cards */}
        <div className="row">
          {movies.length > 0 ? (
            movies.map((m) => (
              <div className="col-md-4 mb-3" key={m.imdbID}>
                <div className="card h-100">
                  <img
                    src={m.Poster !== "N/A" ? m.Poster : "/next.svg"}
                    className="card-img-top"
                    alt={m.Title}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{m.Title}</h5>
                    <h6 className="card-subtitle text-muted">{m.Year}</h6>
                    <a href="#" className="btn btn-primary mt-2">
                      See Detail
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">
              Belum ada hasil pencarian
            </p>
          )}
        </div>
      </div>
    </>
  );
}
