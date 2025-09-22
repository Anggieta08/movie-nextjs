/* eslint-disable @next/next/no-img-element */
"use client";

export default function MovieCard({ movie, onSeeDetail }) {
  return (
    <div className="col-md-3 mb-4">
      <div
        className="card h-100 shadow-sm"
        style={{
          backgroundColor: "#2C2C54",
          color: "#fff",
          border: "2px solid #D81B60",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Poster */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/next.svg"}
          alt={movie.Title}
          className="card-img-top"
          style={{
            height: "380px",
            objectFit: "cover",
          }}
        />

        {/* Body */}
        <div className="card-body d-flex flex-column">
          <h5
            className="card-title fw-bold mb-2"
            style={{ color: "#FF80AB", minHeight: "48px" }}
          >
            {movie.Title}
          </h5>
          <p className="card-text text-muted">{movie.Year}</p>

          <button
            className="btn mt-auto fw-bold"
            style={{
              backgroundColor: "#FF4F81",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(216,27,96,0.5)",
            }}
            data-bs-toggle="modal"
            data-bs-target="#movieDetail"
            onClick={() => onSeeDetail(movie.imdbID)}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#E91E63")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#FF4F81")
            }
          >
            See Detail
          </button>
        </div>
      </div>
    </div>
  );
}
