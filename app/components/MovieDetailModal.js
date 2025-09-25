/* eslint-disable @next/next/no-img-element */
"use client";

export default function MovieDetailModal({ movie, onAddToCart }) {
  return (
    <div
      className="modal fade"
      id="movieDetail"
      tabIndex="-1"
      aria-labelledby="movieDetailLabel"
      aria-hidden="true">

      <div className="modal-dialog modal-lg">
        <div 
          className="modal-content"
          style={{
            border: "8px solid #D81B60",   // 🔥 garis tebal di sekeliling modal
            borderRadius: "12px"
          }}>

          {movie ? (
            <>
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="movieDetailLabel" style={{ color: "#E91E630" }}>
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
                    <li className="list-group-item" style={{borderColor: "#E91E63"}}>
                      <strong>Genre:</strong> {movie.Genre}
                    </li>
                    <li className="list-group-item" style={{borderColor: "#E91E63"}}>
                      <strong>Director:</strong> {movie.Director}
                    </li>
                    <li className="list-group-item" style={{borderColor: "#E91E63"}}>
                      <strong>Actors:</strong> {movie.Actors}
                    </li>
                    <li className="list-group-item" style={{borderColor: "#E91E63"}}>
                      <strong>Released:</strong> {movie.Released}
                    </li>
                    <li className="list-group-item" style={{borderColor: "#D81B60"}}>
                      <strong>Plot:</strong> {movie.Plot}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer: Close + Add to Cart */}
              <div className="modal-footer">
                <button 
                    type="button" 
                    className="btn fw-bold px-3"
                    style={{
                    backgroundColor: "#383636ff",          // 🔥 warna abu gelap
                    color: "#fff",                    // teks putih
                    borderRadius: "8px",              // rounded
                  }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#464646ff"} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#262425ff"}
                    data-bs-dismiss="modal"
                  > 
                    Close   
                  </button>

                    <button 
                  type="button"
                  className="btn fw-bold px-4 d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: "#FF4F81",
                    color: "#1b0000ff", // 🔥 pakai teks hitam supaya 🛒 jelas
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.3)"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#fd3276ff"} 
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#D81B60"}
                  onClick={() => onAddToCart(movie)}
                  data-bs-dismiss="modal"
                >
                  🛒 <span style={{ color: "#ffffffff" }}>Add to Cart</span>
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
