import React, { useState, useEffect } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    alert(`Added ${product.title} to cart!`);
  };

  return (
    <div className="container mt-4">
      <div className="bg-primary text-white text-center p-4 rounded mb-4">
        <h1>Product Dashboard</h1>
        <p>Browse our latest collection</p>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Fetching products...</p>
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
                <div 
                  className="d-flex align-items-center justify-content-center p-3" 
                  style={{ height: "200px" }}
                >
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate" title={product.title}>
                    {product.title}
                  </h5>
                  <p className="card-text text-success fw-bold">${product.price}</p>
                  <p className="card-text text-muted small flex-grow-1">
                    {product.description.substring(0, 60)}...
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-warning w-100 mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;