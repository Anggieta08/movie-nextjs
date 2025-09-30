/* eslint-disable @next/next/no-img-element */
"use client";

export default function MovieCard({ movie, onSeeDetail }) {
  return (
    <div className="col-md-3 mb-4">
      <div
        className="card h-100 shadow-sm"
        style={{
          backgroundColor: "#fff",
          color: "#000",
          border: "6px solid #D81B60",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "100%", height: "auto", backgroundColor: "#000" }}>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/next.svg"}
            alt={movie.Title}
            className="card-img-top"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div style={{ height: "6px", backgroundColor: "#D81B60", margin: "0" }} />

        <div className="card-body d-flex flex-column text-center">
          <h5 className="card-title fw-bold mb-2" style={{ color: "#D81B60" }}>
            {movie.Title}
          </h5>
          <p className="card-text text-muted">{movie.Year}</p>

          <button
            className="btn mt-auto fw-bold"
            style={{
              backgroundColor: "#D81B60",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(255, 255, 255, 0.5)",
            }}
            data-bs-toggle="modal"
            data-bs-target="#movieDetail"
            onClick={() => onSeeDetail(movie)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FF4F81")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#D81B60")}
          >
            See Detail
          </button>
        </div>
      </div>
    </div>
  );
}
