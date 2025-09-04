'use client'; 
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import MovieDetailModal from "./components/MovieDetailModal";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(""); 
  const [cart, setCart] = useState([]);
  const [animate, setAnimate] = useState(false); // untuk animasi badge

  // Trigger animasi setiap kali cart berubah
  useEffect(() => {
    if (cart.length > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300); 
      return () => clearTimeout(timeout);
    }
  }, [cart]);

  // Untuk mencari film
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=fb4ebf49&s=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError(""); 
      } else {
        setMovies([]);
        setError("Movie not found!");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setError("Error fetching movies."); // kalau fetch gagal
    }

    setQuery("");
  };

  // Untuk mengambil detail film
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
      {/* Bagian Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold fs-2" href="#">
            WPU Movie
          </a>
          <span className="navbar-brand fw-bold fs-4">Enjoy Your Movie</span>
          
          {/* Keranjang */}
          <span className="position-relative ms-3 fs-3" role="button">
            🛒
            <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${animate ? "shake" : ""}`}>
              {cart.length}
            </span>
          </span>
        </div>
      </nav>

      <div className="container my-5">
        {/* Bagian Search */}
        <div className="d-flex flex-column align-items-center mb-5">
          <h2 className="d-flex justify-content-center align-items-center mb-3 text-dark fw-bold">
            <span role="img" aria-label="clapper" className="me-2">🎬</span>
            Search For Movie
          </h2>
          
          <form
            onSubmit={handleSearch}
            className="d-flex"
            style={{ maxWidth: "500px", width: "100%" }}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search Movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}/>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="alert alert-danger text-center fs-4 fw-bold mx-auto"
            role="alert"
            style={{ maxWidth: "400px" }}>
            {error}
          </div>
        )}

        {/* Movie Cards */}
        <div className="row">
          {movies.length > 0 &&
  movies.map((m, i) => (
    <MovieCard key={`${m.imdbID}-${i}`} movie={m} onSeeDetail={handleDetail} />
  ))}

        </div>
      </div>

      <MovieDetailModal 
  movie={selectedMovie} 
  onAddToCart={(movie) => setCart([...cart, movie])} 
/>

    </div>
  );
}
