/* eslint-disable @next/next/no-img-element */
"use client";

export default function CartModal({ cart, setCart }) {
  return (
    <div className="modal fade" id="cartModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable" style={{ maxWidth: "900px" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Keranjang</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          {/* ✅ Grid 4 kolom; poster utuh (tidak terpotong) */}
          <div className="modal-body">
            {cart.length === 0 ? (
              <p className="text-center text-muted">Keranjang kosong</p>
            ) : (
              <div className="row row-cols-2 row-cols-md-4 g-3">
                {cart.map((movie) => (
                  <div className="col" key={movie.imdbID}>
                    <div className="card h-100 shadow-sm d-flex flex-column">
                      {/* Kotak rasio 2:3 agar ukuran konsisten */}
                      <div className="ratio" style={{ "--bs-aspect-ratio": "150%" }}>
                        <img
                          src={movie.Poster !== "N/A" ? movie.Poster : "/next.svg"}
                          alt={movie.Title}
                          className="w-100 h-100"
                          style={{ objectFit: "contain", backgroundColor: "#111" }} // utuh, tidak crop
                        />
                      </div>

                      <div className="card-body d-flex flex-column p-2">
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
                          <button
                            className="btn btn-sm btn-outline-danger w-100"
                            onClick={() =>
                              setCart(cart.filter((m) => m.imdbID !== movie.imdbID))
                            }
                          >
                            ✖ Hapus
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
              <button type="button" className="btn btn-danger me-auto" onClick={() => setCart([])}>
                🗑️ Clear All
              </button>
            )}
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
