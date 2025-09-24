/* eslint-disable @next/next/no-img-element */
"use client";

export default function CartModal({ cart, setCart }) {
  return (
    <div className="modal fade" id="cartModal" tabIndex="-1" aria-hidden="true">
      <div
        className="modal-dialog modal-dialog-scrollable"
        style={{ maxWidth: "900px" }}
      >
        <div
          className="modal-content"
          style={{
            border: "8px solid #D81B60", // ✅ border pink
            borderRadius: "10px",
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Keranjang</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ filter: "invert(50%)" }} // ✅ ubah warna close jadi abu
            ></button>
          </div>

          {/* ✅ Grid 4 kolom; poster utuh (tidak terpotong) */}
          <div className="modal-body">
            {cart.length === 0 ? (
              <p className="text-center text-muted">Keranjang kosong</p>
            ) : (
              <div className="row row-cols-2 row-cols-md-4 g-3">
                {cart.map((movie) => (
                  <div className="col" key={movie.imdbID}>
                    <div
                      className="card h-100 shadow-sm d-flex flex-column"
                      style={{
                        border: "6px solid #D81B60", // ✅ garis pink
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        className="ratio"
                        style={{ "--bs-aspect-ratio": "150%" }}
                      >
                        <img
                          src={
                            movie.Poster !== "N/A"
                              ? movie.Poster
                              : "/next.svg"
                          }
                          alt={movie.Title}
                          className="w-100 h-100"
                          style={{
                            objectFit: "contain",
                            backgroundColor: "#111",
                          }} // utuh, tidak crop
                        />
                      </div>

                      <div
                        className="card-body d-flex flex-column p-2"
                        style={{
                          borderTop: "5px solid #D81B60", // ✅ garis pink di atas judul
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

                        <div className="mt-auto pt-2">
                          {/* ✅ Button Hapus polos → hover jadi pink */}
                          <button
                            className="btn btn-sm w-100"
                            style={{
                              border: "2px solid #D81B60",
                              color: "#D81B60",
                              backgroundColor: "transparent",
                              fontWeight: "bold",
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
                            ✖ HAPUS
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
          <div className="modal-footer">
            {cart.length > 0 && (
              <button
                type="button"
                className="btn"
                onClick={() => setCart([])}
                style={{
                  backgroundColor: "#E91E63", // ✅ merah solid
                  color: "white",
                  fontWeight: "bold",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fd3276ff")
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
                backgroundColor: "#6c757d", // ✅ abu-abu custom
                color: "white",
                fontWeight: "bold",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#464646ff")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#262425ff")
              }
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
