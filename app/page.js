/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
          <span className="navbar-brand fw-bold fs-4">
            Enjoy Your Movie
          </span>
        </div>
      </nav>

      {/* Main */}
      <div className="container my-5">
        {/* Search */}
        <div className="d-flex flex-column align-items-center mb-5">
          <h2 className="d-flex justify-content-center align-items-center mb-3 text-dark fw-bold">
            <span role="img" aria-label="clapper" className="me-2">🎬</span>
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
              <div className="col-md-4 mb-4" key={m.imdbID}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={m.Poster !== "N/A" ? m.Poster : "/next.svg"}
                    className="card-img-top"
                    alt={m.Title}
                    style={{ height: "500px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{m.Title}</h5>
                    <h6 className="card-subtitle text-muted mb-3">{m.Year}</h6>
                    <button
                      className="btn btn-primary mt-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#movieDetail"
                      onClick={() => handleDetail(m.imdbID)}
                    >
                      See Detail
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">Belum ada hasil pencarian</p>
          )}
        </div>
      </div>

      {/* Modal Detail */}
      <div
        className="modal fade"
        id="movieDetail"
        tabIndex="-1"
        aria-labelledby="movieDetailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {selectedMovie ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="movieDetailLabel">
                    {selectedMovie.Title} ({selectedMovie.Year})
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body row">
                  <div className="col-md-4">
                    <img
                      src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "/next.svg"}
                      alt={selectedMovie.Title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item"><strong>Genre:</strong> {selectedMovie.Genre}</li>
                      <li className="list-group-item"><strong>Director:</strong> {selectedMovie.Director}</li>
                      <li className="list-group-item"><strong>Actors:</strong> {selectedMovie.Actors}</li>
                      <li className="list-group-item"><strong>Released:</strong> {selectedMovie.Released}</li>
                      <li className="list-group-item"><strong>Plot:</strong> {selectedMovie.Plot}</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className="modal-body">
                <p className="text-muted">Loading detail...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
