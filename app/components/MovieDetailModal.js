/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";

export default function MovieDetailModal({
  movie,
  onAddToCart,
  onClose,
  fromCart,
  isInCart,
}) {
  useEffect(() => {
    if (!movie) return;

    const modalEl = document.getElementById("movieDetail");

    if (modalEl && typeof window !== "undefined" && window.bootstrap?.Modal) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
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
          style={{ border: "8px solid #D81B60", borderRadius: "12px" }}
        >
          {movie ? (
            <>
              {/* Header */}
              <div
                className="modal-header custom-border d-flex justify-content-between align-items-center"
                style={{ paddingRight: "20px", paddingLeft: "20px" }}
              >
                <h5
                  className="modal-title fw-bold"
                  id="movieDetailLabel"
                  style={{ color: "#E91E63" }}
                >
                  {movie.Title} ({movie.Year})
                </h5>

                {/* Tombol X */}
                <button
                  type="button"
                  className="btn fw-bold d-flex align-items-center justify-content-center"
                  style={{
                    border: "2px solid #D81B60",
                    color: "#D81B60",
                    backgroundColor: "transparent",
                    width: "32px",
                    height: "32px",
                    fontSize: "18px",
                    borderRadius: "6px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    marginRight: "5px", // jarak dari kanan biar gak nempel
                  }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#D81B60";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#D81B60";
                  }}
                >
                  ✖
                </button>
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
                  {/* Kotak info detail */}
                  <ul
                    className="list-group mb-3"
                    style={{
                      border: "4px solid #E91E63",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  >
                    <li
                      className="list-group-item"
                      style={{ borderColor: "#E91E63" }}
                    >
                      <strong>Genre:</strong> {movie.Genre}
                    </li>
                    <li
                      className="list-group-item"
                      style={{ borderColor: "#E91E63" }}
                    >
                      <strong>Director:</strong> {movie.Director}
                    </li>
                    <li
                      className="list-group-item"
                      style={{ borderColor: "#E91E63" }}
                    >
                      <strong>Actors:</strong> {movie.Actors}
                    </li>
                    <li
                      className="list-group-item"
                      style={{ borderColor: "#E91E63" }}
                    >
                      <strong>Released:</strong> {movie.Released}
                    </li>
                    <li
                      className="list-group-item"
                      style={{ borderColor: "#E91E63" }}
                    >
                      <strong>Plot:</strong> {movie.Plot}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer custom-border">
                {fromCart ? (
                  <button
                    type="button"
                    className="btn fw-bold px-3"
                    style={{
                      backgroundColor: "#383636",
                      color: "#fff",
                      borderRadius: "8px",
                    }}
                    data-bs-target="#cartModal"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    🔙 Back to Cart
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn fw-bold px-4 d-flex align-items-center gap-2"
                      style={{
                        backgroundColor: "#E91E63",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.3)",
                      }}
                      onClick={() => onAddToCart(movie)}
                      data-bs-dismiss="modal"
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fa4474ff")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#E91E63")
                      }
                    >
                      🛒 Add to Cart
                    </button>

                    <button
                      type="button"
                      className="btn fw-bold px-4 ms-2"
                      style={{
                        backgroundColor: "#434649ff",
                        color: "#fff",
                        borderRadius: "8px",
                      }}
                      data-bs-dismiss="modal"
                      onClick={onClose}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(70, 70, 70, 1)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(38, 36, 37, 1)")
                      }
                    >
                      ✖ Close
                    </button>
                  </>
                )}
              </div>

              {/* Tambahin style langsung di file ini */}
              <style>
                {`
                  .custom-border {
                    border-color: #E91E63 !important;
                    border: 5px;
                  }
                  .modal-header.custom-border {
                    border-bottom-style: solid;
                  }
                  .modal-footer.custom-border {
                    border-top-style: solid;
                  }
                `}
              </style>
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
