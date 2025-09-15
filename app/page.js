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

  // 1️⃣ Load cart sekali saat halaman pertama kali dimuat
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
      console.log("Cart loaded from localStorage:", JSON.parse(savedCart));
    }
  }, []);

  // 2️⃣ Simpan cart ke localStorage setiap kali cart berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart saved to localStorage:", cart);
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
        <div 
          className="container d-flex justify-content-between align-items-center"
          style={{ maxWidth: "1200px" }}>

          {/* Logo kiri */}
          <a className="navbar-brand fw-bold fs-2" href="#">MOVIE NEXT.JS</a>
        
          {/* Tombol keranjang kanan */}
          <button
            type="button"
            className="btn btn-light position-relative rounded-circle shadow-sm d-flex align-items-center justify-content-center"
            data-bs-toggle="modal"
            data-bs-target="#cartModal"
            style={{
              width: "68px",
              height: "68px",
            }}
          >
            <span className="fs-2 text-primary">🛒</span>
            {cart.length > 0 && (
              <span
                className={`position-absolute badge rounded-pill bg-danger ${animate ? "shake" : ""}`}
                style={{
                  top: "-5px",               // ✅ geser turun dikit supaya gak nutup emoticon
                  right: "-15px",             // ✅ lebih rapih di pojok kanan atas
                  fontSize: "1rem",
                  padding: "0.35em 0.60em",
                  border: "5px solid #fff", 
                  boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                }}
              >
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Bagian Search */}
      <div className="container my-5">
        <div className="text-center mb-4">
          {/* ✅ H2 sudah rapih tengah */}
          <h2 className="text-dark fw-bold fs-2 d-inline-flex align-items-center mb-3">
            <span role="img" aria-label="clapper" className="me-2">🎬</span>
            Search For Movie
          </h2>

          <form
  onSubmit={handleSearch}
  className="d-flex mx-auto gap-3"
  style={{ maxWidth: "900px", width: "100%" }}
>
            <input
    type="text"
    className="form-control"
    placeholder="Search Movie..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    style={{
      backgroundColor: "#ffffffff",      // 🎨 biru muda pastel
      border: "5px solid #0072e5ff",     // 🎨 border biru lembut
      boxShadow: "0 20px 10px rgba(0, 0, 0, 0.1)", // ✨ shadow halus
    }}
  />
             <button type="submit" className="btn btn-primary px-4">Search</button>
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
