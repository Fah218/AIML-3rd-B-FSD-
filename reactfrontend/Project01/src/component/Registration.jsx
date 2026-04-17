import React, { useState } from "react";
import "../App.css";

function Registration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function captureData(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4008/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
    if (response.message === "Registration successful") {
      alert(name + " registeration done");
    } else {
      alert(response.message);
    }
  }

  return (
    <div>
      <h2>Student Registration Form</h2>
      <form onSubmit={captureData}>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="nameInput"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="emailInput"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="passwordInput"
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;