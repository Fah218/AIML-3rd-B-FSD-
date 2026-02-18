import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);

  // Fetch API Data
  async function getData() {
    try {
      setLoader(true);

      const res = await fetch("http://localhost:4007/data");
      const result = await res.json();

      setData(result);
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    } finally {
      setLoader(false);
    }
  }

  // Fetch Welcome Message
  async function getMessage() {
    try {
      const res = await fetch("http://localhost:4007/msg");
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      console.error(err);
    }
  }

  // Add to Cart
  function addToCart(item) {
    setCart((prev) => [...prev, item]);
    alert(`${item.title} added to cart ✅`);
  }

  return (
    <>
      <h2>Welcome to React App</h2>

      {/* Welcome Message */}
      <button onClick={getMessage}>Get Welcome Message</button>
      <div dangerouslySetInnerHTML={{ __html: message }} />

      <br />

      {/* Fetch Data */}
      <button onClick={getData}>Fetch Data</button>

      {loader && <h3>Loading data...</h3>}

      {/* Display Products */}
      {data.length > 0 &&
        data.map((ele) => (
          <div
            key={ele.id}
            style={{
              border: "2px solid red",
              margin: "10px",
              padding: "10px",
            }}
          >
            <img
              src={ele.image}
              height={200}
              width={200}
              alt={ele.title}
            />
            <h3>{ele.id}: {ele.title}</h3>
            <button onClick={() => addToCart(ele)}>
              Add to Cart
            </button>
          </div>
        ))}

      <hr />

      <h3>Cart Items: {cart.length}</h3>
    </>
  );
}

export default App;
