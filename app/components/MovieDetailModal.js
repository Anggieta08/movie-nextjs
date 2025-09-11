/* eslint-disable @next/next/no-img-element */
"use client";

export default function MovieDetailModal({ movie, onAddToCart }) {
  return (
    <div
      className="modal fade"
      id="movieDetail"
      tabIndex="-1"
      aria-labelledby="movieDetailLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {movie ? (
            <>
              <div className="modal-header">
                <h5 className="modal-title" id="movieDetailLabel">
                  {movie.Title} ({movie.Year})
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
                    src={movie.Poster !== "N/A" ? movie.Poster : "/next.svg"}
                    alt={movie.Title}
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-8">
                  <ul className="list-group mb-3">
                    <li className="list-group-item"><strong>Genre:</strong> {movie.Genre}</li>
                    <li className="list-group-item"><strong>Director:</strong> {movie.Director}</li>
                    <li className="list-group-item"><strong>Actors:</strong> {movie.Actors}</li>
                    <li className="list-group-item"><strong>Released:</strong> {movie.Released}</li>
                    <li className="list-group-item"><strong>Plot:</strong> {movie.Plot}</li>
                  </ul>
                </div>
              </div>

              {/* Footer: Close + Add to Cart */}
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button 
                  type="button"
                  className="btn btn-success"
                  onClick={() => onAddToCart(movie)}
                  data-bs-dismiss="modal" // ✅ otomatis tutup modal setelah klik
                >
                  🛒 Add to Cart
                </button>
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
  );
}
