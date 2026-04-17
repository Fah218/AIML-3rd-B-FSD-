import React, { useState, useEffect } from "react";
import "../App.css";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch products cleanly
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

    // Sync current cart data to UI on load
    fetch("http://localhost:4008/getCart")
      .then((res) => res.json())
      .then((data) => setCartItems(data || []))
      .catch(console.error);
  }, []);

  const addToCart = (product) => {
    fetch("http://localhost:4008/addToCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        alert(`${product.title} added to cart!`);
        setCartItems(prev => [...prev, product]);
        setIsCartOpen(true);
      }
    })
    .catch(err => console.error(err));
  };

  const showCart = () => {
    setIsCartOpen(!isCartOpen);
    fetch("http://localhost:4008/getCart")
      .then(res => res.json())
      .then(data => {
        setCartItems(data || []);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="dashboard-container py-5 px-3">
      <div className="container">
        
        {/* Dynamic Header */}
        <div className="dashboard-header text-center">
          <h1 className="display-4 fw-bold">Premium Collection</h1>
          <p className="lead mb-0">Discover top-tier products handpicked just for you.</p>
          <button onClick={showCart} className="btn btn-light mt-4 fw-bold rounded-pill px-4 shadow text-primary fs-5">
            🛒 Show Cart {cartItems.length > 0 && <span className="badge bg-primary ms-2">{cartItems.length}</span>}
          </button>
        </div>

        {/* In-UI Cart View Section */}
        {isCartOpen && (
          <div className="card shadow-lg border-0 mb-5 p-4 rounded-4" style={{ backgroundColor: '#fff' }}>
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <h3 className="fw-bold mb-0 text-primary">Your Shopping Cart</h3>
              <button onClick={() => setIsCartOpen(false)} className="btn-close" aria-label="Close"></button>
            </div>
            {cartItems.length === 0 ? (
              <div className="text-center py-4">
                <h5 className="text-muted fw-normal">Your cart is completely empty. Start adding some items!</h5>
              </div>
            ) : (
              <ul className="list-group list-group-flush mb-3">
                {cartItems.map((item, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center py-3 px-0 border-light">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light p-2 rounded" style={{width: "60px", height: "60px"}}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <span className="fw-semibold text-dark fs-6" style={{maxWidth: "350px"}}>{item.title}</span>
                    </div>
                    <span className="badge bg-success rounded-pill fs-6 px-3 py-2 shadow-sm">${item.price}</span>
                  </li>
                ))}
              </ul>
            )}
            {cartItems.length > 0 && (
              <div className="text-end pt-3 border-top">
                <h4 className="fw-bold text-dark mt-2 mb-3">
                  Grand Total: <span className="text-primary">${cartItems.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}</span>
                </h4>
                <button className="btn btn-primary btn-lg px-5 py-2 rounded-pill shadow-sm fw-bold">Proceed to Checkout</button>
              </div>
            )}
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-grow text-info" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="mt-4 text-muted font-monospace tracking-wide">Syncing catalog...</h4>
          </div>
        ) : (
          /* Grid View Layout */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', paddingBottom: '1.5rem' }}>
            {products.map((product) => {
              const isAdded = cartItems.some(item => item.id === product.id);
              
              return (
              <div key={product.id}>
                <div className="dashboard-card h-100 d-flex flex-column">
                  
                  {/* Card Image Area */}
                  <div 
                    className="dashboard-card-img-wrap d-flex align-items-center justify-content-center"
                    style={{ height: "240px", overflow: "hidden" }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ maxHeight: "180px", maxWidth: "80%", objectFit: "contain", transition: "transform 0.5s" }}
                    />
                  </div>
                  
                  {/* Card Content Area */}
                  <div className="card-body d-flex flex-column p-4">
                    <h6 className="card-title text-truncate mb-2 fs-5" title={product.title}>
                      {product.title}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center mb-3 mt-auto">
                      <span className="dashboard-price">${product.price}</span>
                      <span className="badge bg-dark rounded-pill fw-normal shadow-sm">
                        ★ {product.rating?.rate || '4.5'}
                      </span>
                    </div>
                    
                    {/* Add to Cart Trigger */}
                    <button
                      onClick={() => !isAdded && addToCart(product)}
                      className={`dashboard-btn w-100 ${isAdded ? 'opacity-75' : ''}`}
                      style={isAdded ? { background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', cursor: 'default', transform: 'none', boxShadow: 'none' } : {}}
                    >
                      {isAdded ? "✅ Added in Cart" : "+ Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Dashboard;
