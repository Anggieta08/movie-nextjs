/* eslint-disable @next/next/no-img-element */
"use client";

export default function CartModal({ cart, setCart, onSeeDetail }) {
  return (
    <div className="modal fade" id="cartModal" tabIndex="-1" aria-hidden="true">
      <div
        className="modal-dialog modal-dialog-scrollable"
        style={{ maxWidth: "900px" }}
      >
        <div
          className="modal-content"
          style={{
            border: "8px solid #D81B60",
            borderRadius: "12px",
            boxShadow: "0 0 25px rgba(216, 27, 96, 0.5)", // ✨ Glow pink
          }}
        >
          <div
            className="modal-header"
            style={{
              borderBottom: "4px solid transparent",
              borderImage: "linear-gradient(to right, #D81B60, #8e24aa) 1", // ✨ Garis gradient
            }}
          >
            <h5 className="modal-title fw-bold">Keranjang</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ filter: "invert(50%)" }}
            ></button>
          </div>

          {/* ✅ Grid 4 kolom; poster utuh */}
          <div className="modal-body">
            {cart.length === 0 ? (
              <p className="text-center text-muted">Keranjang Kosong</p>
            ) : (
              <div className="row row-cols-2 row-cols-md-4 g-3">
                {cart.map((movie) => (
                  <div className="col" key={movie.imdbID}>
                    <div
                      className="card h-100 shadow-sm d-flex flex-column"
                      style={{
                        border: "6px solid #D81B60",
                        borderRadius: "10px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)"; // ✨ Hover scale
                        e.currentTarget.style.boxShadow =
                          "0 0 20px rgba(216, 27, 96, 0.6)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 rgba(0,0,0,0)";
                      }}
                    >
                      <div
                        className="ratio"
                        style={{ "--bs-aspect-ratio": "150%" }}
                      >
                        <img
                          src={
                            movie.Poster !== "N/A" ? movie.Poster : "/next.svg"
                          }
                          alt={movie.Title}
                          className="w-100 h-100"
                          style={{
                            objectFit: "contain",
                            backgroundColor: "#111",
                          }}
                        />
                      </div>

                      <div
                        className="card-body d-flex flex-column p-2"
                        style={{
                          borderTop: "5px solid #D81B60",
                        }}
                      >
                        <h6
                          className="mb-1"
                          title={movie.Title}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {movie.Title}
                        </h6>
                        <small className="text-muted">{movie.Year}</small>

                        <div className="mt-auto pt-2 d-flex flex-column gap-2">
                          {/* ✅ Button See Detail */}
                          <button
                            className="btn btn-sm fw-bold"
                            style={{
                              backgroundColor: "#D81B60",
                              color: "white",
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#movieDetail"
                            onClick={() =>
                              onSeeDetail(movie, { fromCart: true })
                            }
                          >
                            🎬 See Detail
                          </button>

                          {/* ✅ Button Hapus */}
                          <button
                            className="btn btn-sm fw-bold"
                            style={{
                              border: "2px solid #D81B60",
                              color: "#D81B60",
                              backgroundColor: "transparent",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = "#D81B60";
                              e.currentTarget.style.color = "white";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color = "#D81B60";
                            }}
                            onClick={() =>
                              setCart(
                                cart.filter((m) => m.imdbID !== movie.imdbID)
                              )
                            }
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="modal-footer d-flex justify-content-between align-items-center"
            style={{ borderTop: "3px solid #D81B60" }}
          >
            {cart.length > 0 && (
              <small className="fw-bold text-muted">
               🎬 TOTAL FILM : {cart.length} 
              </small>
            )}

            <div className="d-flex gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setCart([])}
                  style={{
                    backgroundColor: "#E91E63",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(253, 50, 118, 1)") // #fd3276ff
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#D81B60")
                  }
                >
                  🗑️ Clear All
                </button>
              )}
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  fontWeight: "bold",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(70, 70, 70, 1)") // #464646ff
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(38, 36, 37, 1)") // #262425ff
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
