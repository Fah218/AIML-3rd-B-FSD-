import React, { useState } from "react";

function Registration() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function captureData(e){
    e.preventDefault();

    const req = await fetch("http://localhost:4008/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const res = await req.json();

    // show alert popup
    alert(name + " register done");

    setMsg(res.message);
  }

  return (
    <div>
      <form onSubmit={captureData}>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>

      </form>

      <h2>{msg}</h2>
    </div>
  );
}

export default Registration;