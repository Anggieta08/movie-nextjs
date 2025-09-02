/* eslint-disable @next/next/no-img-element */
"use client";

export default function MovieCard({ movie, onSeeDetail }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/next.svg"}
          className="card-img-top"
          alt={movie.Title}
          style={{ height: "500px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{movie.Title}</h5>
          <h6 className="card-subtitle text-muted mb-3">{movie.Year}</h6>
          <button
            className="btn btn-primary mt-auto"
            data-bs-toggle="modal"
            data-bs-target="#movieDetail"
            onClick={() => onSeeDetail(movie.imdbID)}
          >
            See Detail
          </button>
        </div>
      </div>
    </div>
  );
}
