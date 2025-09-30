/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";

export default function MovieDetailModal({ 
  movie, 
  onAddToCart, 
  onClose, 
  fromCart, 
  isInCart 
}) {
  useEffect(() => {
    if (!movie) return;

    if (typeof window !== "undefined") {
      import("bootstrap").then(({ Modal }) => {
        const modalEl = document.getElementById("movieDetail");
        if (modalEl) {
          const modal = Modal.getOrCreateInstance(modalEl);
          modal.show();
        }
      });
    }
  }, [movie]);

  return (
    <div
      className="modal fade"
      id="movieDetail"
      tabIndex="-1"
      aria-labelledby="movieDetailLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div
          className="modal-content"
          style={{
            border: "8px solid #D81B60",
            borderRadius: "12px"
          }}
        >
          {movie ? (
            <>
              {/* Header */}
              <div className="modal-header">
                <h5
                  className="modal-title fw-bold"
                  id="movieDetailLabel"
                  style={{ color: "#E91E63" }}
                >
                  {movie.Title} ({movie.Year})
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                ></button>
              </div>

              {/* Body */}
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
                    <li className="list-group-item" style={{ borderColor: "#E91E63" }}>
                      <strong>Genre:</strong> {movie.Genre}
                    </li>
                    <li className="list-group-item" style={{ borderColor: "#E91E63" }}>
                      <strong>Director:</strong> {movie.Director}
                    </li>
                    <li className="list-group-item" style={{ borderColor: "#E91E63" }}>
                      <strong>Actors:</strong> {movie.Actors}
                    </li>
                    <li className="list-group-item" style={{ borderColor: "#E91E63" }}>
                      <strong>Released:</strong> {movie.Released}
                    </li>
                    <li className="list-group-item" style={{ borderColor: "#D81B60" }}>
                      <strong>Plot:</strong> {movie.Plot}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                {fromCart ? (
                  <button
                    type="button"
                    className="btn fw-bold px-3"
                    style={{
                      backgroundColor: "#383636",
                      color: "#fff",
                      borderRadius: "8px",
                    }}
                    onClick={() => {
                      import("bootstrap").then(({ Modal }) => {
                        const detailModal = Modal.getInstance(
                          document.getElementById("movieDetail")
                        );
                        detailModal?.hide();

                        // kasih delay 300ms biar transisi modal selesai dulu
                        setTimeout(() => {
                          const cartModalEl = document.getElementById("cartModal");
                          const cartModal = Modal.getOrCreateInstance(cartModalEl);
                          cartModal.show();
                        }, 300);
                      });
                    }}
                  >
                    🔙 Back to Cart
                  </button>
                ) : (
                  <>
                    {isInCart ? (
                      <button
                        type="button"
                        className="btn fw-bold px-4"
                        style={{
                          backgroundColor: "#6c757d",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                        }}
                        onClick={onClose}
                        data-bs-dismiss="modal"
                      >
                        🔙 Kembali
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn fw-bold px-4 d-flex align-items-center gap-2"
                          style={{
                            backgroundColor: "#FF4F81",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.3)"
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = "#fd3276")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = "#FF4F81")
                          }
                          onClick={() => onAddToCart(movie)}
                          data-bs-dismiss="modal"
                        >
                          🛒 Add to Cart
                        </button>

                        {/* Tombol Close baru */}
                        <button
                          type="button"
                          className="btn fw-bold px-4 ms-2"
                          style={{
                            backgroundColor: "#6c757d",
                            color: "#fff",
                            borderRadius: "8px",
                          }}
                          data-bs-dismiss="modal"
                          onClick={onClose}
                        >
                          ✖ Close
                        </button>
                      </>
                    )}
                  </>
                )}
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
