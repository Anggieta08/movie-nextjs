/* eslint-disable @next/next/no-img-element */
"use client";

export default function CartItemCard({ movie, onSeeDetail, onRemove }) {
  return (
    <div className="col-md-3 mb-3">
      <div
        className="card h-100 shadow-sm"
        style={{
          border: "4px solid #D81B60",
          borderRadius: "10px",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow =
            "0 0 20px rgba(216, 27, 96, 0.6)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
        }}
      >
        {/* Poster */}
        <div style={{ backgroundColor: "#000" }}>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/next.svg"}
            alt={movie.Title}
            className="w-100"
            style={{ objectFit: "contain", height: "250px" }}
          />
        </div>

        {/* Body */}
        <div
          className="card-body d-flex flex-column text-center p-2"
          style={{ borderTop: "4px solid #D81B60" }}
        >
          <h6
            className="fw-bold mb-1"
            style={{
              color: "#D81B60",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.Title}
          </h6>
          <small className="text-muted">{movie.Year}</small>

          {/* Tombol aksi */}
          <div className="mt-auto d-flex flex-column gap-2 pt-2">
            <button
              className="btn btn-sm fw-bold"
              style={{ backgroundColor: "#D81B60", color: "white" }}
              data-bs-toggle="modal"
              data-bs-target="#movieDetail"
              onClick={() => onSeeDetail(movie.imdbID)}
            >
              🎬 See Detail
            </button>

            <button
              className="btn btn-sm fw-bold"
              style={{
                border: "2px solid #D81B60",
                color: "#D81B60",
                backgroundColor: "transparent",
              }}
              onClick={onRemove}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#D81B60";
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#D81B60";
              }}
            >
              🗑️ Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
