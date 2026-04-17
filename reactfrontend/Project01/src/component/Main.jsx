import React from "react";
import { Link } from "react-router-dom";
function Main() {
  return (
    <div>
      <h2>Welcome to Student registration App</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Main;