'use client'; 
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import MovieDetailModal from "./components/MovieDetailModal";
import CartModal from "./components/CartModal"; 
import "./globals.css"; 

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(""); 
  const [cart, setCart] = useState([]);
  const [animate, setAnimate] = useState(false);

  // animasi badge cart
  useEffect(() => {
    if (cart.length > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300); 
      return () => clearTimeout(timeout);
    }
  }, [cart]);

  // tambah film ke keranjang
  const addToCart = (movie) => {
    if (!cart.find((item) => item.imdbID === movie.imdbID)) {
      setCart([...cart, movie]);
    }
  };

  // cari film
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=144c588b&s=${encodeURIComponent(query)}`
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

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
      setError("Error fetching movies. Please try again later.");
    }

    setQuery("");
  };

  // detail film
  const handleDetail = async (imdbID) => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=144c588b&i=${imdbID}` 
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setSelectedMovie(null);
      }
    } catch (error) {
      console.error("Error fetching movie detail:", error);
      setSelectedMovie(null);
    }
  };

  return (
    <div className="bg-white min-vh-100">
      {/* Navbar */}
      {/* Navbar */}
<nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
  <div 
    className="container d-flex justify-content-between align-items-center"
    style={{ maxWidth: "15 00px" }} // ✅ biar ga terlalu melebar
  >
    {/* Logo kiri */}
    <a className="navbar-brand fw-bold fs-2" href="#">
      WPU Movie
    </a>

    {/* Tombol keranjang kanan */}
    <button
      type="button"
      className="btn btn-light position-relative rounded-circle shadow-sm"
      data-bs-toggle="modal"
      data-bs-target="#cartModal"
      style={{
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="fs-4 text-primary">🛒</span>
      <span
        className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${
          animate ? "shake" : ""
        }`}
        style={{
          fontSize: "0.8rem",
          padding: "0.35em 0.55em",
        }}
      >
        {cart.length}
      </span>
    </button>
  </div>
</nav>

      {/* Bagian Search */}
      <div className="container my-5">
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
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div
            className="alert alert-danger text-center fs-4 fw-bold mx-auto"
            role="alert"
            style={{ maxWidth: "400px" }}
          >
            {error}
          </div>
        )}

        {/* Movie Cards */}
        <div className="row">
          {movies.length > 0 &&
            movies.map((m, i) => (
              <MovieCard 
                key={`${m.imdbID}-${i}`} 
                movie={m} 
                onSeeDetail={handleDetail} 
              />
            ))
          }
        </div>
      </div>

      {/* Modal Keranjang */}
      <CartModal cart={cart} setCart={setCart} />

      {/* Modal Detail */}
      <MovieDetailModal 
        movie={selectedMovie} 
        onAddToCart={addToCart}
      />
    </div>
  );
}
