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
      const timeout = setTimeout(() => setAnimate(false), 600); 
      return () => clearTimeout(timeout);
    }
  }, [cart]);

  // Load cart dari localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Simpan cart ke localStorage setiap berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (movie) => {
    if (!cart.find((item) => item.imdbID === movie.imdbID)) {
      setCart([...cart, movie]);
    }
  };

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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1B1B2F, #2C2C54, #432C52)", 
        color: "#fff"
      }}
    >
      {/* Navbar */}
      <nav 
        className="navbar navbar-expand-lg shadow-sm py-3"
        style={{
          background: "linear-gradient(90deg, #FF4F81, #D81B60, #AD1457)",
          border: "2px solid #AD1457",
          borderRadius: "5px",           
        }}
      >
        <div 
          className="container d-flex justify-content-between align-items-center"
          style={{ maxWidth: "1200px" }}>

          {/* Logo kiri */}
          <a 
            className="navbar-brand fw-bold fs-2" 
            href="#"
            style={{ color: "#fff" }}
          >
            MOVIE NEXT.JS
          </a>
        
          {/* Tombol keranjang kanan */}
          <button
            type="button"
            className="btn position-relative rounded-circle shadow-sm d-flex align-items-center justify-content-center"
            data-bs-toggle="modal"
            data-bs-target="#cartModal"
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #ff9ab7ff, #ffffffff)", 
              border: "2px solid #fff",
              boxShadow: "0 4px 10px rgba(216,27,96,0.6)",
            }}
          >
            <span className="fs-3 text-light">🛒</span>
            {cart.length > 0 && (
              <span
                className={`position-absolute badge rounded-pill ${animate ? "shake" : ""}`}
                style={{
                  top: "-5px",               
                  right: "-12px",            
                  fontSize: "0.9rem",
                  padding: "0.3em 0.55em",
                  backgroundColor: "#FF80AB", 
                  border: "2px solid #fff", 
                  boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
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
          <h2 className="fw-bold fs-2 d-inline-flex align-items-center mb-3" style={{ color: "#fff" }}>
            <span role="img" aria-label="clapper" className="me-2">🎬</span>Search For Movie
          </h2>

          <form
            onSubmit={handleSearch}
            className="d-flex mx-auto gap-3"
            /* Hanya ubah style: lebar form sedikit diperbesar */
            style={{ maxWidth: "1000px", width: "95%" }}
          >

            <input
              type="text"
              className="form-control"  /* tetap mempertahankan className asli */
              placeholder="Search Movie... "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              /* Hanya ubah style: padding, fontSize, warna teks, borderRadius */
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "3px solid #FF4F81",
                boxShadow: "0 4px 10px rgba(255, 79, 129, 0.8)", 
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "1.05rem",
              }}
            />
 
            <button 
              type="submit" 
              className="btn px-4 fw-bold" /* tetap className asli */
              /* Hanya ubah style: padding, fontSize, borderRadius */
              style={{
                backgroundColor: "#FF4F81",
                color: "white",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(238, 185, 200, 1)",
                padding: "12px 22px",
                fontSize: "1.05rem",
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#E91E63"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#FF4F81"}
            >
              Search
            </button>
          </form>
        </div>

        {/* Garis pemisah */}
        {(movies.length > 0 || error) && (
          /* Hanya ubah style: buat garis lebih tebal & rounded */
          <hr
            style={{
              border: "5px solid #ffffffff", 
              borderRadius: "5px",
              width: "100%",
              margin: "50px 0"
            }}
          />
        )}

        {/* Error */}
        {error && (
          <div
            className="alert alert-danger text-center fs-5 fw-bold mx-auto"
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

      {/* Animasi Shake Badge */}
      <style>
      {`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        .shake {
          animation: shake 0.1s;
        }
      `}
      </style>
    </div>
  );
}
