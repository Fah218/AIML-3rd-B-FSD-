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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Registration Page</h2>
              <form onSubmit={captureData}>
                <div className="form-group mb-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>

              {msg && <div className="alert alert-info mt-3">{msg}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;